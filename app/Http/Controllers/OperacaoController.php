<?php

namespace App\Http\Controllers;

use App\Models\Operacao;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperacaoController extends Controller
{
    public function index()
    {
        $operacoes = Operacao::where('user_id', auth()->id())
            ->with('cliente')
            ->orderBy('created_at', 'desc')
            ->get();

        $clientes = Cliente::where('user_id', auth()->id())
            ->where('status', true)
            ->orderBy('nome')
            ->get();

        // Agrupa por status para o Kanban
        $kanban = [
            'pendente' => $operacoes->where('status', 'pendente')->values(),
            'em_andamento' => $operacoes->where('status', 'em_andamento')->values(),
            'concluida' => $operacoes->where('status', 'concluida')->values(),
            'cancelada' => $operacoes->where('status', 'cancelada')->values(),
        ];

        $stats = [
            'total' => $operacoes->count(),
            'pendente' => $operacoes->where('status', 'pendente')->count(),
            'em_andamento' => $operacoes->where('status', 'em_andamento')->count(),
            'concluida' => $operacoes->where('status', 'concluida')->count(),
            'valor_total' => $operacoes->sum('valor'),
            'valor_concluido' => $operacoes->where('status', 'concluida')->sum('valor'),
        ];

        return Inertia::render('Operacoes/Index', [
            'operacoes' => $operacoes,
            'kanban' => $kanban,
            'clientes' => $clientes,
            'stats' => $stats,
            'statusLabels' => Operacao::STATUS,
        ]);
    }

    public function create()
    {
        $clientes = Cliente::where('user_id', auth()->id())
            ->where('status', true)
            ->orderBy('nome')
            ->get();

        return Inertia::render('Operacoes/Create', [
            'clientes' => $clientes,
            'statusLabels' => Operacao::STATUS,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id_cliente',
            'titulo' => 'required|string|max:255',
            'data_operacao' => 'required|date',
            'data_vencimento' => 'nullable|date',
            'valor' => 'required|numeric|min:0',
            'desembolso' => 'nullable|numeric|min:0',
            'juros' => 'nullable|numeric|min:0',
            'qtd_parcelas' => 'nullable|integer|min:1',
            'status' => 'nullable|in:pendente,em_andamento,concluida,cancelada',
            'observacao' => 'nullable|string',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['status'] = $validated['status'] ?? 'pendente';

        Operacao::create($validated);

        return redirect()->route('operacoes.index')
            ->with('success', 'Operação criada com sucesso!');
    }

    public function show(Operacao $operacao)
    {
        $this->authorize('view', $operacao);

        $operacao->load('cliente');

        return Inertia::render('Operacoes/Show', [
            'operacao' => $operacao,
            'statusLabels' => Operacao::STATUS,
        ]);
    }

    public function edit(Operacao $operacao)
    {
        $this->authorize('update', $operacao);

        $clientes = Cliente::where('user_id', auth()->id())
            ->where('status', true)
            ->orderBy('nome')
            ->get();

        return Inertia::render('Operacoes/Edit', [
            'operacao' => $operacao,
            'clientes' => $clientes,
            'statusLabels' => Operacao::STATUS,
        ]);
    }

    public function update(Request $request, Operacao $operacao)
    {
        $this->authorize('update', $operacao);

        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id_cliente',
            'titulo' => 'required|string|max:255',
            'data_operacao' => 'required|date',
            'data_vencimento' => 'nullable|date',
            'valor' => 'required|numeric|min:0',
            'desembolso' => 'nullable|numeric|min:0',
            'juros' => 'nullable|numeric|min:0',
            'qtd_parcelas' => 'nullable|integer|min:1',
            'status' => 'required|in:pendente,em_andamento,concluida,cancelada',
            'observacao' => 'nullable|string',
        ]);

        $operacao->update($validated);

        return redirect()->route('operacoes.index')
            ->with('success', 'Operação atualizada com sucesso!');
    }

    public function destroy(Operacao $operacao)
    {
        $this->authorize('delete', $operacao);

        $operacao->delete();

        return redirect()->route('operacoes.index')
            ->with('success', 'Operação excluída com sucesso!');
    }

    // Atualiza apenas o status (para drag & drop no Kanban)
    public function updateStatus(Request $request, Operacao $operacao)
    {
        $this->authorize('update', $operacao);

        $validated = $request->validate([
            'status' => 'required|in:pendente,em_andamento,concluida,cancelada',
        ]);

        $operacao->update($validated);

        return back()->with('success', 'Status atualizado!');
    }
}

