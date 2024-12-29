<?php

use App\Http\Controllers\DataPasarController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('market', [DataPasarController::class,"index"])
        ->name('market');
    Route::get('market/tanaman', [DataPasarController::class,"getTanaman"])
        ->name('market.tanaman');
    Route::post('market/search', [DataPasarController::class,"search"])
        ->name('market.search');
    Route::post('market/store', [DataPasarController::class,"store"])
        ->name('market.store');
    Route::put('market/update/{id}', [DataPasarController::class,"update"])
        ->name('market.update');
    Route::delete('market/destroy/{dataPasar}', [DataPasarController::class,"destroy"])
        ->name('market.destroy');
});