// src/components/GraficoCidades.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function GraficoCidades({ dados }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-gray-900 font-bold text-lg mb-6">
        Clientes por Cidade
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="cidade" tick={{ fill: "#6b7280", fontSize: 13 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 13 }} />
          <Tooltip />
          <Bar dataKey="quantidade" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoCidades;
