<?php

namespace Database\Seeders;

use App\Models\Magnitude;
use App\Models\User;
use Illuminate\Database\Seeder;

class MagnitudesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::pluck('id')->toArray();
        $magnitudes = ['pcs', 'kg', 'gr', 'mg', 'm', 'cm', 'mm', 'l', 'ml', 'lainnya'];
        foreach ($magnitudes as $key) {
            Magnitude::create([
                'users_id' => 0,
                'name_magnitudes' => $key
            ]);
        }
        //
    }
}
