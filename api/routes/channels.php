<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;


Broadcast::channel('user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});
