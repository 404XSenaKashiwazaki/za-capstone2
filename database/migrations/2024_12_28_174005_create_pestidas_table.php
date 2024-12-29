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
        Schema::create('pestidas', function (Blueprint $table) {
            $table->id();
            $table->string("nama");
            $table->enum("type",['herbisida', 'insektisida', 'fungisida', 'bakterisida', 'lainnya']);
            $table->unsignedBigInteger("hamaId");
            $table->foreign("hamaId")->references("id")->on("hama")->onDelete("cascade");
            $table->longText("kandungan_bahan");
            $table->string("metode_penggunaan");
            $table->string("dosis");
            $table->dateTime("kadaluarsa");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pestidas');
    }
};
