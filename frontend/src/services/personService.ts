import type { Person } from "../types/person.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getPeople(): Promise<Person[]> {
  const response = await fetch(`${API_URL}/api/v1/people`);

  if (!response.ok) {
    throw new Error(`Erro ao buscar pessoas: ${response.status}`);
  }

  return (await response.json()) as Person[];
}

// Dados que o formulário envia
export interface PersonCreate {
  name: string;
  birthDate: string;
}

export async function createPerson(person: PersonCreate): Promise<Person> {
  const response = await fetch(`${API_URL}/api/v1/people`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(person),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar pessoa: ${response.status}`);
  }

  return (await response.json()) as Person;
}

export async function deletePerson(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/v1/people/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao excluir pessoa: ${response.status}`);
  }
}