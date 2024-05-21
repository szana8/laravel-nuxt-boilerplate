<?php

use App\Http\Controllers\Authenticate\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('login', [LoginController::class, 'authenticate'])->name('login');
