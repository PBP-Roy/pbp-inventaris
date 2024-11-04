<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{   
    use HasFactory;
    public static function getdata() {
       return   
       [
                [
                    'Buku' => 'namabuku',
                    'Pensil' => 'namapensil',
                    'Penghapus' => 'namapenghapus'
                ],
                [
                    'Buku' => 'namabuku',
                    'Pensil' => 'namapensil',
                    'Penghapus' => 'namapenghapus'
                ],
                [
                    'Buku' => 'namabuku',
                    'Pensil' => 'namapensil',
                    'Penghapus' => 'namapenghapus'
                ]
        ];
   }
}
