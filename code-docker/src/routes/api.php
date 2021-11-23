<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::prefix('student')->group(function () {
    Route::get('/', [\App\Http\Controllers\StudentController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\StudentController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\StudentController::class, 'create']);
    Route::put('/{id}', [\App\Http\Controllers\StudentController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\StudentController::class, 'destroy']);
});

Route::prefix('course')->group(function () {
    Route::get('/', [\App\Http\Controllers\CourseController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\CourseController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\CourseController::class, 'create']);
    Route::put('/{id}', [\App\Http\Controllers\CourseController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\CourseController::class, 'destroy']);
});

Route::prefix('enrollment')->group(function () {
    Route::get('/', [\App\Http\Controllers\EnrollmentController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\EnrollmentController::class, 'show']);
    Route::post('/', [\App\Http\Controllers\EnrollmentController::class, 'create']);
    Route::put('/{id}', [\App\Http\Controllers\EnrollmentController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\EnrollmentController::class, 'destroy']);
});
