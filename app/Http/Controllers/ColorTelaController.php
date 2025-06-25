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
    
            $um = colorTela::create([
                'nb_color_tela' => $request->nb_color_tela,
            ]);
    
            return response()->json([
                'code' => 200,
                'message' => 'Color creado con éxito',
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

    public function edit(colorTela $colorTela)
    {
        //
    }

    public function update(Request $request, colorTela $colorTela)
    {
        //
    }

    public function destroy(colorTela $colorTela)
    {
        //
    }
}
