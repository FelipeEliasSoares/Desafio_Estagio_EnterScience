<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\SpotifyController;

Route::get('/', function () {
    return view('welcome');
});



Route::get('/search-artists', [SpotifyController::class, 'searchArtists']);

Route::post('/hire-artist', [ArtistController::class, 'hireArtist']);
