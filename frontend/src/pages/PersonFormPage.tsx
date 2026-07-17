import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

import AddIcon from "../assets/add.svg";
import CancelIcon from "../assets/cancel.svg";
import ErrorIcon from "../assets/error.svg";

import { createPerson } from "../services/personService.ts";

export default function PersonFormPage() {
    const navigate = useNavigate();

    // Um estado para cada campo do formulário
    const [name, setName] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);

    async function handleSubmit() {
        // Validação simples antes de enviar
        if (name.trim() === "" || birthDate === "") {
            setError("Preencha todos os campos.");
            return;
        }

        setSaving(true);
        setError(null);

        try {
            await createPerson({ name, birthDate });
            navigate("/people"); // volta para a lista após criar
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao salvar.");
            setSaving(false);
        }
    }

    return (
        <>
        <Navbar />
        <main className="container">
            <h1 className="title">Adicionar pessoa</h1>
            <div className="person-form">
                <article className="input-field">
                    <p className="input-label">Nome</p>
                    <input
                        type="text"
                        className="input-area"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </article>
                <article className="input-field">
                    <p className="input-label">Data de nascimento</p>
                    <input
                        type="date"
                        className="input-area"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </article>

                {error && <p className="form-error"><img src={ErrorIcon} /> {error}</p>}

                <div className="forms-buttons">
                    <button
                        type="button"
                        className="action-button"
                        onClick={() => navigate("/people")}
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