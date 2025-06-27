<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ColorTelaController;
use App\Http\Controllers\TipoTelaController;
use App\Http\Controllers\RolloTelaController;
use App\Http\Controllers\VentaTelasController;

Route::controller(ColorTelaController::class)->group( function () {
    Route::post('/createColor', 'store');
    Route::get('/showAllColors', 'showAll');
    Route::delete('/dropColor/{cd_Color}', 'destroy');
});

Route::controller(TipoTelaController::class)->group( function () {
    Route::post('/createTipoTela', 'store');
    Route::get('/showAllTiposTelas', 'showAll');
    Route::delete('/dropTipoTela/{cd_TipoTela}', 'destroy');
});

Route::controller(RolloTelaController::class)->group(function () {
    Route::post('/createRolloTela', 'store');
    Route::get('/showAllRolloTelas', 'showAll');
    Route::put('/updateRolloTela/{id}', 'edit');
    Route::delete('/dropRolloTela/{id}', 'destroy');
});

Route::controller(VentaTelasController::class)->group(function () {
    Route::post('/storeVenta', 'storeVenta');
    Route::get('/showAllVentas', 'showAll');
});