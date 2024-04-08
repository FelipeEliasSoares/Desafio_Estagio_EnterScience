<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckAuthentication
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->session()->get('authenticated')) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
