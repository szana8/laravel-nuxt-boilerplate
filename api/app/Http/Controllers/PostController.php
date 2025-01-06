<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Events\PostCreated;
use App\Http\Resources\PostCreatedResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $post = Post::create([
            'message' => $request->input(key: 'message'),
            'user_id' => Auth::user()->id,
        ]);

        PostCreated::dispatch(new PostCreatedResource($post));
    }
}
