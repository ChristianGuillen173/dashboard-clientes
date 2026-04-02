// src/App.jsx
import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import MetricasCards from "./components/MetricasCards";
import GraficoCidades from "./components/GraficoCidades";
import TabelaClientes from "./components/TabelaClientes";
import FormCadastro from "./components/FormCadastro";
import TelaLogin from "./components/TelaLogin";

function App() {
  const [autenticado, setAutenticado] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [metricas, setMetricas] = useState({
    totalClientes: 0,
    clientesAtivos: 0,
    receitaTotal: 0,
    porCidade: [],
  });
  const [busca, setBusca] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("dashboard-token");
    if (token === "dashboard-token-2024") setAutenticado(true);
  }, []);

  async function carregarDados() {
    let query = supabase
      .from("clientes")
      .select("*")
      .order("criado_em", { ascending: false });
    if (busca)
      query = query.or(
        `nome.ilike.%${busca}%,email.ilike.%${busca}%,cidade.ilike.%${busca}%`,
      );

    const { data } = await query;
    const todos = data || [];
    setClientes(todos);

    const ativos = todos.filter((c) => c.status === "ativo");
    const receita = todos.reduce((acc, c) => acc + (c.valor_contrato || 0), 0);

    const porCidadeMap = {};
    todos.forEach((c) => {
      if (c.cidade) porCidadeMap[c.cidade] = (porCidadeMap[c.cidade] || 0) + 1;
    });
    const porCidade = Object.entries(porCidadeMap).map(
      ([cidade, quantidade]) => ({ cidade, quantidade }),
    );

    setMetricas({
      totalClientes: todos.length,
      clientesAtivos: ativos.length,
      receitaTotal: receita,
      porCidade,
    });
  }

  useEffect(() => {
    if (autenticado) carregarDados();
  }, [busca, autenticado]);

  async function cadastrar(form) {
    await supabase.from("clientes").insert([
      {
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cidade: form.cidade,
        valor_contrato: Number(form.valor_contrato),
        status: form.status,
      },
    ]);
    carregarDados();
  }

  async function deletar(id) {
    await supabase.from("clientes").delete().eq("id", id);
    carregarDados();
  }

  function sair() {
    localStorage.removeItem("dashboard-token");
    setAutenticado(false);
  }

  if (!autenticado) return <TelaLogin onLogin={() => setAutenticado(true)} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black text-gray-900">
          📊 Dashboard de Clientes
        </h1>
        <button
          onClick={sair}
          className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors"
        >
          Sair →
        </button>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <MetricasCards metricas={metricas} />
        <GraficoCidades dados={metricas.porCidade} />
        <FormCadastro onCadastrar={cadastrar} />
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Buscar por nome, email ou cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
          />
        </div>
        <TabelaClientes clientes={clientes} onDeletar={deletar} />
      </main>
    </div>
  );
}

export default App;
