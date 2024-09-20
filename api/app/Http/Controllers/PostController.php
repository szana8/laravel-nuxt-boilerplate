<?php

namespace App\Http\Controllers;

use App\Events\PostCreated;
use App\Http\Resources\PostCreatedResource;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $post = Post::create([
            'message' => $request->input('message'),
            'user_id' => auth()->id(),
        ]);

        PostCreated::dispatch(new PostCreatedResource($post));
    }
}
