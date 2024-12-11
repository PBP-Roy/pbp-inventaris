<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Category;
use App\Models\Log_item;
use App\Models\Magnitude;
use App\Models\Status;

class fetchController extends Controller
{
    public function getAllData()
    {
        $userId = auth()->id();
        $items = Item::all()->map(function ($item) {
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
        });
        $categories = Category::all();
        $logs = Log_item::all();
        $status = Status::all();
        $magnitudes = Magnitude::where('users_id', 0)->orWhere('users_id', $userId)->get();
        $lowStock = Item::whereRaw('(eligible_items + defective_items) < 5')->get();
        $topTen = Log_item::select('items_id')
            ->selectRaw('SUM(eligible_log_items + defectives_log_items) as total_items')
            ->where('statuses_id', 2)
            ->groupBy('items_id')
            ->orderByDesc('total_items')
            ->take(10)
            ->get();

        return response()->json([
            'message' => 'Semua data berhasil diambil',
            'data' => [
                'items' => $items,
                'categories' => $categories,
                'magnitudes' => $magnitudes,
                'logs' => $logs,
                'statuses' => $status,
                'lowStock' => $lowStock,
                'topTen' => $topTen
            ]
        ], 200);
    }
}
