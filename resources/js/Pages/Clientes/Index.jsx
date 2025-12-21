import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ clientes = [], stats = {} }) {
    const [search, setSearch] = useState('');

    const filteredClientes = clientes.filter(cliente =>
        cliente.nome?.toLowerCase().includes(search.toLowerCase()) ||
        cliente.email?.toLowerCase().includes(search.toLowerCase()) ||
        cliente.telefone_primario?.includes(search)
    );

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir este cliente?')) {
            router.delete(route('clientes.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Clientes
                    </h2>
                    <Link
                        href={route('clientes.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                        Novo Cliente
                    </Link>
                </div>
            }
        >
            <Head title="Clientes" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-indigo-600">
                                        <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-emerald-600">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Ativos</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.active || 0}</p>
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
                                    <p className="text-sm font-medium text-gray-500">Inativos</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.inactive || 0}</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-violet-600">
                                        <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Novos este mês</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.thisMonth || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
                        {/* Search Bar */}
                        <div className="border-b border-gray-100 p-4">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gray-400">
                                        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar por nome, email ou telefone..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="block w-full rounded-lg border-0 py-2.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 sm:pl-6">
                                            Cliente
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Telefone
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Cidade
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Status
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Ações</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 bg-white">
                                    {filteredClientes.map((cliente) => (
                                        <tr key={cliente.id_cliente} className="transition-colors hover:bg-gray-50/50">
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-semibold text-white">
                                                        {cliente.nome?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{cliente.nome}</div>
                                                        <div className="text-sm text-gray-500">{cliente.email || '-'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                                                {cliente.telefone_primario || '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                                                {cliente.cidade ? `${cliente.cidade}/${cliente.estado}` : '-'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    cliente.status 
                                                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' 
                                                        : 'bg-gray-50 text-gray-600 ring-1 ring-inset ring-gray-500/10'
                                                }`}>
                                                    {cliente.status ? 'Ativo' : 'Inativo'}
                                                </span>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={route('clientes.show', cliente.id_cliente)}
                                                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                                        title="Ver detalhes"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </Link>
                                                    <Link
                                                        href={route('clientes.edit', cliente.id_cliente)}
                                                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                                                        title="Editar"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(cliente.id_cliente)}
                                                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                                        title="Excluir"
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

                        {/* Empty State */}
                        {filteredClientes.length === 0 && (
                            <div className="px-6 py-14 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="mx-auto h-12 w-12 text-gray-300">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                <h3 className="mt-4 text-sm font-semibold text-gray-900">Nenhum cliente encontrado</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {search ? 'Tente buscar por outro termo.' : 'Comece adicionando seu primeiro cliente.'}
                                </p>
                                {!search && (
                                    <div className="mt-6">
                                        <Link
                                            href={route('clientes.create')}
                                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                            </svg>
                                            Novo Cliente
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
