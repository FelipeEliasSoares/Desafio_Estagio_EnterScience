<?php

use App\Http\Controllers\ArtistController;

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/login', [AuthController::class, 'login']);



Route::get('/', function () {
    return view('welcome');
});



Route::post('/hire-artist', [ArtistController::class, 'hireArtist']);
