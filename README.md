# Home Transactions

Aplicação web para controle de transações financeiras domésticas. Permite cadastrar pessoas, registrar receitas e despesas de cada uma, e visualizar um relatório com os totais individuais e o total geral da casa.

O projeto é dividido em dois módulos independentes que se comunicam via API REST:

- **backend/** — API REST em .NET 8 (C#) com Entity Framework Core e banco SQLite.
- **frontend/** — Interface em React 19 com TypeScript, construída com Vite.

---

## Funcionalidades

- Cadastro, listagem e exclusão de **pessoas** (nome e data de nascimento).
- Cadastro e listagem de **transações** (descrição, valor, tipo e pessoa responsável).
- Cada transação é do tipo **Receita** (`Income`) ou **Despesa** (`Expense`).
- **Regra de negócio:** pessoas menores de 18 anos só podem registrar despesas. A API rejeita o cadastro de uma receita para um menor de idade.
- **Relatório de totais:** lista cada pessoa com seu total de receitas, total de despesas e saldo (receitas − despesas), além do total geral consolidado da casa.

---

## Tecnologias

### Backend
- .NET 8 (ASP.NET Core Web API)
- Entity Framework Core 8 (ORM)
- SQLite (banco de dados em arquivo)
- Swagger / OpenAPI (documentação interativa da API)

### Frontend
- React 19
- TypeScript
- Vite (servidor de desenvolvimento e build)
- React Router (navegação entre páginas)

---

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [.NET SDK 8.0](https://dotnet.microsoft.com/download/dotnet/8.0) — para o backend.
- [Node.js](https://nodejs.org/) (versão 18 ou superior) — para o frontend.
- A ferramenta de migrations do EF Core (instalada uma única vez, globalmente):

  ```bash
  dotnet tool install --global dotnet-ef
  ```

---

## Estrutura do projeto

```
home-transactions/
├── backend/
│   ├── Controllers/        # Endpoints da API (People, Transactions, Reports)
│   ├── Data/               # AppDbContext (ponte com o banco)
│   ├── DTOs/               # Objetos de entrada/saída da API
│   ├── Enums/              # TransactionType (Expense/Income)
│   ├── Migrations/         # Histórico de mudanças do banco
│   ├── Models/             # Entidades (Person, Transaction)
│   ├── Program.cs          # Configuração e inicialização da API
│   ├── appsettings.json    # Configurações (banco, CORS)
│   └── home-transactions.csproj
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/         # Ícones SVG
    │   ├── components/     # Componentes reutilizáveis (tabela, modal, navbar...)
    │   ├── pages/          # Telas (Home, Pessoas, Transações e formulários)
    │   ├── services/       # Funções de consulta à API
    │   ├── types/          # Interfaces TypeScript dos dados
    │   ├── styles/         # CSS
    │   ├── App.tsx         # Definição das rotas
    │   └── main.tsx        # Ponto de entrada
    ├── .env                # Variável de ambiente (URL da API)
    └── package.json
```

---

## Como iniciar o projeto

O backend e o frontend rodam **separadamente**, cada um em seu próprio terminal. Suba o **backend primeiro**, pois o frontend depende dele para buscar os dados.

### 1. Backend

No primeiro terminal:

```bash
cd backend

# Restaura os pacotes (só na primeira vez ou após mudar dependências)
dotnet restore

# Cria/atualiza o banco de dados SQLite aplicando as migrations
dotnet ef database update

# Sobe a API
dotnet run
```

A API sobe em:

- **HTTP:** `http://localhost:5225`
- **HTTPS:** `https://localhost:7272`
- **Swagger (documentação):** `http://localhost:5225/swagger`

> O banco `hometransactions.db` é criado automaticamente na pasta `backend/` ao rodar o `dotnet ef database update`. Ele não é versionado no Git — cada ambiente gera o seu.

### 2. Frontend

No segundo terminal:

```bash
cd frontend

# Instala as dependências (só na primeira vez)
npm install

# Sobe o servidor de desenvolvimento
npm run dev
```

O frontend sobe em `http://localhost:5173`. Abra esse endereço no navegador para usar a aplicação.

---

## Variáveis de ambiente e portas

### Frontend (`frontend/.env`)

O frontend lê a URL do backend de um arquivo `.env` na raiz da pasta `frontend/`. O conteúdo atual é:

```
VITE_API_URL=http://localhost:5225
```

Regras importantes do Vite:

- A variável **deve** começar com o prefixo `VITE_` para ficar visível ao código do navegador.
- No código, ela é lida com `import.meta.env.VITE_API_URL`.
- Após criar ou alterar o `.env`, **reinicie o servidor** do Vite (`Ctrl+C` e `npm run dev`), pois as variáveis são lidas na inicialização.

**Se você mudar a porta do backend**, altere o valor de `VITE_API_URL` para a nova porta.

### Backend (portas e CORS)

O .NET **não usa arquivo `.env`** — a configuração fica no `appsettings.json` (equivalente do `.env` no ecossistema .NET).

**Portas da API:** definidas em `backend/Properties/launchSettings.json`, no perfil usado pelo `dotnet run`:

```json
"applicationUrl": "https://localhost:7272;http://localhost:5225"
```

Para trocar a porta do backend, altere esse valor. Lembre-se de atualizar **dois lugares** para manter tudo alinhado:

1. A porta em `launchSettings.json` (onde a API escuta).
2. A `VITE_API_URL` no `frontend/.env` (para onde o frontend aponta).
3. A origem do CORS no `appsettings.json` (veja abaixo), caso mude a porta do **frontend**.

**CORS:** o backend só aceita requisições vindas da origem configurada em `backend/appsettings.json`:

```json
"Cors": {
  "AllowedOrigin": "http://localhost:5173"
}
```

Esse valor precisa bater com a URL onde o **frontend** roda (por padrão, a porta `5173` do Vite). Se o frontend rodar em outra porta, atualize essa configuração — caso contrário, o navegador bloqueará as requisições com erro de CORS.

**Banco de dados:** a connection string também fica no `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=hometransactions.db"
}
```

O `Data Source` é apenas o nome do arquivo SQLite gerado na pasta `backend/`.

---

## Endpoints da API

Todos os endpoints usam o prefixo `/api/v1`. A base é `http://localhost:5225`.

### Pessoas

| Método | Rota                  | Descrição                       |
|--------|-----------------------|---------------------------------|
| GET    | `/api/v1/people`      | Lista todas as pessoas          |
| GET    | `/api/v1/people/{id}` | Busca uma pessoa pelo id        |
| POST   | `/api/v1/people`      | Cria uma nova pessoa            |
| DELETE | `/api/v1/people/{id}` | Exclui uma pessoa               |

Corpo do POST (criar pessoa):

```json
{
  "name": "Maria",
  "birthDate": "1990-05-14"
}
```

### Transações

| Método | Rota                        | Descrição                     |
|--------|-----------------------------|-------------------------------|
| GET    | `/api/v1/transactions`      | Lista todas as transações     |
| GET    | `/api/v1/transactions/{id}` | Busca uma transação pelo id   |
| POST   | `/api/v1/transactions`      | Cria uma nova transação       |

Corpo do POST (criar transação):

```json
{
  "description": "Salário",
  "amount": 3000.00,
  "type": "Income",
  "personId": 1
}
```

O campo `type` aceita os valores `"Income"` (receita) ou `"Expense"` (despesa).

> Se `personId` for de uma pessoa menor de 18 anos e `type` for `"Income"`, a API responde `400 Bad Request` com a mensagem *"Menores de 18 anos só podem registrar despesas."*

### Relatório

| Método | Rota                      | Descrição                                          |
|--------|---------------------------|----------------------------------------------------|
| GET    | `/api/v1/Reports/totals`  | Totais por pessoa (receita, despesa, saldo) + total geral |

Exemplo de resposta:

```json
{
  "people": [
    {
      "personId": 1,
      "personName": "Maria",
      "totalIncome": 3000.00,
      "totalExpense": 1200.00,
      "balance": 1800.00
    }
  ],
  "grandTotalIncome": 3000.00,
  "grandTotalExpense": 1200.00,
  "netBalance": 1800.00
}
```

---

## Rotas do frontend

| Caminho              | Tela                              |
|----------------------|-----------------------------------|
| `/`                  | Página inicial (relatório de totais) |
| `/people`            | Lista de pessoas                  |
| `/people/new`        | Formulário de nova pessoa         |
| `/transactions`      | Lista de transações               |
| `/transactions/new`  | Formulário de nova transação      |

---

## Fluxo de uso recomendado

Como uma transação precisa estar vinculada a uma pessoa, siga esta ordem ao testar:

1. Acesse `/people/new` e cadastre ao menos uma pessoa.
2. Acesse `/transactions/new` e registre transações para essa pessoa.
3. Volte à página inicial (`/`) para ver o relatório de totais consolidado.

---

## Modelo de dados

**Person** (pessoa)
- `Id` — identificador
- `Name` — nome (máx. 50 caracteres)
- `BirthDate` — data de nascimento
- Uma pessoa possui várias transações.

**Transaction** (transação)
- `Id` — identificador
- `Description` — descrição (máx. 50 caracteres)
- `Amount` — valor
- `Type` — `Expense` (despesa) ou `Income` (receita)
- `PersonId` — pessoa à qual a transação pertence (chave estrangeira, obrigatória)

---

## Comandos úteis (backend)

```bash
# Criar uma nova migration após alterar as entidades
dotnet ef migrations add NomeDaMigration

# Aplicar as migrations pendentes ao banco
dotnet ef database update

# Listar as migrations e ver quais já foram aplicadas
dotnet ef migrations list
```

## Comandos úteis (frontend)

```bash
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção
npm run preview   # pré-visualiza o build de produção
npm run lint      # análise de código (oxlint)
```