<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Credenciais fixas para login
        $fixedCredentials = [
            'email' => 'user@example.com',
            'password' => 'password123'
        ];

        // Verifica se as credenciais fornecidas correspondem às credenciais fixas
        if ($request->input('email') === $fixedCredentials['email'] && $request->input('password') === $fixedCredentials['password']) {
            // Autenticação bem-sucedida
            return response()->json(['message' => 'Login bem-sucedido'], 200);
        } else {
            // Credenciais inválidas
            return response()->json(['message' => 'Credenciais inválidas'], 401);
        }
    }
}
