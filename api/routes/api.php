<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/user', function (Request $request) {
    return array_merge($request->user()->toArray(), [
        'two_factor_enabled' => Features::enabled(Features::twoFactorAuthentication())
            && ! is_null($request->user()->two_factor_secret),
    ]);
})->middleware('auth:api');

// Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);

Route::post('/post', PostController::class)->middleware('auth:api');
