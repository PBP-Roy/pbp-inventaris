<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $kategori = ['Elektronik', 'Pakaian', 'Makanan', 'Minuman', 'Buku'];
        foreach ($kategori as $key) {
            Category::create([
                'name_categories' => $key
            ]);
        }
    }
}
