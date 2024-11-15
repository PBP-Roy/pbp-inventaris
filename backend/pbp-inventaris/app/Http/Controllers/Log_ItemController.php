<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Log_item;

class Log_ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $log_item = Log_item::all();
        if($log_item)
        {
            return response()->json([
                'Message : ' => 'Berhasil mengambil data log item',
                'Log Item : ' => $log_item
            ], 200);
        }
        else
        {
            return response()->json([
                'Message : ' => 'Gagal mengambil data log item',
                'Log Item :' => null
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $log_item = Log_item::findOrFail($id);
        $log_item->delete();
        if($log_item)
        {
            $message = 'Data Item berhasil dihapus';
            return response()->json([
                'Message' => $message
            ], 200);
        }
        elseif (!$log_item) {
            $message = 'Data item gagal dihapus';
            return response()->json([
                'Message' => $message
            ], 404);
        }
    }
}
