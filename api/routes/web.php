<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    broadcast(new \App\Events\OrderShipmentStatusUpdate(\App\Models\User::find(1)));
    return 'Event dispatched';
});
