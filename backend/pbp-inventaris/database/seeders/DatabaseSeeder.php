<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(MagnitudesSeeder::class);
        $this->call(StatusSeeder::class);
        $this->call(ItemSeeder::class);
        // \App\Models\User::factory(10)->create();
    }
}
