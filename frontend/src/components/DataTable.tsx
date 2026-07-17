interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getKey: (item: T) => string | number;
}

export default function DataTable<T>({ columns, data, getKey }: DataTableProps<T>) {
  if (data.length === 0) {
    return <p className="empty-message data-table-message">Não há pessoas/transações cadastradas.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.header}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={getKey(item)}>
            {columns.map((col) => (
              <td key={col.header}>{col.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}