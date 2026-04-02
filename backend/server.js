// backend/server.js
const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");

const app = express();
const db = new Database("clientes.db");

app.use(cors());
app.use(express.json());

// Cria a tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    cidade TEXT,
    valor_contrato REAL,
    status TEXT DEFAULT 'ativo',
    criado_em TEXT DEFAULT (datetime('now'))
  )
`);

// Insere dados de exemplo se a tabela estiver vazia
const total = db.prepare("SELECT COUNT(*) as count FROM clientes").get();
if (total.count === 0) {
  const inserir = db.prepare(`
    INSERT INTO clientes (nome, email, telefone, cidade, valor_contrato, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const clientes = [
    [
      "Ana Paula Silva",
      "ana@email.com",
      "(19) 99111-1111",
      "Campinas",
      1500,
      "ativo",
    ],
    [
      "Carlos Mendes",
      "carlos@email.com",
      "(19) 99222-2222",
      "São Paulo",
      2300,
      "ativo",
    ],
    [
      "Juliana Costa",
      "juliana@email.com",
      "(19) 99333-3333",
      "Campinas",
      800,
      "inativo",
    ],
    [
      "Roberto Lima",
      "roberto@email.com",
      "(11) 99444-4444",
      "Santos",
      3200,
      "ativo",
    ],
    [
      "Fernanda Souza",
      "fernanda@email.com",
      "(11) 99555-5555",
      "São Paulo",
      1100,
      "ativo",
    ],
    [
      "Marcos Oliveira",
      "marcos@email.com",
      "(19) 99666-6666",
      "Campinas",
      950,
      "inativo",
    ],
  ];
  clientes.forEach((c) => inserir.run(...c));
}

// ROTAS

// Listar todos os clientes
app.get("/clientes", (req, res) => {
  const { busca } = req.query;
  let clientes;
  if (busca) {
    clientes = db
      .prepare(
        `
      SELECT * FROM clientes 
      WHERE nome LIKE ? OR email LIKE ? OR cidade LIKE ?
      ORDER BY criado_em DESC
    `,
      )
      .all(`%${busca}%`, `%${busca}%`, `%${busca}%`);
  } else {
    clientes = db
      .prepare("SELECT * FROM clientes ORDER BY criado_em DESC")
      .all();
  }
  res.json(clientes);
});

// Métricas para o dashboard
app.get("/metricas", (req, res) => {
  const total = db.prepare("SELECT COUNT(*) as total FROM clientes").get();
  const ativos = db
    .prepare("SELECT COUNT(*) as total FROM clientes WHERE status = 'ativo'")
    .get();
  const receita = db
    .prepare("SELECT SUM(valor_contrato) as total FROM clientes")
    .get();
  const porCidade = db
    .prepare(
      `
    SELECT cidade, COUNT(*) as quantidade 
    FROM clientes GROUP BY cidade ORDER BY quantidade DESC
  `,
    )
    .all();

  res.json({
    totalClientes: total.total,
    clientesAtivos: ativos.total,
    receitaTotal: receita.total || 0,
    porCidade,
  });
});

// Cadastrar novo cliente
app.post("/clientes", (req, res) => {
  const { nome, email, telefone, cidade, valor_contrato, status } = req.body;
  const resultado = db
    .prepare(
      `
    INSERT INTO clientes (nome, email, telefone, cidade, valor_contrato, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    )
    .run(nome, email, telefone, cidade, valor_contrato, status || "ativo");
  res.json({ id: resultado.lastInsertRowid, mensagem: "Cliente cadastrado!" });
});

// Deletar cliente
app.delete("/clientes/:id", (req, res) => {
  db.prepare("DELETE FROM clientes WHERE id = ?").run(req.params.id);
  res.json({ mensagem: "Cliente removido!" });
});

// Usuário fixo para demo (em produção usaria banco de dados)
const USUARIO = { login: "admin", senha: "admin123" };

// Rota de login
app.post("/login", (req, res) => {
  const { login, senha } = req.body;
  if (login === USUARIO.login && senha === USUARIO.senha) {
    res.json({ sucesso: true, token: "dashboard-token-2024" });
  } else {
    res
      .status(401)
      .json({ sucesso: false, mensagem: "Login ou senha incorretos" });
  }
});

app.listen(3001, () =>
  console.log("🚀 Backend rodando em http://localhost:3001"),
);
