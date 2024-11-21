<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Status;

class statusController extends Controller
{
    public function index() {
        $status = Status::all();
        if ($status) {
            return response()->json([
                'message' => 'Berhasil mengambil data status',
                'data' => $status
            ], 200);
        } else {
            return response()->json([
                'message' => 'Data status tidak ditemukan',
                'data' => null
            ], 404);
        }
    }
}
