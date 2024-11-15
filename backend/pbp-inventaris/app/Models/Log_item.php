<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Log_item extends Model
{
    use HasFactory;
    protected $fillable = [
        'eligible_items',
        'defective_items',
        'items_id',
        'status_id',
    ];
    // belong to
    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
