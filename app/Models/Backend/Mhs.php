<?php

namespace App\Models\Backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mhs extends Model
{
    use HasFactory;
    protected $table = 'hama';
    protected $fillable = ["nama","gejala","pencegahan","gambar"];
}
