<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function hireArtist(Request $request)
    {
        // Valide os dados do formulário
        $validatedData = $request->validate([
            'name' => 'string',
            'artist' => 'string',
            'fee' => 'numeric',
            'event_date' => 'date',
            'address' => 'string',
        ]);

        // Salve os dados em algum lugar, como no banco de dados
        // Aqui estamos apenas retornando os dados para demonstração
        return response()->json([
            'success' => true,
            'message' => 'Artista contratado com sucesso!',
            'data' => $validatedData,
        ]);
    }
}
