<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\rolloTela;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RolloTelaController extends Controller
{

    public function store(Request $request)
    {
        try {
            $request->validate([
                'cd_tipo_tela' => 'required|exists:tipo_telas,id',
                'cd_color' => 'required|exists:color_telas,id',
                'cantidad' => 'required|numeric|min:0',
                'fecha_ingreso' => 'required|date',
            ]);

            // Verificar si ya existe la combinación de tipo de tela y color
            $existe = rolloTela::where('cd_tipo_tela', $request->cd_tipo_tela)
                ->where('cd_color', $request->cd_color)
                ->exists();

            if ($existe) {
                return response()->json([
                    'code' => 409,
                    'message' => 'Ya existe un rollo con esta combinación de tipo de tela y color.',
                    'detalle' => null
                ], 200);
            }

            $rollo = rolloTela::create($request->only([
                'cd_tipo_tela',
                'cd_color',
                'cantidad',
                'fecha_ingreso'
            ]));

            return response()->json([
                'code' => 200,
                'message' => 'Rollo de tela creado con éxito',
                'detalle' => $rollo
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
        try {
            $rollos = rolloTela::with(['colorTela', 'tipoTela'])->get();

            $detalleRollos = $rollos->map(function ($rollo) {
                return [
                    'id' => $rollo->id,
                    'cantidad' => $rollo->cantidad,
                    'fecha_ingreso' => Carbon::parse($rollo->fecha_ingreso)->format('d/m/Y'),
                    'color' => $rollo->colorTela,       // detalle completo de la relación
                    'tipo_tela' => $rollo->tipoTela      // detalle completo de la relación
                ];
            });

            return response()->json([
                'code' => 200,
                'message' => 'Éxito',
                'detalle' => ['rollos' => $detalleRollos]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Error inesperado',
                'detalle' => $e->getMessage()
            ], 200);
        }
    }

    public function edit(Request $request, $id)
    {
        try {
            $rollo = rolloTela::find($id);

            if (!$rollo) {
                return response()->json([
                    'code' => 404,
                    'message' => 'Rollo no encontrado'
                ], 200);
            }

            $request->validate([
                'cd_tipo_tela' => 'sometimes|exists:tipo_telas,id',
                'cd_color' => 'sometimes|exists:color_telas,id',
                'cantidad' => 'sometimes|numeric|min:0',
                'fecha_ingreso' => 'sometimes|date',
            ]);

            $rollo->update($request->only([
                'cd_tipo_tela',
                'cd_color',
                'cantidad',
                'fecha_ingreso'
            ]));

            return response()->json([
                'code' => 200,
                'message' => 'Rollo de tela actualizado',
                'detalle' => $rollo
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


    public function destroy($id)
    {
        try {
            $rollo = rolloTela::find($id);

            if (!$rollo) {
                return response()->json([
                    'code' => 404,
                    'message' => 'Rollo no encontrado'
                ], 200);
            }

            $rollo->delete();

            return response()->json([
                'code' => 200,
                'message' => 'Rollo eliminado con éxito'
            ], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Error en la base de datos',
                'detalle' => $e->getMessage()
            ], 200);
        }
    }
}
