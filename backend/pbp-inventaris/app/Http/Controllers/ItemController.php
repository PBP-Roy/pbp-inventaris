<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{


    // semua barang
    public function index()
    {
        $items = Item::all();
        return view('database', compact('items')) ;
    }

    // insert barang
    public function store(Request $request)
    {
        return view('create', );
    }
}
