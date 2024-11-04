<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->bigIncrements('items_id');
            $table->foreignId('categories_id')->constrained('categories', 'categories_id');
            $table->foreignId('magnitudes_id')->constrained('magnitudes', 'magnitudes_id');
            $table->string('name_items');
            $table->integer('stock eligible');
            $table->integer('stock defective');
            $table->binary('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
