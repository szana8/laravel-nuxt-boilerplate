<?php

namespace App\Contracts\Auth;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

interface TwoFactorAuthenticateInterface
{
    /**
     * Generate a new secret key.
     */
    public function generateSecretKey(): string;

    /**
     * Get the two factor authentication QR code URL.
     */
    public function qrCodeUrl(string $companyName, string $companyEmail, string $secret): string;

    /**
     * Verify the given token.
     */
    public function verify(string $secret, string $code): bool;

    public function validRecoveryCode(string $recoveryCode, User|Authenticatable $user): mixed;
}
