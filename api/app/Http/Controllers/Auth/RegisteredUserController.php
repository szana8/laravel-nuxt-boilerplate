<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Fortify\CreateNewUser;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Fortify\Fortify;

class RegisteredUserController
{
    /**
     * Create a new registered user.
     */
    public function store(Request $request): JsonResponse
    {
        // TODO implement proper registration
        //        if (config('fortify.lowercase_usernames')) {
        //            $request->merge([
        //                Fortify::username() => Str::lower($request->{Fortify::username()}),
        //            ]);
        //        }
        //
        //        $creator = new CreateNewUser();
        //
        //        event(new Registered($user = $creator->create($request->all())));
        //
        return new JsonResponse('', 201);
    }
}
