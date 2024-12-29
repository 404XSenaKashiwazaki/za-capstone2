<?php

use App\Http\Controllers\Mhs\MhsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('hama', [MhsController::class,"index"])
        ->name('hama');
    Route::post('hama/search', [MhsController::class,"search"])
        ->name('hama.search');
    Route::post('hama/store', [MhsController::class,"store"])
    ->name('hama.store');
    Route::put('hama/update/{id}', [MhsController::class,"update"])
    ->name('hama.update');
    Route::delete('hama/destroy/{id}', [MhsController::class,"destroy"])
    ->name('hama.destroy');
});