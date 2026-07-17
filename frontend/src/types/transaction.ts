export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "Income" | "Expense";
  personId: number;
  personName: string;
}