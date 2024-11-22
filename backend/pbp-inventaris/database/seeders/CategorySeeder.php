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
        $kategori = [ 'Makanan', 'Minuman', 'Sayuran', 'Buah-Buahan', 'Lainnya'];
        foreach ($kategori as $key) {
            Category::create([
                'name_categories' => $key
            ]);
        }
    }
}