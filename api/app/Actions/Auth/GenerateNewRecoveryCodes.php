<?php

namespace App\Actions\Auth;

use Illuminate\Support\Collection;

class GenerateNewRecoveryCodes
{
    public function __invoke($user): void
    {
        $user->forceFill([
            'two_factor_recovery_codes' => encrypt(json_encode(Collection::times(8, function () {
                return RecoveryCode::generate();
            })->all())),
        ])->save();
    }
}
