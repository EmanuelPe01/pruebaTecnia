<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\colorTela as colorTela;
use App\Models\tipoTela as tipoTela;

class rolloTela extends Model
{
    use HasFactory;
    protected $table = 'rollo_telas';

    protected $fillable = [
        'cd_tipo_tela',
        'cd_color',
        'cantidad',
        'fecha_ingreso'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function colorTela() {
        return $this->belongsTo(colorTela::class, 'cd_color');
    }

    public function tipoTela () {
        return $this->belongsTo(tipoTela::class, 'cd_tipo_tela');
    }
}
