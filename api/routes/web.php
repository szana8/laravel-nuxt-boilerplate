<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::any('login', function () {
    return response()->json(['anyad']);
});
