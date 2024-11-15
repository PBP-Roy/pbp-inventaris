<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::all();
        if($category){
            return response()->json([
                'message' => 'Berhasil mengambil data kategori',
                'data' => $category
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data kategori tidak ditemukan',
                'data' => null
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
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Data kategori berhasil disimpan',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);
        if($category){
            return response()->json([
                'message' => "Berhasil mengambil data kategori dengan id $id",
                'data' => $category
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data kategori tidak ditemukan',
                'data' => null
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
        $category = Category::find($id);

        if ($category) {
            $request->validate([
                'name' => 'required|string|max:255',
            ]);

            $category->update([
                'name' => $request->name
            ]);

            return response()->json([
                'message' => 'Data kategori berhasil diperbarui',
                'data' => $category
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data kategori tidak ditemukan',
                'data' => null
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
        $category = Category::find($id);
        if ($category) {
            $category->delete();

            return response()->json([
                'message' => 'Data kategori berhasil dihapus'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data kategori tidak ditemukan',
                'data' => null
            ], 404);
        }
    }
}