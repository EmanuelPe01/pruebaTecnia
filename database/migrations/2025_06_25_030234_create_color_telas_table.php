<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('color_telas', function (Blueprint $table) {
            $table->id();
            $table->string('nb_color_tela');
            $table->timestamps();
        });

        DB::table('color_telas')->insert([
            ['nb_color_tela' => 'Rojo', 'created_at' => now(), 'updated_at' => now()],
            ['nb_color_tela' => 'Azul', 'created_at' => now(), 'updated_at' => now()],
            ['nb_color_tela' => 'Verde', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('color_telas');
    }
};
