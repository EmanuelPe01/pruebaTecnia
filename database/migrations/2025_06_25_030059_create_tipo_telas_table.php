<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tipo_telas', function (Blueprint $table) {
            $table->id();
            $table->string('nb_tipo_tela');
            $table->timestamps();
        });

        DB::table('tipo_telas')->insert([
            ['nb_tipo_tela' => 'Algodón', 'created_at' => now(), 'updated_at' => now()],
            ['nb_tipo_tela' => 'Lino', 'created_at' => now(), 'updated_at' => now()],
            ['nb_tipo_tela' => 'Poliéster', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }


    public function down()
    {
        Schema::dropIfExists('tipo_telas');
    }
};
