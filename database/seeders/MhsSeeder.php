<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class MhsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("mhs")->insert([
            "nama" => "Fauzzy",
            "npm" => 221410093,
            "postId" => 1,
            "image" => "http://127.0.0.1:8000/storage/image/default.jfif",
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
    }
}
