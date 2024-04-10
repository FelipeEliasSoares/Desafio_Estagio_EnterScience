<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Fixed credentials for login
        $fixedCredentials = [
            'email' => 'user@example.com',
            'password' => 'password123'
        ];

        // Checks if the provided credentials match the fixed credentials
        if ($request->input('email') === $fixedCredentials['email'] && $request->input('password') === $fixedCredentials['password']) {
            // Authentication successful
            return response()->json(['message' => 'Login bem-sucedido'], 200);
        } else {
            // Credenciais inválidas
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }
    }
}
