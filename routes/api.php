<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ColorTelaController;
use App\Http\Controllers\TipoTelaController;


Route::controller(ColorTelaController::class)->group( function () {
    Route::post('/createColor', 'store');
    Route::get('/showAllColors', 'showAll');
});

Route::controller(TipoTelaController::class)->group( function () {
    Route::post('/createTela', 'store');
    Route::get('/showAllTelas', 'showAll');
});