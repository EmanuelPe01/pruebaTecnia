<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\rolloTela;

class venta_telas extends Model
{
    protected $table = 'venta_telas';

    protected $fillable = [
        'cd_rollo_tela',
        'cantidad_vendida',
        'fecha_venta',
        'total_venta'
    ];

    public function rollo()
    {
        return $this->belongsTo(rolloTela::class, 'cd_rollo_tela');
    }
}
