<?php

namespace App\Actions\Auth;

use App\Contracts\Auth\TwoFactorAuthenticateInterface;
use Illuminate\Support\Collection;

class EnableTwoFactorAuthentication
{
    protected TwoFactorAuthenticateInterface $provider;


    public function __construct(TwoFactorAuthenticateInterface $provider)
    {
        $this->provider = $provider;
    }


    public function __invoke($user, $force = false): void
    {
        if (empty($user->two_factor_secret) || $force === true) {
            $user->forceFill(
                [
                    'two_factor_secret' => encrypt($this->provider->generateSecretKey()),
                    'two_factor_recovery_codes' => encrypt(
                        json_encode(Collection::times(8, static function () {
                            return RecoveryCode::generate();
                        })->all(), JSON_THROW_ON_ERROR)
                    ),
                ]
            );
        }
    }
}
