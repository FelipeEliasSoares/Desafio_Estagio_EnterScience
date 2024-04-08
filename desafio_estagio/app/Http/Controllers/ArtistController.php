<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArtistController extends Controller
{
    // Caminho do arquivo JSON para armazenar os dados dos clientes
    private $filePath = 'clients.json';

    // Função para lidar com a solicitação GET em http://localhost:8000/my-clients
    public function getMyClients(Request $request)
    {
        // Verifica se o arquivo JSON existe
        if (Storage::exists($this->filePath)) {
            // Recupere os dados dos clientes do arquivo JSON
            $clients = json_decode(Storage::get($this->filePath), true);
        } else {
            $clients = [];
        }

        // Retorne os dados dos clientes como JSON
        return response()->json($clients);
    }

    // Função para contratar um artista (mantenha essa função)
    public function hireArtist(Request $request)
    {
        // Valide os dados do formulário
        $validatedData = $request->validate([
            'name' => 'string',
            'artist' => 'string',
            'fee' => 'numeric',
            'eventDate' => 'date',
            'address' => 'string',
        ]);

        // Gerar um ID único
        $validatedData['id'] = uniqid();

        // Salvar os dados dos clientes no arquivo JSON
        $clients = [];
        if (Storage::exists($this->filePath)) {
            $clients = json_decode(Storage::get($this->filePath), true);
        }

        $clients[] = $validatedData;
        Storage::put($this->filePath, json_encode($clients));

        // Retorna a mensagem de sucesso
        return response()->json([
            'success' => true,
            'message' => 'Artista contratado com sucesso!',
            'data' => $validatedData,
        ]);
    }
    public function deleteClient($id)
    {
        $clients = [];
        if (Storage::exists($this->filePath)) {
            $clients = json_decode(Storage::get($this->filePath), true);
        }
    
        // Percorre os clientes e remove o cliente com o ID fornecido
        $filteredClients = array_filter($clients, function ($client) use ($id) {
            return isset($client['id']) && $client['id'] !== $id;
        });
    
        // Atualiza o arquivo JSON com os clientes filtrados
        Storage::put($this->filePath, json_encode(array_values($filteredClients)));
    
        return response()->json([
            'success' => true,
            'message' => 'Cliente deletado com sucesso!',
            'deleted_client_id' => $id,
        ]);
    }
    
    

    // Função para atualizar os dados de um cliente pelo seu ID
    public function updateClient(Request $request)
    {
        $idToUpdate = $request->input('id');
        $updatedData = $request->except('id');

        $clients = [];
        if (Storage::exists($this->filePath)) {
            $clients = json_decode(Storage::get($this->filePath), true);
        }

        // Percorre os clientes e atualiza os dados do cliente com o ID fornecido
        foreach ($clients as &$client) {
            if ($client['id'] === $idToUpdate) {
                $client = array_merge($client, $updatedData);
            }
        }

        // Atualiza o arquivo JSON com os clientes atualizados
        Storage::put($this->filePath, json_encode($clients));

        return response()->json([
            'success' => true,
            'message' => 'Cliente atualizado com sucesso!',
            'updated_client_id' => $idToUpdate,
            'updated_data' => $updatedData,
        ]);
    }

}
