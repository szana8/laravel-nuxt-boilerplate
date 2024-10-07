<?php

use App\Http\Controllers\Auth\AuthQrCodeController;
use App\Http\Controllers\Auth\AuthTwoFAController;
use App\Http\Controllers\Auth\RecoveryCodeController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', static function (Request $request) {
    return array_merge($request->user()->toArray(), []);
})->middleware('auth:api');

Route::post('/post', PostController::class)->middleware('auth:api');


Route::middleware(['auth:api'])->group(static function () {
    Route::apiResource('two-factor-qr-code', AuthQrCodeController::class)->only(['index']);
    Route::apiResource('two-factor-authentication', AuthTwoFAController::class)->only(['store', 'destroy'])->parameters(['two-factor-authentication' => 'user',]);
    Route::apiResource('two-factor-recovery-codes', RecoveryCodeController::class)->only(['index']);
});
