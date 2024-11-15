<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;
use App\Models\Magnitude;
use App\Models\log_item;
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
        $item = Item::all();
        if($item)
        {
            return response()->json([
                'Message' => 'Berhasil mengambil data Item',
                'Item' => $item
            ], 200);
        }
        else
        {
            return response()->json([
                'Message' => 'Gagal mengambil data Item',
                'Item' => null
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
            'name_items' => 'required|string|max:255',
            'eligible_items' => 'required|integer|min:0',
            'defective_items' => 'required|integer|min:0',
            'categories' => 'required|string|exists:categories,name_categories',
            'magnitudes' => 'required|string|exists:magnitudes,name_magnitudes',
            'image' => 'nullable|string',
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
        $item->image = $request->image;
    
        if ($item->save()) {
            $item->refresh(); // Refresh item after save to ensure all values are updated
            $status = Status::where('id', '1')->first();
            // Verifying data before creating log item
            if ($status) {
                $log_item = new Log_item([
                    'items_id' => $item->id,
                    'eligible_log_items' => $item->eligible_items,
                    'defectives_log_items' => $item->defective_items,
                    'statuses_id' => $status->id,
                ]);
    
                $log_item->save();
            }
    
            return response()->json([
                'Message' => 'Data item berhasil ditambahkan',
                'Item' => $item
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
        if($item)
        {
            return response()->json([
                'Message' => 'Data item berhasil didapatkan',
                'Item' => $item
            ], 200);
        }
        else
        {
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
            'image' => 'nullable|string',
        ]);
        
        // Setting up category
        $category = Category::where('name_categories', $validatedData['categories'])->first();
        if (!$category) {
            return response()->json(['Message' => 'Invalid category', 'categories' => null], 404);
        }
    
        // Setting up Magnitude
        $magnitude = Magnitude::where('name_magnitudes', $validatedData['magnitudes'])->first();
        if (!$magnitude) {
            return response()->json(['Message' => 'Invalid magnitude', 'magnitudes' => null], 404);
        }
    
        // Find the item by ID
        $item = Item::findOrFail($id);
        $oldEligible = $item->eligible_items;
        $oldDefective = $item->defective_items;

        // Update the item attributes
        $item->update([
            'name_items' => $validatedData['name_items'],
            'eligible_items' => $validatedData['eligible_items'],
            'defective_items' => $validatedData['defective_items'],
            'categories_id' => $category->id,
            'magnitudes_id' => $magnitude->id,
            'image' => $request->has('image') ? $request->image : $item->image,
        ]);
    
        // Defined status from input condition and insert log_item
        $status = $item->eligible_items > $oldEligible || $item->defective_items > $oldDefective ? '1' : '2';
        $statusId = Status::where('id', $status)->first()->id;
        Log_item::create([
            'eligible_items' => abs($item->eligible_items - $oldEligible),
            'defective_items' => abs($item->defective_items - $oldDefective),
            'items_id' => $item->id,
            'status_id' => $statusId,
        ]);

        // Save and return response
        if ($item->save()) {
            return response()->json([
                'Message' => 'Data item berhasil di update',
                'item' => $item
            ], 200);
        } else {
            return response()->json([
                'Message' => 'Data item gagal di update',
                'Item' => null
            ], 404);
        }
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
