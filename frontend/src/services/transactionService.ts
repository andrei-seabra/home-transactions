import type { Transaction } from "../types/transaction.ts";

const API_URL = import.meta.env.VITE_API_URL;

export interface TransactionCreate {
  description: string;
  amount: number;
  type: "Income" | "Expense";
  personId: number;
}

export async function getTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${API_URL}/api/v1/transactions`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar transações: ${response.status}`);
  }

  return (await response.json()) as Transaction[];
}

export async function createTransaction(transaction: TransactionCreate): Promise<Transaction> {
  const response = await fetch(`${API_URL}/api/v1/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    // Tenta ler a mensagem de erro do backend (ex: regra dos menores de 18)
    const text = await response.text();
    throw new Error(text || `Erro ao criar transação: ${response.status}`);
  }

  return (await response.json()) as Transaction;
}