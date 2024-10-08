<?php

use App\Http\Controllers\Auth\TwoFactorQrCodeController;
use App\Http\Controllers\Auth\AuthTwoFAController;
use App\Http\Controllers\Auth\RecoveryCodeController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', static function (Request $request) {
    return array_merge($request->user()->toArray(), []);
})->middleware('auth:api');

Route::post('/post', PostController::class)->middleware('auth:api');

Route::post('/oauth/token', [\App\Http\Controllers\Auth\AccessTokenController::class, 'issueToken']);

Route::middleware(['auth:api'])->as('two-factor')->group(static function () {
    Route::get('two-factor-qr-code', TwoFactorQrCodeController::class)->name('enable');
    Route::apiResource('two-factor-authentication', AuthTwoFAController::class)->only(['store', 'destroy'])->parameters(['two-factor-authentication' => 'user']);
    Route::apiResource('two-factor-recovery-codes', RecoveryCodeController::class)->only(['index']);
});
