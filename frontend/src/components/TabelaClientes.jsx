// src/components/TabelaClientes.jsx
function TabelaClientes({ clientes, onDeletar }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-gray-900 font-bold text-lg">Lista de Clientes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">
                Nome
              </th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">
                Email
              </th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">
                Cidade
              </th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">
                Contrato
              </th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">
                Status
              </th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {clientes.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {c.nome}
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm">{c.email}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">{c.cidade}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {c.valor_contrato.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      c.status === "ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onDeletar(c.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelaClientes;
