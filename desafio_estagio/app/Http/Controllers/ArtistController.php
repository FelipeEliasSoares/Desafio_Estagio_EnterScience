<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ArtistController extends Controller
{
    // JSON file path to store customer data
    private $filePath = 'clients.json';

    // Function to handle GET request at http://localhost:8000/my-clients
    public function getMyClients(Request $request)
    {
        // Checks if the JSON file exists
        if (Storage::exists($this->filePath)) {
            // Retrieve customer data from JSON file
            $clients = json_decode(Storage::get($this->filePath), true);
        } else {
            $clients = [];
        }

        // Return customer data as JSON
        return response()->json($clients);
    }

    // Function to hire an artist (keep this function)
    public function hireArtist(Request $request)
    {
        // Validates form data
        $validatedData = $request->validate([
            'name' => 'string',
            'artist' => 'string',
            'img' => 'string',
            'fee' => 'numeric',
            'eventDate' => 'date',
            'address' => 'string',
        ]);

        // Check if the artist is already hired for the given event date
        $existingClients = $this->getClientsByEventDate($validatedData['artist'], $validatedData['eventDate']);
        if (!empty($existingClients)) {
            return response()->json([
                'success' => false,
                'message' => 'Este artista já está contratado para esta data!',
            ], 402);
        }

        // Generate a unique ID
        $validatedData['id'] = uniqid();

        // Save customer data to JSON file
        $clients = [];
        if (Storage::exists($this->filePath)) {
            $clients = json_decode(Storage::get($this->filePath), true);
        }

        $clients[] = $validatedData;
        Storage::put($this->filePath, json_encode($clients));

        // Returns success message
        return response()->json([
            'success' => true,
            'message' => 'Artista contratado com sucesso!',
            'data' => $validatedData,
        ]);
    }

    // Function to get clients by event date
    private function getClientsByEventDate($artist, $eventDate)
    {
        $clients = [];
        if (Storage::exists($this->filePath)) {
            $clients = json_decode(Storage::get($this->filePath), true);
        }

        // Filter clients by artist and event date
        $filteredClients = array_filter($clients, function ($client) use ($artist, $eventDate) {
            return $client['artist'] === $artist && Carbon::parse($client['eventDate'])->isSameDay(Carbon::parse($eventDate));
        });

        return $filteredClients;
    }


    public function deleteClient($id)
    {
        $clients = [];
        if (Storage::exists($this->filePath)) {
            $clients = json_decode(Storage::get($this->filePath), true);
        }
    
        // Cycles through the clients and removes the client with the given ID
        $filteredClients = array_filter($clients, function ($client) use ($id) {
            return isset($client['id']) && $client['id'] !== $id;
        });
    
        // Update the JSON file with filtered customers
        Storage::put($this->filePath, json_encode(array_values($filteredClients)));
    
        return response()->json([
            'success' => true,
            'message' => 'Cliente deletado com sucesso!',
            'deleted_client_id' => $id,
        ]);
    }
    
    

    // Function to update a customer's data using their ID
    public function updateClient(Request $request)
    {
        $idToUpdate = $request->input('id');
        $updatedData = $request->except('id');

        $clients = [];
        if (Storage::exists($this->filePath)) {
            $clients = json_decode(Storage::get($this->filePath), true);
        }

        // Cycle through customers and update customer data with the given ID
        foreach ($clients as &$client) {
            if ($client['id'] === $idToUpdate) {
                $client = array_merge($client, $updatedData);
            }
        }

        // Update the JSON file with the updated clients
        Storage::put($this->filePath, json_encode($clients));

        return response()->json([
            'success' => true,
            'message' => 'Cliente atualizado com sucesso!',
            'updated_client_id' => $idToUpdate,
            'updated_data' => $updatedData,
        ]);
    }

}
