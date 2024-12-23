<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Magnitude extends Model
{
    use HasFactory;
    protected $fillable = ['name_magnitudes', 'users_id'];
    // belong to
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // has many
    public function item()
    {
        return $this->hasMany(Item::class);
    }

}
