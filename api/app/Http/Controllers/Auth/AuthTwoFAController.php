<?php

namespace App\Http\Controllers\Auth;

use App\Contracts\Auth\TwoFactorAuthenticateInterface;
use App\Http\Requests\Auth\AuthRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AuthTwoFAController extends Controller
{
    public function __construct(private TwoFactorAuthenticateInterface $authentication)
    {
        parent::__construct();
    }

    public function store(AuthRequest $request)
    {
        if ($this->verify($request)) {
            $authEnable = $this->user->update(
                [
                    'two_factor_enable' => true,
                ]
            );

            return response()->json(
                [
                    'enabled' => $authEnable,
                ]
            );
        }

        return response()->json('invalid code');
    }

    public function destroy(User $user, AuthRequest $request): JsonResponse
    {
        $flag = false;

        if (is_null($user->two_factor_secret)) {
            return [];
        }

        if ($this->authentication->validRecoveryCode($request->get('code'), $this->user)) {
            $user->replaceRecoveryCode($request->get('code'));
            $flag = true;
        } elseif ($this->authentication->verify(decrypt($user->two_factor_secret), $request->get('code'))) {
            $flag = true;
        }

        if ($flag) {
            $isDisabled = $user->disable2fa();

            return response()->json(
                [
                    'disabled' => $isDisabled,
                ]
            );
        }

        return response()->json('invalid code');
    }

    public function verify(AuthRequest $request): bool
    {
        return $this->authentication->verify(decrypt($this->user->two_factor_secret), $request->code);
    }
}
