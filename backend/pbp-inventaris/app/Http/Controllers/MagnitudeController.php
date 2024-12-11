<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Magnitude;

class MagnitudeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = auth()->id();
        $magnitudes = Magnitude::where('users_id', 0)->orWhere('users_id', $userId)->get();
        if ($magnitudes) {
            return response()->json([
                'message' => 'Berhasil mengambil data magnitudes',
                'data' => $magnitudes
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data magnitudes tidak ditemukan',
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
        $validatedData = $request->validate([
            'name_magnitudes' => 'required|string',
            'users_id' => 'required|integer'
        ]);

        $magnitude = Magnitude::create($validatedData);

        return response()->json([
            'message' => 'Berhasil menambahkan data magnitude',
            'data' => $magnitude
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
        $magnitude = Magnitude::find($id);
        if ($magnitude) {
            return response()->json([
                'message' => "Berhasil mengambil data magnitude dengan id $id",
                'data' => $magnitude
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data magnitude tidak ditemukan',
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
        $magnitude = Magnitude::find($id);

        if ($magnitude) {
            $validatedData = $request->validate([
                'name_magnitudes' => 'string|nullable',
                'users_id' => 'integer|nullable'
            ]);

            $magnitude->update($validatedData);

            return response()->json([
                'message' => 'Berhasil memperbarui data magnitude',
                'data' => $magnitude
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data magnitude tidak ditemukan',
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
        $magnitude = Magnitude::find($id);

        if ($magnitude) {
            $magnitude->delete();
            return response()->json([
                'message' => 'Berhasil menghapus data magnitude'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data magnitude tidak ditemukan'
            ], 404);
        }
    }
}
