import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        email: '',
        telefone_primario: '',
        telefone_secundario: '',
        cpf_cnpj: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        observacoes: '',
        status: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('clientes.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link
                        href={route('clientes.index')}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Novo Cliente
                    </h2>
                </div>
            }
        >
            <Head title="Novo Cliente" />

            <div className="py-8">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Card Principal */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Informações Básicas</h3>
                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <InputLabel htmlFor="nome" value="Nome *" />
                                    <TextInput
                                        id="nome"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.nome}
                                        onChange={(e) => setData('nome', e.target.value)}
                                        required
                                        autoFocus
                                        placeholder="Nome completo do cliente"
                                    />
                                    <InputError message={errors.nome} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@exemplo.com"
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="cpf_cnpj" value="CPF/CNPJ" />
                                    <TextInput
                                        id="cpf_cnpj"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.cpf_cnpj}
                                        onChange={(e) => setData('cpf_cnpj', e.target.value)}
                                        placeholder="000.000.000-00"
                                    />
                                    <InputError message={errors.cpf_cnpj} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="telefone_primario" value="Telefone Principal" />
                                    <TextInput
                                        id="telefone_primario"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.telefone_primario}
                                        onChange={(e) => setData('telefone_primario', e.target.value)}
                                        placeholder="(00) 00000-0000"
                                    />
                                    <InputError message={errors.telefone_primario} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="telefone_secundario" value="Telefone Secundário" />
                                    <TextInput
                                        id="telefone_secundario"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.telefone_secundario}
                                        onChange={(e) => setData('telefone_secundario', e.target.value)}
                                        placeholder="(00) 00000-0000"
                                    />
                                    <InputError message={errors.telefone_secundario} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <select
                                        id="status"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.status ? 'true' : 'false'}
                                        onChange={(e) => setData('status', e.target.value === 'true')}
                                    >
                                        <option value="true">Ativo</option>
                                        <option value="false">Inativo</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Card Endereço */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Endereço</h3>
                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <InputLabel htmlFor="endereco" value="Endereço" />
                                    <TextInput
                                        id="endereco"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.endereco}
                                        onChange={(e) => setData('endereco', e.target.value)}
                                        placeholder="Rua, número, complemento"
                                    />
                                    <InputError message={errors.endereco} className="mt-2" />
                                </div>

                                <div className="sm:col-span-2">
                                    <InputLabel htmlFor="bairro" value="Bairro" />
                                    <TextInput
                                        id="bairro"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.bairro}
                                        onChange={(e) => setData('bairro', e.target.value)}
                                        placeholder="Bairro"
                                    />
                                    <InputError message={errors.bairro} className="mt-2" />
                                </div>

                                <div className="sm:col-span-3">
                                    <InputLabel htmlFor="cidade" value="Cidade" />
                                    <TextInput
                                        id="cidade"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.cidade}
                                        onChange={(e) => setData('cidade', e.target.value)}
                                        placeholder="Cidade"
                                    />
                                    <InputError message={errors.cidade} className="mt-2" />
                                </div>

                                <div className="sm:col-span-1">
                                    <InputLabel htmlFor="estado" value="UF" />
                                    <TextInput
                                        id="estado"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.estado}
                                        onChange={(e) => setData('estado', e.target.value.toUpperCase())}
                                        maxLength={2}
                                        placeholder="SP"
                                    />
                                    <InputError message={errors.estado} className="mt-2" />
                                </div>

                                <div className="sm:col-span-2">
                                    <InputLabel htmlFor="cep" value="CEP" />
                                    <TextInput
                                        id="cep"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.cep}
                                        onChange={(e) => setData('cep', e.target.value)}
                                        placeholder="00000-000"
                                    />
                                    <InputError message={errors.cep} className="mt-2" />
                                </div>
                            </div>
                        </div>

                        {/* Card Observações */}
                        <div className="overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
                            <h3 className="mb-6 text-lg font-semibold text-gray-900">Observações</h3>
                            
                            <div>
                                <textarea
                                    id="observacoes"
                                    rows={4}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    value={data.observacoes}
                                    onChange={(e) => setData('observacoes', e.target.value)}
                                    placeholder="Anotações sobre o cliente..."
                                />
                                <InputError message={errors.observacoes} className="mt-2" />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4">
                            <Link
                                href={route('clientes.index')}
                                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                Cancelar
                            </Link>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Salvando...' : 'Salvar Cliente'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
