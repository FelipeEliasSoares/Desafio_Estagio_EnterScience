<?php

use App\Http\Controllers\ArtistController;

use App\Http\Controllers\AuthController;

use Illuminate\Support\Facades\Route;


//Authentication route
Route::post('/login', [AuthController::class, 'login']);

//Route of my customers
Route::get('/my-clients', [ArtistController::class, 'getMyClients']);


Route::get('/', function () {
    return view('welcome');
});



Route::post('/hire-artist', [ArtistController::class, 'hireArtist']);

// Route to update a client
Route::put('/clients/{id}', [ArtistController::class, 'updateClient']);

// Route to delete a customer
Route::get('/clients/{id}/delete', [ArtistController::class, 'deleteClient']);


