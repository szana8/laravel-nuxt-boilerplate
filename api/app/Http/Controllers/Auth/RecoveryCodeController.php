<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecoveryCodeController extends Controller
{
    public function index(): array|JsonResponse
    {
        if (!$this->user->is2FA()) {
            return [];
        }

        return response()->json(
            json_decode(decrypt($this->user->two_factor_recovery_codes), true, 512, JSON_THROW_ON_ERROR)
        );
    }
}
