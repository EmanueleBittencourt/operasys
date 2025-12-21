import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const statusColors = {
    pendente: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
    em_andamento: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
    concluida: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    cancelada: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-500', dot: 'bg-gray-400' },
};

const statusLabelsMap = {
    pendente: 'Pendente',
    em_andamento: 'Em Andamento',
    concluida: 'Concluída',
    cancelada: 'Cancelada',
};

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function formatDate(date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
}

// Componente Card do Kanban
function KanbanCard({ operacao, onStatusChange }) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('operacaoId', operacao.id_operacao);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="group cursor-grab rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md active:cursor-grabbing"
        >
            <div className="mb-2 flex items-start justify-between">
                <h4 className="font-medium text-gray-900 line-clamp-2">{operacao.titulo}</h4>
                <Link
                    href={route('operacoes.edit', operacao.id_operacao)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-gray-400 hover:text-indigo-600">
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    </svg>
                </Link>
            </div>
            
            <p className="mb-3 text-sm text-gray-500">{operacao.cliente?.nome || 'Cliente não encontrado'}</p>
            
            <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900">{formatCurrency(operacao.valor)}</span>
                <span className="text-gray-400">{formatDate(operacao.data_vencimento)}</span>
            </div>
        </div>
    );
}

// Componente Coluna do Kanban
function KanbanColumn({ status, operacoes, onDrop }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const colors = statusColors[status];

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const operacaoId = e.dataTransfer.getData('operacaoId');
        onDrop(operacaoId, status);
    };

    return (
        <div
            className={`flex min-h-[500px] flex-col rounded-xl border-2 ${isDragOver ? 'border-indigo-400 bg-indigo-50/50' : colors.border + ' ' + colors.bg}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className={`flex items-center justify-between border-b ${colors.border} p-4`}>
                <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${colors.dot}`}></div>
                    <h3 className={`font-semibold ${colors.text}`}>{statusLabelsMap[status]}</h3>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors.bg} ${colors.text} ring-1 ring-inset ${colors.border}`}>
                    {operacoes.length}
                </span>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {operacoes.map((operacao) => (
                    <KanbanCard key={operacao.id_operacao} operacao={operacao} />
                ))}
                
                {operacoes.length === 0 && (
                    <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-sm text-gray-400">Arraste operações aqui</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Index({ operacoes = [], kanban = {}, stats = {}, statusLabels = {} }) {
    const [viewMode, setViewMode] = useState('kanban'); // 'kanban' ou 'table'
    const [search, setSearch] = useState('');

    const filteredOperacoes = operacoes.filter(op =>
        op.titulo?.toLowerCase().includes(search.toLowerCase()) ||
        op.cliente?.nome?.toLowerCase().includes(search.toLowerCase())
    );

    const handleStatusChange = (operacaoId, newStatus) => {
        router.patch(route('operacoes.updateStatus', operacaoId), {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta operação?')) {
            router.delete(route('operacoes.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Operações</h2>
                    <Link
                        href={route('operacoes.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 hover:shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        Nova Operação
                    </Link>
                </div>
            }
        >
            <Head title="Operações" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-indigo-600">
                                        <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                        <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-amber-600">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Pendentes</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.pendente || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-blue-600">
                                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Em Andamento</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.em_andamento || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-emerald-600">
                                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Valor Total</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.valor_total)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* View Toggle & Search */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1">
                            <button
                                onClick={() => setViewMode('kanban')}
                                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                    viewMode === 'kanban' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                    <path d="M2 4.5A2.5 2.5 0 014.5 2h11a2.5 2.5 0 010 5h-11A2.5 2.5 0 012 4.5zM2.75 9.083a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 12.663a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.75zM2.75 16.25a.75.75 0 000 1.5h14.5a.75.75 0 100-1.5H2.75z" />
                                </svg>
                                Kanban
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                    viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                    <path fillRule="evenodd" d="M.99 5.24A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25l.01 9.5A2.25 2.25 0 0116.76 17H3.26A2.267 2.267 0 011 14.74l-.01-9.5zm8.26 9.52v-3.5l-2.25.001v3.5l2.25-.001zm1.5 0l2.25.002v-3.503l-2.25.002v3.5zm2.25-5l.001-3.25-2.25.001-.001 3.25 2.25-.001zm-3.75-3.25v3.25l-2.25.001v-3.25l2.25-.001zM3.25 6.75l-.001 3.251 2.25.001.001-3.25-2.25-.002zm0 4.75l-.002 3.25 2.251.002.002-3.252-2.251-.001zm11.26-4.748l2.25.002-.002 3.25-2.25-.002.002-3.25zm2.248 4.752l-2.25-.002-.001 3.252 2.25.002.001-3.252z" clipRule="evenodd" />
                                </svg>
                                Tabela
                            </button>
                        </div>

                        <div className="relative w-full sm:w-80">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gray-400">
                                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar operações..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Kanban View */}
                    {viewMode === 'kanban' && (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                            {['pendente', 'em_andamento', 'concluida', 'cancelada'].map((status) => (
                                <KanbanColumn
                                    key={status}
                                    status={status}
                                    operacoes={kanban[status] || []}
                                    onDrop={handleStatusChange}
                                />
                            ))}
                        </div>
                    )}

                    {/* Table View */}
                    {viewMode === 'table' && (
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-100">
                                    <thead className="bg-gray-50/50">
                                        <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:pl-6">
                                                Operação
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Cliente
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Valor
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Vencimento
                                            </th>
                                            <th className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Status
                                            </th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Ações</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 bg-white">
                                        {filteredOperacoes.map((operacao) => (
                                            <tr key={operacao.id_operacao} className="transition-colors hover:bg-gray-50/50">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                                    <div className="font-medium text-gray-900">{operacao.titulo}</div>
                                                    <div className="text-sm text-gray-500">{formatDate(operacao.data_operacao)}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                                                    {operacao.cliente?.nome || '-'}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                                    {formatCurrency(operacao.valor)}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                                                    {formatDate(operacao.data_vencimento)}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[operacao.status]?.bg} ${statusColors[operacao.status]?.text} ring-1 ring-inset ${statusColors[operacao.status]?.border}`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${statusColors[operacao.status]?.dot}`}></span>
                                                        {statusLabelsMap[operacao.status]}
                                                    </span>
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            href={route('operacoes.show', operacao.id_operacao)}
                                                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </Link>
                                                        <Link
                                                            href={route('operacoes.edit', operacao.id_operacao)}
                                                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                                            </svg>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(operacao.id_operacao)}
                                                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredOperacoes.length === 0 && (
                                <div className="px-6 py-14 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                    </svg>
                                    <h3 className="mt-4 text-sm font-semibold text-gray-900">Nenhuma operação encontrada</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {search ? 'Tente buscar por outro termo.' : 'Comece criando sua primeira operação.'}
                                    </p>
                                    {!search && (
                                        <div className="mt-6">
                                            <Link
                                                href={route('operacoes.create')}
                                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                                </svg>
                                                Nova Operação
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


