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
    protected static function booted()
    {
        static::created(function ($item) {
            $masukStatus = Status::where('name_statuses', 'masuk')->first();  // Assuming 'masuk' is the status name for stock-in
            if ($masukStatus) {
                Log_item::create([
                    'items_id' => $item->id,
                    'eligible_log_items' => $item->eligible_items,
                    'defectives_log_items' => $item->defective_items,
                    'statuses_id' => $masukStatus->id,
                ]);
            }
        });
    
        static::updated(function ($item) {
            // Ambil status untuk 'masuk' atau 'keluar' berdasarkan perbedaan nilai
            $status = '';
            $eligibleDifference = $item->eligible_items - $item->getOriginal('eligible_items');
            $defectiveDifference = $item->defective_items - $item->getOriginal('defective_items');
    
            if ($eligibleDifference > 0 || $defectiveDifference > 0) {
                $status = 'masuk';  // Status 'masuk' jika ada penambahan
            } elseif ($eligibleDifference < 0 || $defectiveDifference < 0) {
                $status = 'keluar';  // Status 'keluar' jika ada pengurangan
            }
    
            $statusModel = Status::where('name_statuses', $status)->first();
            
            if ($statusModel) {
                Log_item::create([
                    'items_id' => $item->id,
                    'eligible_log_items' => abs($eligibleDifference), // Catat hanya selisih yang berubah
                    'defectives_log_items' => abs($defectiveDifference), // Catat hanya selisih yang berubah
                    'statuses_id' => $statusModel->id,
                ]);
            }
        });
    }
    
}
