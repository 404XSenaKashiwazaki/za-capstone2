<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataPasar extends Model
{
    use HasFactory;
    protected $fillable = [
        "permintaan_pasar",
        "harga",
        "tanamanId"
    ];
}
