<?php

namespace App\Actions\Auth;

use Illuminate\Support\Str;

class RecoveryCode
{
    /**
     * Generate a new recovery code.
     *
     * @return string
     */
    public static function generate(): string
    {
        return Str::random(10).'-'.Str::random(10);
    }
}
