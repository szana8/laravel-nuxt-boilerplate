<?php

use App\Events\OrderShipmentStatusUpdate;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    broadcast(new OrderShipmentStatusUpdate(User::find(1)));

    return 'Event dispatched';
});
