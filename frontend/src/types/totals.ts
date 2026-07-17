export interface PersonTotals {
  personId: number;
  personName: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface TotalsSummary {
  people: PersonTotals[];
  grandTotalIncome: number;
  grandTotalExpense: number;
  netBalance: number;
}