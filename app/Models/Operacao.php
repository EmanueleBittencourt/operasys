<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Operacao extends Model
{
    protected $table = 'operacoes';
    
    protected $primaryKey = 'id_operacao';

    protected $fillable = [
        'user_id',
        'cliente_id',
        'titulo',
        'data_operacao',
        'data_vencimento',
        'valor',
        'desembolso',
        'juros',
        'qtd_parcelas',
        'status',
        'observacao',
    ];

    protected $casts = [
        'data_operacao' => 'date',
        'data_vencimento' => 'date',
        'valor' => 'decimal:2',
        'desembolso' => 'decimal:2',
        'juros' => 'decimal:2',
    ];

    // Status disponíveis para o Kanban
    public const STATUS = [
        'pendente' => 'Pendente',
        'em_andamento' => 'Em Andamento',
        'concluida' => 'Concluída',
        'cancelada' => 'Cancelada',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(Cliente::class, 'cliente_id', 'id_cliente');
    }
}

