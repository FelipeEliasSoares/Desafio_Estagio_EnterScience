<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    protected $fillable = ['name', 'genre', 'price']; // Atributos que podem ser preenchidos em massa

    // Se o nome da tabela não seguir a convenção do Laravel (plural do nome do modelo), você pode definir manualmente
    // protected $table = 'artists';
}
