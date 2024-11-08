<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use App\Models\Item;
use App\Models\Log_item;
use App\Models\Magnitude;
use App\Models\Status;
class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $kategori = Category::pluck('id')->toArray();
        $satuan = Magnitude::pluck('id')->toArray();
        $status = Status::pluck('id')->toArray();
        if (empty($kategori) || empty($satuan)) {
            throw new \Exception('Table kategori or satuan is empty');
        }

        for ($i=0; $i < 10; $i++) {
            $stock_eli = rand(0, 100);
            $stock_def = rand(0, 10);
            Item::create([
                'name_items' => 'Barang ' . $i,
                'categories_id' => $kategori[array_rand($kategori)],
                'magnitudes_id' => $satuan[array_rand($satuan)],
                'stock eligible' => $stock_eli,
                'stock defective' => $stock_def,
            ]);
            if ($stock_eli > 1) {
                Log_item::create([
                    'items_id' => $i + 1,
                    'total stock' => $stock_eli,
                    'statuses_id' => $status[0],
                ]);
            }
            if ($stock_def >= 1) {
                Log_item::create([
                    'items_id' => $i + 1,
                    'total stock' => $stock_def,
                    'statuses_id' => $status[2],
                ]);
            }
        }
        //
    }
}
