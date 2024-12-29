<?php

namespace App\Models\Backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;
    protected $table = 'tanaman';
    protected $fillable = ["nama","gambar","jenis","teknik_penanaman","lingkungan","periode_panen"];
}
