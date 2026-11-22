<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AngketNasionalController,
    AngketDigitalController,
    LaporanController,
    StatistikController
};

Route::get('/statistik', [StatistikController::class, 'index']);

Route::post('/angket-nasional', [AngketNasionalController::class, 'store']);
Route::get('/angket-nasional', [AngketNasionalController::class, 'index']);

Route::post('/angket-digital', [AngketDigitalController::class, 'store']);
Route::get('/angket-digital', [AngketDigitalController::class, 'index']);

Route::post('/laporan', [LaporanController::class, 'store']);
Route::get('/laporan', [LaporanController::class, 'index']);
Route::patch('/laporan/{id}/status', [LaporanController::class, 'updateStatus']);
Route::get('/laporan/cek/{tiket}', [LaporanController::class, 'cekStatus']);
Route::delete('/laporan/{id}', [LaporanController::class, 'destroy']);