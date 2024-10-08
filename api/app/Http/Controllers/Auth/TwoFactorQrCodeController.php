<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;

class TwoFactorQrCodeController extends Controller
{
    public function __invoke(Request $request)
    {
        if (is_null($this->user->two_factor_secret)) {
            return [];
        }

        return response()->json([
            'svg' => $this->user->twoFactorQrCodeSvg(),
            'url' => $this->user->twoFactorQrCodeUrl(),
        ]);
    }
}
