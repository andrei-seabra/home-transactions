import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="navbar-header">
            <nav className="navbar">
                <h1 className="logo">Home Transactions</h1>
                <ul className="navbar-list">
                    <Link to="/">
                        <li className="navbar-item">Início</li>
                    </Link>
                    <Link to="/people">
                        <li className="navbar-item">Pessoas</li>
                    </Link>
                    <Link to="/transactions">
                        <li className="navbar-item">Transações</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}