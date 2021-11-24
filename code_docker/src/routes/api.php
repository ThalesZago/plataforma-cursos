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
//Autenticação

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['cors', 'json.response']], function () {
    Route::post('/login', 'App\Http\Controllers\Auth\ApiAuthController@login')->name('login.api');
    Route::post('/register', 'App\Http\Controllers\Auth\ApiAuthController@register')->name('register.api');
});

Route::middleware('auth:api')->group(function () {
    // our routes to be protected will go in here
    Route::post('/logout', 'App\Http\Controllers\Auth\ApiAuthController@logout')->name('logout.api');
});

Route::middleware('auth:api')->group(function () {
    Route::get('/articles', 'ArticleController@index')->middleware('api.admin')->name('articles');
});

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
