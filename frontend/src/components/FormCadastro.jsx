// src/components/FormCadastro.jsx
import { useState } from "react";

function FormCadastro({ onCadastrar }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    valor_contrato: "",
    status: "ativo",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await onCadastrar(form);
    setForm({
      nome: "",
      email: "",
      telefone: "",
      cidade: "",
      valor_contrato: "",
      status: "ativo",
    });
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-gray-900 font-bold text-lg mb-6">
        Cadastrar Novo Cliente
      </h3>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
          placeholder="Nome completo"
          className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
          type="email"
          className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <input
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <input
          name="cidade"
          value={form.cidade}
          onChange={handleChange}
          placeholder="Cidade"
          className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <input
          name="valor_contrato"
          value={form.valor_contrato}
          onChange={handleChange}
          placeholder="Valor do contrato"
          type="number"
          className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition-colors"
        >
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
}

export default FormCadastro;
