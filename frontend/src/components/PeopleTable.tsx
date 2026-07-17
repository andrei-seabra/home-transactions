import DataTable from "./DataTable.tsx";

import DeleteIcon from "../assets/delete.svg";

interface Person {
  id: number;
  name: string;
  birthDate: string;
}

interface PeopleTableProps {
  people: Person[];
  onDelete: (id: number) => void;
}

export default function PeopleTable({ people, onDelete }: PeopleTableProps) {
  return (
    <DataTable
      data={people}
      getKey={(p) => p.id}
      columns={[
        { header: "Nome", render: (p) => p.name },
        { header: "Nascimento", render: (p) => p.birthDate },
        {
          header: "Ações",
          render: (p) => (
            <button className="delete-button" onClick={() => onDelete(p.id)}>
              <img src={DeleteIcon} />
            </button>
          ),
        },
      ]}
    />
  );
}