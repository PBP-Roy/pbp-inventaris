<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Magnitude;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(CategorySeeder::class);
        // $this->call(MagnitudesSeeder::class);
        // $this->call(StatusSeeder::class);
        $this->call([ItemSeeder::class]);
        // \App\Models\User::factory(10)->create();
    }
}
