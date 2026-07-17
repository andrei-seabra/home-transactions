import type { TotalsSummary } from "../types/totals.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTotals(): Promise<TotalsSummary> {
  const response = await fetch(`${API_URL}/api/v1/Reports/totals`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar totais: ${response.status}`);
  }

  return (await response.json()) as TotalsSummary;
}