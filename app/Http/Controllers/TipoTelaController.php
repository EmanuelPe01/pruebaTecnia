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
    
            $tipoTela = tipoTela::create([
                'nb_tipo_tela' => $request->nb_tipo_tela,
            ]);
    
            return response()->json([
                'code' => 200,
                'message' => 'Tipo de tela creado con éxito',
                'detalle' => $tipoTela
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
            $tiposTelas = tipoTela::All();

            return response()->json([
                'code' => 200,
                'message' => 'exito',
                'detalle' => ['telas' => $tiposTelas]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'error',
                'detalle' => $e
            ], 200);
        }
    }

    public function destroy($id)
    {
        try {
            $tipoTela = tipoTela::find($id);

            if($tipoTela) {
                $tipoTela->delete();

                return response()->json([
                    'code' => 200,
                    'message' => 'Registro eliminado'
                ], 200);
            } else {
                return response()->json(404);
            }
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Error en la base de datos',
                'error' => $e->getMessage()
            ], 200);
        }
    }
}
