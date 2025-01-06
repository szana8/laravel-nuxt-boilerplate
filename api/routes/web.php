<?php

use App\Events\OrderShipmentStatusUpdate;
use App\Events\PostCreated;
use App\Http\Resources\PostCreatedResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // broadcast(new OrderShipmentStatusUpdate(User::find(1)));

    broadcast(new PostCreated(new PostCreatedResource(Post::find(1))));

    return 'Event dispatched';
});
