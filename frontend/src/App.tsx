import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import PeoplePage from "./pages/PeoplePage.tsx";
import PersonFormPage from "./pages/PersonFormPage.tsx";
import TransactionsPage from "./pages/TransactionsPage.tsx";
import TransactionFormPage from "./pages/TransactionFormPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/new" element={<PersonFormPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/transactions/new" element={<TransactionFormPage />} />
      </Routes>
    </>
  )
}

export default App
