<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\DisableTwoFactorAuthentication;
use App\Actions\Auth\EnableTwoFactorAuthentication;
use App\Contracts\Auth\TwoFactorDisabledResponse;
use App\Contracts\Auth\TwoFactorEnabledResponse;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use JsonException;

class TwoFactorAuthenticationController extends Controller
{
    /**
     * Enable two factor authentication for the user.
     *
     * @param Request $request
     * @param EnableTwoFactorAuthentication $enable
     * @return Responsable
     * @throws JsonException
     */
    public function store(Request $request, EnableTwoFactorAuthentication $enable): Responsable
    {
        $enable($this->user, $request->boolean('force', false));

        return app(TwoFactorEnabledResponse::class);
    }

    /**
     * Disable two factor authentication for the user.
     *
     * @param Request $request
     * @param DisableTwoFactorAuthentication $disable
     * @return Responsable
     */
    public function destroy(Request $request, DisableTwoFactorAuthentication $disable): Responsable
    {
        $disable($this->user);

        return app(TwoFactorDisabledResponse::class);
    }
}
