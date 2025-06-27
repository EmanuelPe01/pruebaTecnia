<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venta_telas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cd_rollo_tela');
            $table->foreign('cd_rollo_tela')->references('id')->on('rollo_telas')->onDelete('cascade');
            $table->double('cantidad_vendida');
            $table->date('fecha_venta');
            $table->float('total_venta');
            $table->timestamps();
        });
    }
};
