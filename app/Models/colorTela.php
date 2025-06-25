<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class colorTela extends Model
{
    use HasFactory;
    protected $table = 'color_telas';


    protected $fillable = [
        'nb_color_tela'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
