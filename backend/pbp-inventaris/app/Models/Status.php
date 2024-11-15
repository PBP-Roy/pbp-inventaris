<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;
    protected $fillable = ['name_statuses'];

    // has
    public function logItems()
    {
        return $this->hasMany(Log_item::class);
    }
}
