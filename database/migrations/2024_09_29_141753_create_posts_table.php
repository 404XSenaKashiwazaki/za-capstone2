<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tanaman', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("nama");
            $table->string("gambar")->default("image/default.jpg");
            $table->enum("jenis",["Buah","Sayur"])->default("Sayur");
            $table->string("teknik_penanaman");
            $table->string("lingkungan");
            $table->string("periode_panen");
            // $table->text('body');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tanaman');
    }
};
