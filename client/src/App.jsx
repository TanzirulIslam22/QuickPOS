import { useState } from "react";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import POS from "./pages/POS.jsx";
import Sales from "./pages/Sales.jsx";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [page, setPage] = useState("pos");

  if (!user) return <Login onLogin={() => setUser("admin")} />;

  const btn = (p) =>
    `px-3 py-1 rounded ${page === p ? "bg-white text-black" : "bg-gray-700 text-white"}`;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white px-4 py-3 flex gap-2 items-center">
        <b className="mr-auto">QuickPOS</b>
        <button className={btn("pos")} onClick={() => setPage("pos")}>Billing</button>
        <button className={btn("products")} onClick={() => setPage("products")}>Products</button>
        <button className={btn("sales")} onClick={() => setPage("sales")}>Sales</button>
        <button
          className="px-3 py-1 rounded bg-red-500"
          onClick={() => { localStorage.removeItem("user"); setUser(null); }}
        >
          Logout
        </button>
      </div>
      {page === "pos" && <POS />}
      {page === "products" && <Products />}
      {page === "sales" && <Sales />}
    </div>
  );
}
