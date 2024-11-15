<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = ['name_items', 'categories_id', 'magnitudes_id'];
    // Menambahkan accessor untuk menghitung stock
    public function getStockAttribute()
    {
        // Menghitung stock sebagai jumlah eligible_items dan defective_items
        return $this->eligible_items + $this->defective_items;
    }
    // belong to
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function magnitude()
    {
        return $this->belongsTo(Magnitude::class);
    }

    // has
    public function log_item()
    {
        return $this->hasMany(Log_item::class);
    }
}
