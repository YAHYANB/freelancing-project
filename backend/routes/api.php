<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GigController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user()->load('gigs');
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'Login']);
Route::post('/register', [AuthController::class, 'Register']);
Route::post('/logout', [AuthController::class, 'Logout'])->middleware('auth:sanctum');

Route::get('/gigs', [GigController::class, 'index']);
Route::get('/gig/show/{id}', [GigController::class, 'show']);
Route::post('/gigs/add', [GigController::class, 'store'])->middleware('auth:sanctum');
Route::post('/gigs/update/{id}', [GigController::class, 'update'])->middleware('auth:sanctum');
Route::post('/gigs/delete/{id}', [GigController::class, 'destroy'])->middleware('auth:sanctum');