<?php

namespace App\Providers;

use App\Observers\TokenObserver;
use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Token;

class TwoFaEventServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Token::observe(TokenObserver::class);
    }
}
