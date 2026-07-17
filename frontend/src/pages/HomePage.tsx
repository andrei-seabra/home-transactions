import { useState, useEffect } from "react";

import TotalCard from "../components/TotalCard.tsx";
import Navbar from "../components/Navbar.tsx";

import { getTotals } from "../services/reportService.ts";
import type { TotalsSummary } from "../types/totals.ts";

import LoadingSpinner from '../assets/loading.svg';

export default function HomePage() {
    const [data, setData] = useState<TotalsSummary | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    async function loadTotals() {
        try {
                const result = await getTotals();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        }

        loadTotals();
    }, []);

    if (loading) {
        return (
            <div className='loading'>
                <img className='loading-spinner' src={LoadingSpinner} />
                <h1 className='loading-title'>Carregando...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className='loading'>
                <h1 className='loading-title'>Erro: {error}</h1>
            </div>
        );
    }

    if (!data) return null;

    return (
        <>
        <Navbar />
        <main className="container">
            <h1 className="title">Pessoas</h1>
            {data.people.length === 0 && (
                <p className="empty-message">Não há pessoas cadastradas.</p>
                )   
            }

            <div className="total-card-grid">
                {data.people.map((person) => (
                    <TotalCard
                        key={person.personId}
                        personName={person.personName}
                        totalIncome={person.totalIncome}
                        totalExpenses={person.totalExpense}
                        balance={person.balance}
                    />
                ))}
            </div>
            <h1 className="title">Total</h1>
            <TotalCard
                personName={"Total"}
                totalIncome={data.grandTotalIncome}
                totalExpenses={data.grandTotalExpense}
                balance={data.netBalance}
            />
        </main>
        </>
    )
}