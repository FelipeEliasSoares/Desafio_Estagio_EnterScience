<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class SpotifyController extends Controller
{
    public function searchArtists(Request $request)
    {
        $searchQuery = $request->input('searchQuery');
        
        // Realizar a chamada para a API do Spotify para buscar artistas
        $client = new Client();
        $response = $client->request('GET', 'https://api.spotify.com/v1/search', [
            'query' => [
                'q' => $searchQuery,
                'type' => 'artist'
            ]
        ]);

        $artists = json_decode($response->getBody(), true)['artists']['items'];

        // Retornar os resultados como JSON
        return response()->json($artists);
    }
}
