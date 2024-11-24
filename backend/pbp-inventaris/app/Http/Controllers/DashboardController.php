<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;
use App\Models\magnitude;
use App\Models\User;
use App\Models\Log_item;

class DashboardController extends Controller
{
    // public function User
    // {
    //     $user = User::all();
    //     if($user)
    //     {
    //         return response->json([
    //             'Message' => 'Data user berhasil diambil',
    //             'User' => [
    //                 $user->;
    //             ]
    //         ])
    //     }
    // }
    public function dashboard()
    {
        $summary = $this->Summary();
        $lowstock = $this->LowStockProduct();
        if($summary && $lowstock)
        {
            return response()->json([
                'Message' => 'Data untuk dashboard berhasil diambil',
                'Summary' => $summary,
                'Low Quantity Stock' => $lowstock,
            ], 200);
        }
        else
        {
            return response()->json([
                'Message' => 'Data untuk dashboard gagal diambil',
            ], 404);
        }
    }

    public function Summary()
    {
        $summary = Item::all();
        $product = Log_item::all();
        if($summary && $product)
        {
            $totalcategories = $summary->pluck('categories_id')->unique()->count();
            $totalproduct = $summary->pluck('id')->count();
            $totalproductin = $product->where('statuses_id', 1)->pluck('statuses_id')->count();
            $totalproductout = $product->where('statuses_id', 2)->pluck('statuses_id')->count();
            return response()->json([
                'Message' => 'Data berhasil diambil',
                'TotalCategory' => $totalcategories,
                'TotalProduct' => $totalproduct,
                'TotalProductIn' => $totalproductin,
                'TotalProductOut' => $totalproductout,
            ], 200);
        }
        else
        {
            return response()->json([
                'Message' => 'Gagal mengambil data'
            ], 404);
        }
    }

    public function LowStockProduct()
    {
        // Mengambil produk dengan stock rendah langsung dari database
        $lowStockProducts = Item::whereRaw('(eligible_items + defective_items) < 5')->get();
    
        if ($lowStockProducts->isNotEmpty()) {
            return response()->json([
                'Message' => 'Data berhasil diambil',
                'Low Quantity Stock' => $lowStockProducts,
            ]);
        } else {
            return response()->json([
                'Message' => 'Tidak ada produk dengan stock rendah',
            ], 404);
        }
    }
}
