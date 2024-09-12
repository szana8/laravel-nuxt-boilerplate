<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Passport\Http\Middleware\CheckClientCredentials;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withBroadcasting(
         __DIR__.'/../routes/channels.php',
        ['prefix' => 'api', 'middleware' => 'auth:api']
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'client' => CheckClientCredentials::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
