<?php

use App\Http\Controllers\Mhs\MhsController;
use App\Http\Controllers\Posts\PostsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('tanaman', [PostsController::class,"index"])
        ->name('tanaman');
        Route::post('tanaman/search', [PostsController::class,"search"])
        ->name('tanaman.search');
    Route::post('tanaman/store', [PostsController::class,"store"])
    ->name('tanaman.store');
    Route::put('tanaman/update/{id}', [PostsController::class,"update"])
    ->name('tanaman.update');
    Route::delete('tanaman/destroy/{id}', [PostsController::class,"destroy"])
    ->name('tanaman.destroy');
});