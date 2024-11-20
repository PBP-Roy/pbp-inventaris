<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\MagnitudeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Log_ItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

//kategori
Route::get('/kategori', [KategoriController::class, 'index']);

Route::get('/kategori/{id}', [KategoriController::class, 'show']);

Route::post('/kategori', [KategoriController::class, 'store']);

Route::put('/kategori/{id}', [KategoriController::class, 'update']);

Route::delete('/kategori/{id}', [KategoriController::class, 'destroy']);

//magnitude
Route::get('/magnitude', [MagnitudeController::class, 'index']);

Route::get('/magnitude/{id}', [MagnitudeController::class, 'show']);

Route::post('/magnitude', [MagnitudeController::class, 'store']);

Route::put('/magnitude/{id}', [MagnitudeController::class, 'update']);

Route::delete('/magnitude/{id}', [MagnitudeController::class, 'destroy']);

//users
Route::get('/users', [UserController::class, 'index']);

Route::get('/users/{id}', [UserController::class, 'show']);

Route::post('/users', [MagnitudeController::class, 'store']);

Route::put('/users/{id}', [MagnitudeController::class, 'update']);

Route::delete('/users/{id}', [MagnitudeController::class, 'destroy']);

// CRUD item
Route::get('/Item',[ItemController::class,'index']);
Route::post('/Item',[ItemController::class,'store']);
Route::get('/Item/{id}',[ItemController::class,'show']);
Route::put('/Item/{id}', [ItemController::class, 'update']);
Route::delete('/Item/{id}',[ItemController::class, 'destroy']);

// Get all data log_item
Route::get('/log',[Log_ItemController::class, 'index']);
Route::delete('/log/{id}',[Log_ItemController::class, 'destroy']);

// Get data for dashboard
Route::get('/Dashboard',[DashboardController::class, 'dashboard']);
