<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class ,'Login']);
Route::post('/register', [AuthController::class ,'Register']);
Route::post('/logout', [AuthController::class, 'Logout'])->middleware('auth:sanctum');