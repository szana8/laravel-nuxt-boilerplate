<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\GenerateNewRecoveryCodes;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RecoveryCodeController extends Controller
{
    public function index(): JsonResponse
    {
        if (! $this->user->two_factor_secret ||
            ! $this->user->two_factor_recovery_codes) {
            return response()->json([]);
        }

        return response()->json(
            json_decode(decrypt($this->user->two_factor_recovery_codes), true, 512, JSON_THROW_ON_ERROR)
        );
    }

    public function store(Request $request, GenerateNewRecoveryCodes $generate)
    {
        $generate($this->user);

        return app(GenerateNewRecoveryCodes::class);
    }
}
