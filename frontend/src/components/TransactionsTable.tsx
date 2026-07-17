import DataTable from "./DataTable.tsx";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  personName: string;
}

export default function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <DataTable
      data={transactions}
      getKey={(t) => t.id}
      columns={[
        { header: "Descrição", render: (t) => t.description },
        { header: "Pessoa", render: (t) => t.personName },
        { header: "Tipo", render: (t) => t.type === "Income" ? "Receita" : "Despesa" },
        { header: "Valor", render: (t) => `R$ ${t.amount.toFixed(2)}` },
      ]}
    />
  );
}