<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Status;
class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $statuses = ['masuk', 'keluar'];
        foreach ($statuses as $key) {
            Status::create([
                'name_statuses' => $key
            ]);
        }
        //
    }
}
