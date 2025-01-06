<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('user.{userId}', static function ($user, $userId) {
    Log::info('user channel');
    return (int) $user->id === (int) $userId;
});

Broadcast::channel('chat.{userId}', static function ($user, $userId) {
    Log::info('chat channel');
    return (int) $user->id === (int) $userId;
});

