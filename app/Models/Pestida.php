<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pestida extends Model
{
    use HasFactory;

    protected $fillable = [
        "nama",
        "type",
        "hamaId",
        "kandungan_bahan",
        "metode_penggunaan",
        "dosis",
        "kadaluarsa",
        "gambar"
    ];
}
