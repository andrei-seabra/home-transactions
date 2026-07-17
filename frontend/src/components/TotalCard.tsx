interface TotalCardProps {
    personName: string,
    totalIncome: number,
    totalExpenses: number,
    balance: number
}

export default function TotalCard({personName, totalIncome, totalExpenses, balance}: TotalCardProps) {
    return (
        <article className="total-card">
            <h2 className="person-card-name">{personName}</h2>
            <p className="transaction-card-label"><span className="transaction-card-type">Receitas: </span>R$ {totalIncome}</p>
            <p className="transaction-card-label"><span className="transaction-card-type">Despesas: </span>R$ {totalExpenses}</p>
            <p className="transaction-card-label"><span className="transaction-card-type">Saldo: </span>R$ {balance}</p>
        </article>
    )
}