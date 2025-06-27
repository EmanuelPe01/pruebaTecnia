<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\rolloTela;
use App\Models\venta_telas;

class VentaTelasController extends Controller
{
    public function storeVenta(Request $request)
    {
        try {
            $request->validate([
                'cd_rollo_tela' => 'required|exists:rollo_telas,id',
                'cantidad_vendida' => 'required|numeric|min:0.5',
                'fecha_venta' => 'required|date',
                'total_venta' => 'sometimes|numeric|min:1'
            ]);

            $rollo = rolloTela::findOrFail($request->cd_rollo_tela);

            if ($rollo->cantidad < $request->cantidad_vendida) {
                return response()->json([
                    'code' => 409,
                    'message' => 'La cantidad solicitada excede el inventario disponible.',
                    'detalle' => ['disponible' => $rollo->cantidad]
                ], 200);
            }

            $venta = venta_telas::create([
                'cd_rollo_tela' => $request->cd_rollo_tela,
                'cantidad_vendida' => $request->cantidad_vendida,
                'fecha_venta' => $request->fecha_venta,
                'total_venta' => $request->total_venta
            ]);

            $rollo->cantidad -= $request->cantidad_vendida;
            $rollo->save();

            return response()->json([
                'code' => 200,
                'message' => 'Venta registrada correctamente',
                'detalle' => $venta
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'code' => 400,
                'message' => 'Error de validación',
                'detalle' => $e->errors()
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Error en el servidor',
                'detalle' => $e->getMessage()
            ], 200);
        }
    }

    public function showAll()
    {
        try {
            $ventas = venta_telas::with(['rollo', 'rollo.tipoTela', 'rollo.colorTela'])
                ->orderBy('fecha_venta', 'desc')
                ->get()
                ->map(function ($venta) {
                    return [
                        'total_venta' => $venta->total_venta,
                        'cantidad_vendida' => $venta->cantidad_vendida,
                        'fecha_venta' => Carbon::parse($venta->fecha_venta)->format('d/m/Y'),
                        'rollo' => [
                            'tipo_tela' => $venta->rollo->tipoTela->nb_tipo_tela ?? null,
                            'color_tela' => $venta->rollo->colorTela->nb_color_tela ?? null,
                        ]
                    ];
                });

            return response()->json([
                'code' => 200,
                'message' => 'Ventas recuperadas correctamente',
                'detalle' => $ventas
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => 'Error al obtener ventas',
                'detalle' => $e->getMessage()
            ], 200);
        }
    }
}
