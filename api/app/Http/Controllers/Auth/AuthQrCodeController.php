<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

class AuthQrCodeController extends Controller
{
    public function index(): mixed
    {
        if (!$this->user->is2FA()) {
            $this->user->enable2fa();
        }

        return $this->user->twoFactorQrCodeSvg();
    }
}
