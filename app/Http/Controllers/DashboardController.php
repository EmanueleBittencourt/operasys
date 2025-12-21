<?php

namespace App\Http\Controllers;

use App\Models\Operacao;
use App\Models\Cliente;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        Carbon::setLocale('pt_BR');
        $userId = auth()->id();
        
        // Operações do mês atual com vencimento
        $operacoesMesAtual = Operacao::where('user_id', $userId)
            ->whereMonth('data_vencimento', now()->month)
            ->whereYear('data_vencimento', now()->year)
            ->with('cliente')
            ->orderBy('data_vencimento')
            ->get();

        // Valor total das operações do mês
        $valorTotalMes = $operacoesMesAtual->sum('valor');

        // Estatísticas gerais
        $stats = [
            'total_clientes' => Cliente::where('user_id', $userId)->count(),
            'clientes_ativos' => Cliente::where('user_id', $userId)->where('status', true)->count(),
            'total_operacoes' => Operacao::where('user_id', $userId)->count(),
            'operacoes_pendentes' => Operacao::where('user_id', $userId)->where('status', 'pendente')->count(),
            'operacoes_em_andamento' => Operacao::where('user_id', $userId)->where('status', 'em_andamento')->count(),
            'valor_total_mes' => $valorTotalMes,
            'qtd_vencimentos_mes' => $operacoesMesAtual->count(),
        ];

        // Próximos vencimentos (próximos 7 dias)
        $proximosVencimentos = Operacao::where('user_id', $userId)
            ->whereBetween('data_vencimento', [now(), now()->addDays(7)])
            ->whereIn('status', ['pendente', 'em_andamento'])
            ->with('cliente')
            ->orderBy('data_vencimento')
            ->limit(5)
            ->get();

        $meses = [
            1 => 'Janeiro', 2 => 'Fevereiro', 3 => 'Março', 4 => 'Abril',
            5 => 'Maio', 6 => 'Junho', 7 => 'Julho', 8 => 'Agosto',
            9 => 'Setembro', 10 => 'Outubro', 11 => 'Novembro', 12 => 'Dezembro'
        ];
        
        $mesAtual = $meses[now()->month] . ' de ' . now()->year;

        return Inertia::render('Dashboard', [
            'operacoesMesAtual' => $operacoesMesAtual,
            'stats' => $stats,
            'proximosVencimentos' => $proximosVencimentos,
            'mesAtual' => $mesAtual,
        ]);
    }
}

