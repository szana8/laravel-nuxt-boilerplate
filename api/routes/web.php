<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    //return view('welcome');
    //return new \Illuminate\Http\JsonResponse(['message' => 'Welcome to the API']);
    broadcast(new \App\Events\OrderShipmentStatusUpdate());
    return 'Event dispatched';


    //\App\Events\OrderShipmentStatusUpdate::dispatch();
});
