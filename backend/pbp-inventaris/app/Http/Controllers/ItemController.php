<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Log_item;
use App\Models\Category;
use App\Models\Magnitude;
use App\Models\Status;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Item::all(); // Ambil semua item
        if ($items->isNotEmpty()) {
            return response()->json([
                'Message' => 'Berhasil mengambil data Item',
                'Items' => $items->map(function($item) {
                    return [
                        'id' => $item->id,
                        'name_items' => $item->name_items,
                        'stock' => $item->stock, // Menggunakan accessor
                        'eligible_items' => $item->eligible_items,
                        'defective_items' => $item->defective_items,
                        'categories_id' => $item->categories_id,
                        'magnitudes_id' => $item->magnitudes_id,
                        'image' => $item->image ? asset('storage/' . $item->image) : null,
                        'created_at' => $item->created_at,
                        'updated_at' => $item->updated_at,
                    ];
                })
            ], 200);
        } else {
            return response()->json([
                'Message' => 'Gagal mengambil data Item',
                'Items' => null
            ], 404);
        }
    }
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate User Input
        $validatedData = $request->validate([
            'name_items' => 'required|string|max:255|unique:items,name_items',
            'eligible_items' => 'required|integer|min:0',
            'defective_items' => 'required|integer|min:0',
            'categories' => 'required|string|exists:categories,name_categories',
            'magnitudes' => 'required|string|exists:magnitudes,name_magnitudes',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        // Setting up category and magnitude
        $categories = Category::where('name_categories', $validatedData['categories'])->first();
        $magnitudes = Magnitude::where('name_magnitudes', $validatedData['magnitudes'])->first();
        
        if (!$categories || !$magnitudes) {
            return response()->json(['Message' => 'Invalid category or magnitude'], 404);
        }
    
        // Adding new Item
        $item = new Item;
        $item->name_items = $validatedData['name_items'];
        $item->eligible_items = $validatedData['eligible_items'];
        $item->defective_items = $validatedData['defective_items'];
        $item->categories_id = $categories->id;
        $item->magnitudes_id = $magnitudes->id;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/images');
            $item->image = str_replace('public/', '', $imagePath);
        }
        
    
        if ($item->save()) {
            return response()->json([
                'Message' => 'Data item berhasil ditambahkan',
                'Item' => [
                    'id' => $item->id,
                    'name_items' => $item->name_items,
                    'stock' => $item->stock,  
                    'eligible_items' => $item->eligible_items,
                    'defective_items' => $item->defective_items,
                    'categories_id' => $item->categories_id,
                    'magnitudes_id' => $item->magnitudes_id,
                    'image' => $item->image ? asset('storage/' . $item->image) : null,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                ]
            ], 200);
        } else {
            return response()->json([
                'Message' => 'Data item gagal ditambahkan',
                'Item' => null
            ], 404);
        }
    }
    
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // Find the item by ID
        $item = Item::findOrFail($id);
        if ($item) {
            return response()->json([
                'Message' => 'Data item berhasil didapatkan',
                'Item' => [
                    'id' => $item->id,
                    'name_items' => $item->name_items,
                    'stock' => $item->stock,  // Accessor ini akan menghitung stock secara otomatis
                    'eligible_items' => $item->eligible_items,
                    'defective_items' => $item->defective_items,
                    'categories_id' => $item->categories_id,
                    'magnitudes_id' => $item->magnitudes_id,
                    'image' => $item->image ? asset('storage/' . $item->image) : null,
                    'created_at' => $item->created_at,
                    'updated_at' => $item->updated_at,
                ]
            ], 200);
        } else {
            return response()->json([
                'Message' => 'Tidak ada item yang dicari',
                'Item' => null
            ], 404);
        }
    }
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validate User Input
        $validatedData = $request->validate([
            'name_items' => 'required|string|max:255|unique:items,name_items,'.$id,
            'eligible_items' => 'required|integer|min:0',
            'defective_items' => 'required|integer|min:0',
            'categories' => 'required|string|exists:categories,name_categories',
            'magnitudes' => 'required|string|exists:magnitudes,name_magnitudes',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        // Setting up category and magnitude
        $category = Category::where('name_categories', $validatedData['categories'])->first();
        $magnitude = Magnitude::where('name_magnitudes', $validatedData['magnitudes'])->first();
        
        if (!$category || !$magnitude) {
            return response()->json(['Message' => 'Invalid category or magnitude'], 404);
        }
        
        // Find and update the item
        $item = Item::findOrFail($id);
        
        // Simpan nilai lama sebelum update untuk perbandingan
        $oldEligible = $item->eligible_items;
        $oldDefective = $item->defective_items;
        
        $item->name_items = $validatedData['name_items'];
        $item->eligible_items = $validatedData['eligible_items'];
        $item->defective_items = $validatedData['defective_items'];
        $item->categories_id = $category->id;
        $item->magnitudes_id = $magnitude->id;
        
        // Menangani gambar jika ada
        if ($request->hasFile('image')) {
            // Menghapus gambar lama
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            // Menyimpan gambar baru
            $imagePath = $request->file('image')->store('public/images');
            $item->image = str_replace('public/', '', $imagePath);
        }
    
        // Save item
        $item->save();
        
        // Tidak perlu lagi log secara manual karena sudah ditangani di model Item (event `updated`)
    
        return response()->json([
            'Message' => 'Data item berhasil diupdate',
            'Item' => [
                'id' => $item->id,
                'name_items' => $item->name_items,
                'eligible_items' => $item->eligible_items,
                'defective_items' => $item->defective_items,
                'categories_id' => $item->categories_id,
                'magnitudes_id' => $item->magnitudes_id,
                'image' => $item->image ? asset('storage/' . $item->image) : null,
                'created_at' => $item->created_at,
                'updated_at' => $item->updated_at,
            ]
        ], 200);
    }    
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        if($item)
        {
            $message = 'Data Item berhasil dihapus';
            return response()->json([
                'Message' => $message
            ], 200);
        }
        elseif (!$item) {
            $message = 'Data item gagal dihapus';
            return response()->json([
                'Message' => $message
            ], 404);
        }
    }
}
