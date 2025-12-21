import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ clientes = [], statusLabels = {} }) {
    const { data, setData, post, processing, errors } = useForm({
        cliente_id: '',
        titulo: '',
        data_operacao: new Date().toISOString().split('T')[0],
        data_vencimento: '',
        valor: '',
        desembolso: '',
        juros: '',
        qtd_parcelas: '',
        status: 'pendente',
        observacao: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('operacoes.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('operacoes.index')}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">Nova Operação</h2>
                </div>
            }
        >
            <Head title="Nova Operação" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Informações Básicas */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Informações da Operação</h3>
                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <InputLabel htmlFor="titulo" value="Título *" />
                                    <TextInput
                                        id="titulo"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.titulo}
                                        onChange={(e) => setData('titulo', e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="Ex: Empréstimo pessoal, Financiamento..."
                                    />
                                    <InputError message={errors.titulo} className="mt-2" />
                                </div>

                                <div className="sm:col-span-2">
                                    <InputLabel htmlFor="cliente_id" value="Cliente *" />
                                    <select
                                        id="cliente_id"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.cliente_id}
                                        onChange={(e) => setData('cliente_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Selecione um cliente</option>
                                        {clientes.map((cliente) => (
                                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                                {cliente.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.cliente_id} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="data_operacao" value="Data da Operação *" />
                                    <TextInput
                                        id="data_operacao"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.data_operacao}
                                        onChange={(e) => setData('data_operacao', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.data_operacao} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="data_vencimento" value="Data de Vencimento" />
                                    <TextInput
                                        id="data_vencimento"
                                        type="date"
                                        className="mt-1 block w-full"
                                        value={data.data_vencimento}
                                        onChange={(e) => setData('data_vencimento', e.target.value)}
                                    />
                                    <InputError message={errors.data_vencimento} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <select
                                        id="status"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                    >
                                        <option value="pendente">Pendente</option>
                                        <option value="em_andamento">Em Andamento</option>
                                        <option value="concluida">Concluída</option>
                                        <option value="cancelada">Cancelada</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Valores */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Valores</h3>
                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <InputLabel htmlFor="valor" value="Valor da Operação *" />
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">R$</span>
                                        </div>
                                        <TextInput
                                            id="valor"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="block w-full pl-10"
                                            value={data.valor}
                                            onChange={(e) => setData('valor', e.target.value)}
                                            required
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <InputError message={errors.valor} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="desembolso" value="Valor Desembolso" />
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">R$</span>
                                        </div>
                                        <TextInput
                                            id="desembolso"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="block w-full pl-10"
                                            value={data.desembolso}
                                            onChange={(e) => setData('desembolso', e.target.value)}
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <InputError message={errors.desembolso} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="juros" value="Taxa de Juros (%)" />
                                    <div className="relative mt-1">
                                        <TextInput
                                            id="juros"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="block w-full pr-8"
                                            value={data.juros}
                                            onChange={(e) => setData('juros', e.target.value)}
                                            placeholder="0,00"
                                        />
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span className="text-gray-500 sm:text-sm">%</span>
                                        </div>
                                    </div>
                                    <InputError message={errors.juros} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="qtd_parcelas" value="Quantidade de Parcelas" />
                                    <TextInput
                                        id="qtd_parcelas"
                                        type="number"
                                        min="1"
                                        className="mt-1 block w-full"
                                        value={data.qtd_parcelas}
                                        onChange={(e) => setData('qtd_parcelas', e.target.value)}
                                        placeholder="1"
                                    />
                                    <InputError message={errors.qtd_parcelas} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Observações */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Observações</h3>
                            
                            <div>
                                <textarea
                                    id="observacao"
                                    rows={4}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.observacao}
                                    onChange={(e) => setData('observacao', e.target.value)}
                                    placeholder="Anotações sobre a operação..."
                                />
                                <InputError message={errors.observacao} className="mt-2" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4">
                            <Link
                                href={route('operacoes.index')}
                                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Salvando...' : 'Criar Operação'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


