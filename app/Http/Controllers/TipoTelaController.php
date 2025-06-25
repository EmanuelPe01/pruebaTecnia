<?php

namespace App\Http\Controllers;

use App\Models\tipoTela;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TipoTelaController extends Controller
{

    public function store(Request $request)
    {
        try
        {
            $request->validate([
                'nb_tipo_tela' => 'required|unique:tipo_telas,nb_tipo_tela'
            ]);
    
            $um = tipoTela::create([
                'nb_tipo_tela' => $request->nb_tipo_tela,
            ]);
    
            return response()->json([
                'code' => 200,
                'message' => 'Tipo de tela creado con éxito',
                'detalle' => $um
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'code' => 400,
                'message' => 'Error de validación',
                'detalle' => $e->errors()
            ], 200);
        
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Error en la base de datos',
                'detalle' => $e->getMessage()
            ], 200);
        }
    }

    public function showAll()
    {
        try{
            $coloresTelas = tipoTela::All();

            return response()->json([
                'code' => 200,
                'message' => 'exito',
                'detalle' => ['telas' => $coloresTelas]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 200,
                'message' => 'error',
                'detalle' => $e
            ], 200);
        }
    }

    public function edit(tipoTela $tipoTela)
    {
        //
    }

    public function update(Request $request, tipoTela $tipoTela)
    {
        //
    }

    public function destroy(tipoTela $tipoTela)
    {
        //
    }
}
