<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('operacoes', function (Blueprint $table) {
            $table->id('id_operacao');

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('cliente_id')->constrained('clientes', 'id_cliente')->onDelete('cascade');

            $table->string('titulo');
            $table->date('data_operacao');
            $table->date('data_vencimento')->nullable();

            $table->decimal('valor', 10, 2);
            $table->decimal('desembolso', 10, 2)->nullable();
            $table->decimal('juros', 5, 2)->nullable();

            $table->integer('qtd_parcelas')->nullable();
            $table->enum('status', ['pendente', 'em_andamento', 'concluida', 'cancelada'])->default('pendente');
            $table->text('observacao')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('operacoes');
    }
};
