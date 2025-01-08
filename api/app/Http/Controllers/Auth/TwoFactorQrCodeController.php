<?php

namespace App\Http\Controllers\Auth;

use LogicException;
use App\Models\User;
use Illuminate\Http\Request;

class TwoFactorQrCodeController extends Controller
{
    public function __invoke(Request $request)
    {
        if (!$this->user instanceof User) {
            throw new LogicException("User must be an instance of " . User::class);
        }

        if (is_null($this->user->two_factor_secret)) {
            return [];
        }

        return response()->json([
            'svg' => $this->user->twoFactorQrCodeSvg(),
            'url' => $this->user->twoFactorQrCodeUrl(),
        ]);
    }
}
