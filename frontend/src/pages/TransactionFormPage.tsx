import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.tsx";

import AddIcon from "../assets/add.svg";
import CancelIcon from "../assets/cancel.svg";
import ErrorIcon from "../assets/error.svg";

import { createTransaction } from "../services/transactionService.ts";
import { getPeople } from "../services/personService.ts";
import type { Person } from "../types/person.ts";

export default function TransactionFormPage() {
    const navigate = useNavigate();

    // Um estado para cada campo do formulário
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [type, setType] = useState<"Income" | "Expense">("Expense");
    const [personId, setPersonId] = useState<string>("");

    // Lista de pessoas para o select
    const [people, setPeople] = useState<Person[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    // Busca as pessoas ao montar, para preencher o dropdown
    useEffect(() => {
        async function loadPeople() {
            try {
                const data = await getPeople();
                setPeople(data);
            } catch {
                setError("Erro ao carregar as pessoas.");
            }
        }

        loadPeople();
    }, []);

    async function handleSubmit() {
        // Validação simples antes de enviar
        if (description.trim() === "" || amount === "" || personId === "") {
            setError("Preencha todos os campos.");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            await createTransaction({
                description,
                amount: Number(amount),
                type,
                personId: Number(personId),
            });
            navigate("/transactions"); // volta para a lista após criar
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao salvar.");
            setSaving(false);
        }
    }

    return (
        <>
        <Navbar />
        <main className="container">
            <h1 className="title">Adicionar transação</h1>
            <div className="person-form">
                <article className="input-field">
                    <p className="input-label">Descrição</p>
                    <input
                        type="text"
                        className="input-area"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </article>
                <article className="input-field">
                    <p className="input-label">Valor</p>
                    <input
                        type="number"
                        className="input-area"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </article>
                <article className="input-field">
                    <p className="input-label">Tipo</p>
                    <select
                        className="input-area"
                        value={type}
                        onChange={(e) => setType(e.target.value as "Income" | "Expense")}
                    >
                        <option value="Expense">Despesa</option>
                        <option value="Income">Receita</option>
                    </select>
                </article>
                <article className="input-field">
                    <p className="input-label">Pessoa</p>
                    <select
                        className="input-area"
                        value={personId}
                        onChange={(e) => setPersonId(e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        {people.map((person) => (
                            <option key={person.id} value={person.id}>
                                {person.name}
                            </option>
                        ))}
                    </select>
                </article>

                {error && <p className="form-error"><img src={ErrorIcon} /> {error}</p>}

                <div className="forms-buttons">
                    <button
                        type="button"
                        className="action-button"
                        onClick={() => navigate("/transactions")}
                    >
                        <img src={CancelIcon} alt="" />
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="action-button"
                        onClick={handleSubmit}
                        disabled={saving}
                    >
                        <img src={AddIcon} alt="" />
                        {saving ? "Salvando..." : "Adicionar"}
                    </button>
                </div>
            </div>
        </main>
        </>
    );
}