<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    //return new \Illuminate\Http\JsonResponse(['message' => 'Welcome to the API']);
    broadcast(new \App\Events\OrderShipmentStatusUpdate());


    \App\Events\OrderShipmentStatusUpdate::dispatch();
});
