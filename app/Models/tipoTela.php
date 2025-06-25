<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tipoTela extends Model
{
    use HasFactory;
    protected $table = 'tipo_telas';

    protected $fillable = [
        'nb_tipo_tela'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
