<?php

use App\Http\Controllers\ArtistController;

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/login', [AuthController::class, 'login']);


Route::get('/my-clients', [ArtistController::class, 'getMyClients']);


Route::get('/', function () {
    return view('welcome');
});



Route::post('/hire-artist', [ArtistController::class, 'hireArtist']);

// Rota para atualizar um cliente
Route::put('/clients/{id}', [ArtistController::class, 'updateClient']);

// Rota para excluir um cliente
Route::get('/clients/{id}/delete', [ArtistController::class, 'deleteClient']);


