<?php

use App\Http\Controllers\PestidaController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('pestisida', [PestidaController::class,"index"])
        ->name('pestisida');
    Route::get('pestisida/hama', [PestidaController::class,"getHama"])
        ->name('pestisida.hama');;
    Route::post('pestisida/search', [PestidaController::class,"search"])
        ->name('pestisida.search');
    Route::post('pestisida/store', [PestidaController::class,"store"])
    ->name('pestisida.store');
    Route::put('pestisida/update/{id}', [PestidaController::class,"update"])
    ->name('pestisida.update');
    Route::delete('pestisida/destroy/{pestida}', [PestidaController::class,"destroy"])
    ->name('pestisida.destroy');
});
