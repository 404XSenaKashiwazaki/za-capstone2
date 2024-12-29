<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("posts")->insert([
            "kode" => "FT-001",
            "nama" => "Informatika",
            "created_at" => Carbon::now()->format('Y-m-d H:i:s'),
        ]);
    }
}
