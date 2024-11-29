<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        if($users->isNotEmpty()) {
            return response()->json([
                'message' => 'Berhasil mengambil data pengguna',
                'data' => $users
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data pengguna tidak ditemukan',
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        return response()->json([
            'message' => 'Pengguna berhasil dibuat',
            'data' => $user
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
        $user = User::find($id);
        if($user){
            return response()->json([
                'message' => "Berhasil mengambil data pengguna dengan id $id",
                'data' => $user
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data pengguna tidak ditemukan',
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
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,'.$id,
            'password' => 'string|min:8|nullable',
        ]);

        $user->name = $validatedData['name'] ?? $user->name;
        $user->email = $validatedData['email'] ?? $user->email;
        if (!empty($validatedData['password'])) {
            $user->password = bcrypt($validatedData['password']);
        }

        // Menangani gambar jika ada
        if ($request->hasFile('image')) {
            // Menyimpan gambar baru
            $imagePath = $request->file('image')->store('public/images');
            // Menghapus gambar lama
            if ($user->image) {
                Storage::disk('public')->delete($imagePath);
            }
            $user->image = str_replace('public/', '', $imagePath);
        }

        if ($user->save()) {
            return response()->json([
                'message' => 'Data pengguna berhasil diperbarui',
                'data' => $user
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data pengguna gagal diperbarui',
                'data' => null
            ], 400);
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
        $user = User::find($id);
        if(!$user) {
            return response()->json([
                'message' => 'Data pengguna tidak ditemukan',
                'data' => null
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Data pengguna berhasil dihapus',
        ], 200);
    }
}
