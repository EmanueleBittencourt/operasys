import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

function formatDate(date) {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR');
}

const statusColors = {
    pendente: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
    em_andamento: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    concluida: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    cancelada: { bg: 'bg-gray-50', text: 'text-gray-500', dot: 'bg-gray-400' },
};

const statusLabels = {
    pendente: 'Pendente',
    em_andamento: 'Em Andamento',
    concluida: 'Concluída',
    cancelada: 'Cancelada',
};

export default function Dashboard({ 
    operacoesMesAtual = [], 
    stats = {}, 
    proximosVencimentos = [],
    mesAtual = ''
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Cards de Estatísticas */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Card Valor Total do Mês */}
                        <div className="overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-indigo-100">Vencimentos em {mesAtual}</p>
                                    <p className="mt-2 text-3xl font-bold text-white">{formatCurrency(stats.valor_total_mes)}</p>
                                    <p className="mt-1 text-sm text-indigo-200">{stats.qtd_vencimentos_mes || 0} operações</p>
                                </div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-white">
                                        <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Card Total de Clientes */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-emerald-600">
                                        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Clientes Ativos</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.clientes_ativos || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Card Operações Pendentes */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-amber-600">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Pendentes</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.operacoes_pendentes || 0}</p>
                                </div>
                            </div>
                        </div>

                        {/* Card Operações em Andamento */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-blue-600">
                                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Em Andamento</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.operacoes_em_andamento || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Próximos Vencimentos */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                <h3 className="font-semibold text-gray-900">
                                    <span className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-red-500">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                                        </svg>
                                        Próximos Vencimentos
                                    </span>
                                </h3>
                                <Link 
                                    href={route('operacoes.index')} 
                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Ver todas →
                                </Link>
                            </div>
                            
                            <div className="divide-y divide-gray-100">
                                {proximosVencimentos.length > 0 ? (
                                    proximosVencimentos.map((operacao) => (
                                        <div key={operacao.id_operacao} className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${statusColors[operacao.status]?.bg}`}>
                                                    <span className={`h-2.5 w-2.5 rounded-full ${statusColors[operacao.status]?.dot}`}></span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{operacao.titulo}</p>
                                                    <p className="text-sm text-gray-500">{operacao.cliente?.nome}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-900">{formatCurrency(operacao.valor)}</p>
                                                <p className="text-sm text-red-600">{formatDate(operacao.data_vencimento)}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-10 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="mx-auto h-10 w-10 text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-500">Nenhum vencimento nos próximos 7 dias</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resumo de Operações do Mês */}
                        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                                <h3 className="font-semibold text-gray-900">
                                    <span className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-indigo-500">
                                            <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                        </svg>
                                        Operações de {mesAtual}
                                    </span>
                                </h3>
                                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                                    {operacoesMesAtual.length} operações
                                </span>
                            </div>
                            
                            <div className="max-h-[320px] divide-y divide-gray-100 overflow-y-auto">
                                {operacoesMesAtual.length > 0 ? (
                                    operacoesMesAtual.map((operacao) => (
                                        <Link 
                                            key={operacao.id_operacao} 
                                            href={route('operacoes.show', operacao.id_operacao)}
                                            className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-gray-50"
                                        >
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="truncate font-medium text-gray-900">{operacao.titulo}</p>
                                                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[operacao.status]?.bg} ${statusColors[operacao.status]?.text}`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${statusColors[operacao.status]?.dot}`}></span>
                                                        {statusLabels[operacao.status]}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{operacao.cliente?.nome}</p>
                                            </div>
                                            <div className="ml-4 text-right">
                                                <p className="font-semibold text-gray-900">{formatCurrency(operacao.valor)}</p>
                                                <p className="text-xs text-gray-500">Venc: {formatDate(operacao.data_vencimento)}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-6 py-10 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="mx-auto h-10 w-10 text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                        </svg>
                                        <p className="mt-2 text-sm text-gray-500">Nenhuma operação com vencimento neste mês</p>
                                        <Link
                                            href={route('operacoes.create')}
                                            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                            </svg>
                                            Nova Operação
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
