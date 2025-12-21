<?php

namespace App\Policies;

use App\Models\Cliente;
use App\Models\User;

class ClientePolicy
{
    /**
     * Usuário só pode ver/editar/excluir seus próprios clientes
     */
    public function view(User $user, Cliente $cliente): bool
    {
        return $user->id === $cliente->user_id;
    }

    public function update(User $user, Cliente $cliente): bool
    {
        return $user->id === $cliente->user_id;
    }

    public function delete(User $user, Cliente $cliente): bool
    {
        return $user->id === $cliente->user_id;
    }
}

