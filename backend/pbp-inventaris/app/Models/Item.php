<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $fillable = ['name_items', 'categories_id', 'magnitudes_id'];
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