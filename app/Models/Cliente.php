<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cliente extends Model
{
    protected $table = 'clientes';
    
    protected $primaryKey = 'id_cliente';
    
    protected $fillable = [
        'user_id',
        'nome',
        'email',
        'telefone_primario',
        'telefone_secundario',
        'cpf_cnpj',
        'endereco',
        'bairro',
        'cidade',
        'estado',
        'cep',
        'observacoes',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
