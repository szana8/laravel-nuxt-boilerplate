<?php

namespace App\Http\Controllers\Auth;

use Psr\Http\Message\ServerRequestInterface;

class AccessTokenController extends \Laravel\Passport\Http\Controllers\AccessTokenController
{
    public function issueToken(ServerRequestInterface $request)
    {
        $response = parent::issueToken($request);
        $content = json_decode($response->getContent(), true);

        return response()->json(['test' => $content]);
    }
}
