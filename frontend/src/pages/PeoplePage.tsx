import { useState, useEffect } from "react";

import Navbar from "../components/Navbar.tsx";
import ActionButton from "../components/ActionButton.tsx";
import PeopleTable from "../components/PeopleTable.tsx";
import ConfirmModal from "../components/ConfirmModal.tsx";

import { getPeople, deletePerson } from "../services/personService.ts";
import type { Person } from "../types/person.ts";

import AddIcon from "../assets/add.svg";
import LoadingSpinner from '../assets/loading.svg';

export default function PeoplePage() {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Guarda o id da pessoa a excluir (null = modal fechado)
    const [personToDelete, setPersonToDelete] = useState<number | null>(null);

    useEffect(() => {
        async function loadPeople() {
            try {
                const data = await getPeople();
                setPeople(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erro desconhecido");
            } finally {
                setLoading(false);
            }
        }

        loadPeople();
    }, []);

    // Chamado pela tabela: apenas abre o modal, lembrando quem excluir
    function requestDelete(id: number) {
        setPersonToDelete(id);
    }

    // Chamado pelo modal ao confirmar: executa a exclusão
    async function confirmDelete() {
        if (personToDelete === null) return;

        try {
            await deletePerson(personToDelete);
            setPeople((current) => current.filter((p) => p.id !== personToDelete));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao excluir.");
        } finally {
            setPersonToDelete(null); // fecha o modal
        }
    }

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

    return (
        <>
        <Navbar />
        <main className="container">
            <h1 className="title">Pessoas</h1>
            <ActionButton icon={AddIcon} text={"Adicionar pessoa"} to="/people/new" />
            <PeopleTable people={people} onDelete={requestDelete} />

            <ConfirmModal
                isOpen={personToDelete !== null}
                title="Confirmar exclusão"
                message="Tem certeza que deseja excluir esta pessoa? Esta ação não pode ser desfeita."
                onConfirm={confirmDelete}
                onCancel={() => setPersonToDelete(null)}
            />
        </main>
        </>
    );
}