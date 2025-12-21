<?php

namespace App\Policies;

use App\Models\Operacao;
use App\Models\User;

class OperacaoPolicy
{
    public function view(User $user, Operacao $operacao): bool
    {
        return $user->id === $operacao->user_id;
    }

    public function update(User $user, Operacao $operacao): bool
    {
        return $user->id === $operacao->user_id;
    }

    public function delete(User $user, Operacao $operacao): bool
    {
        return $user->id === $operacao->user_id;
    }
}

