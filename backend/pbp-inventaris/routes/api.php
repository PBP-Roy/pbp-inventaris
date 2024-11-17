<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

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
