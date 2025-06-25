<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rollo_telas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cd_tipo_tela');
            $table->foreign('cd_tipo_tela')->references('id')->on('tipo_telas')->onDelete('cascade');
            $table->unsignedBigInteger('cd_color');
            $table->foreign('cd_color')->references('id')->on('color_telas')->onDelete('cascade');
            $table->float('cantidad');
            $table->date('fecha_ingreso');
            $table->timestamps();
        });
    }

    
    public function down()
    {
        Schema::dropIfExists('rollo_telas');
    }
};
