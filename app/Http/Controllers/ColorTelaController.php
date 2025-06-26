<?php

namespace App\Http\Controllers;

use App\Models\colorTela;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ColorTelaController extends Controller
{
    public function store(Request $request)
    {
        try
        {
            $request->validate([
                'nb_color_tela' => 'required|unique:color_telas,nb_color_tela'
            ]);
    
            $colorTela = colorTela::create([
                'nb_color_tela' => $request->nb_color_tela,
            ]);
    
            return response()->json([
                'code' => 200,
                'message' => 'Color creado con éxito',
                'detalle' => $colorTela
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
            $coloresTelas = colorTela::All();

            return response()->json([
                'code' => 200,
                'message' => 'exito',
                'detalle' => ['colores' => $coloresTelas]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 200,
                'message' => 'error',
                'detalle' => $e
            ], 200);
        }
    }
    
    public function destroy($id)
    {
        try {
            $colorTela = colorTela::find($id);

            if($colorTela) {
                $colorTela->delete();

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
