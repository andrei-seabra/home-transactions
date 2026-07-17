import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.tsx";
import TransactionsTable from "../components/TransactionsTable.tsx";
import ActionButton from "../components/ActionButton.tsx";

import { getTransactions } from "../services/transactionService.ts";
import type { Transaction } from "../types/transaction.ts";

import AddIcon from "../assets/add.svg";
import LoadingSpinner from "../assets/loading.svg";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTransactions() {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        }

        loadTransactions();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <img className="loading-spinner" src={LoadingSpinner} />
                <h1 className="loading-title">Carregando...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="loading">
                <h1 className="loading-title">Erro: {error}</h1>
            </div>
        );
    }

    return (
        <>
        <Navbar />
        <main className="container">
            <h1 className="title">Transações</h1>
            <ActionButton icon={AddIcon} text={"Adicionar transação"} to="/transactions/new" />
            <TransactionsTable transactions={transactions} />
        </main>
        </>
    );
}