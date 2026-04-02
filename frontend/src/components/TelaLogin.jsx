// src/components/TelaLogin.jsx
import { useState } from "react";

function TelaLogin({ onLogin }) {
  const [form, setForm] = useState({ login: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    const resposta = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const dados = await resposta.json();

    if (dados.sucesso) {
      localStorage.setItem("dashboard-token", dados.token);
      onLogin();
    } else {
      setErro(dados.mensagem);
    }

    setCarregando(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">📊</span>
          <h1 className="text-2xl font-black text-gray-900">
            Dashboard de Clientes
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Entre com suas credenciais para acessar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-gray-700 font-medium text-sm mb-1 block">
              Login
            </label>
            <input
              type="text"
              value={form.login}
              onChange={(e) => setForm({ ...form, login: e.target.value })}
              required
              placeholder="admin"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium text-sm mb-1 block">
              Senha
            </label>
            <input
              type="password"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              required
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          {erro && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
              ❌ {erro}
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white font-bold py-3 rounded-xl transition-colors mt-2"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-xs mb-1">
            Credenciais de demonstração:
          </p>
          <p className="text-gray-600 text-sm font-mono">
            login: <strong>admin</strong>
          </p>
          <p className="text-gray-600 text-sm font-mono">
            senha: <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TelaLogin;
