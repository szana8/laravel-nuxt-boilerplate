<?php

namespace App\Providers;

use App\Contracts\TwoFactorAuthenticateInterface;
use App\Services\TwoFactorAuthenticateService;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\ServiceProvider;
use PragmaRX\Google2FA\Google2FA;

class TwoFaAppServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(TwoFactorAuthenticateInterface::class, function ($app) {
            return new TwoFactorAuthenticateService(
                $app->make(Google2FA::class),
                $app->make(Repository::class)
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
