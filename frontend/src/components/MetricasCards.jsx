// src/components/MetricasCards.jsx
function MetricasCards({ metricas }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm mb-1">Total de Clientes</p>
        <p className="text-4xl font-black text-gray-900">
          {metricas.totalClientes}
        </p>
        <p className="text-blue-500 text-sm mt-2">👥 cadastrados</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm mb-1">Clientes Ativos</p>
        <p className="text-4xl font-black text-green-600">
          {metricas.clientesAtivos}
        </p>
        <p className="text-green-500 text-sm mt-2">✅ com contrato ativo</p>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className="text-gray-500 text-sm mb-1">Receita Total</p>
        <p className="text-4xl font-black text-blue-600">
          {metricas.receitaTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <p className="text-blue-500 text-sm mt-2">💰 em contratos</p>
      </div>
    </div>
  );
}

export default MetricasCards;
