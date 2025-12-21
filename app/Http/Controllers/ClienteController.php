<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = Cliente::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();

        $stats = [
            'total' => $clientes->count(),
            'active' => $clientes->where('status', true)->count(),
            'inactive' => $clientes->where('status', false)->count(),
            'thisMonth' => $clientes->where('created_at', '>=', now()->startOfMonth())->count(),
        ];

        return Inertia::render('Clientes/Index', [
            'clientes' => $clientes,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Clientes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telefone_primario' => 'nullable|string|max:20',
            'telefone_secundario' => 'nullable|string|max:20',
            'cpf_cnpj' => 'nullable|string|max:20',
            'endereco' => 'nullable|string',
            'bairro' => 'nullable|string|max:100',
            'cidade' => 'nullable|string|max:100',
            'estado' => 'nullable|string|max:2',
            'cep' => 'nullable|string|max:10',
            'observacoes' => 'nullable|string',
            'status' => 'nullable|boolean',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['status'] = $validated['status'] ?? true;

        Cliente::create($validated);

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente criado com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        $this->authorize('view', $cliente);

        return Inertia::render('Clientes/Show', [
            'cliente' => $cliente,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        $this->authorize('update', $cliente);

        return Inertia::render('Clientes/Edit', [
            'cliente' => $cliente,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        $this->authorize('update', $cliente);

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'telefone_primario' => 'nullable|string|max:20',
            'telefone_secundario' => 'nullable|string|max:20',
            'cpf_cnpj' => 'nullable|string|max:20',
            'endereco' => 'nullable|string',
            'bairro' => 'nullable|string|max:100',
            'cidade' => 'nullable|string|max:100',
            'estado' => 'nullable|string|max:2',
            'cep' => 'nullable|string|max:10',
            'observacoes' => 'nullable|string',
            'status' => 'nullable|boolean',
        ]);

        $cliente->update($validated);

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente atualizado com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        $this->authorize('delete', $cliente);

        $cliente->delete();

        return redirect()->route('clientes.index')
            ->with('success', 'Cliente excluído com sucesso!');
    }
}
