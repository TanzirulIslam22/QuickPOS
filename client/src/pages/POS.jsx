import { useEffect, useState } from "react";
import { API, getJSON, postJSON } from "../api.js";

// POS: Add to cart -> Enter cash -> Checkout with change calculation
export default function POS() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [msg, setMsg] = useState("");
  const [paidAmount, setPaidAmount] = useState("");

  const load = () => getJSON(`${API}/products`).then(setProducts).catch(() => setMsg("Backend not running"));
  useEffect(() => { load(); }, []);

  function add(p) {
    const f = cart.find((c) => c.productId === p._id);
    if (f) setCart(cart.map((c) => c.productId === p._id ? { ...c, qty: c.qty + 1 } : c));
    else setCart([...cart, { productId: p._id, name: p.name, price: p.price, qty: 1 }]);
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const paid = Number(paidAmount) || 0;
  const change = paid - total;
  const isPaidEnough = paid >= total && total > 0;

  async function checkout() {
    if (!cart.length) return alert("Cart is empty");
    if (!paidAmount || isNaN(paid) || paid < total) {
      return alert(`Insufficient payment! Total ${total} Tk, paid ${paid} Tk`);
    }
    const res = await postJSON(`${API}/sales`, { items: cart, paidAmount: paid });
    if (res.error) return alert(res.error);
    alert(`Payment successful! Total: ${res.total} Tk, Paid: ${res.paidAmount} Tk, Change: ${res.change} Tk`);
    setCart([]);
    setPaidAmount("");
    load();
  }

  return (
    <div className="max-w-2xl mx-auto bg-white m-4 p-4 rounded shadow">
      <h2 className="font-bold text-lg">Billing</h2>
      {msg && <p className="text-red-500">{msg}</p>}
      {products.map((p) => (
        <div key={p._id} className="flex justify-between border-b py-2">
          <span>{p.name} - {p.price} Tk (stock {p.stock})</span>
          <button className="bg-gray-900 text-white px-3 rounded" onClick={() => add(p)}>Add</button>
        </div>
      ))}
      <h3 className="font-bold mt-3">Cart - {total} Tk</h3>
      {cart.map((c) => <div key={c.productId} className="text-sm">{c.name} x {c.qty} = {c.price * c.qty} Tk</div>)}
      {cart.length === 0 && <p className="text-sm text-gray-400">Cart is empty</p>}

      {/* Cash Payment Section */}
      {cart.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded border">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold">Total Bill:</span>
            <span className="font-bold">{total} Tk</span>
          </div>

          <label className="block text-sm font-medium mb-1">Amount Paid by Customer (Tk)</label>
          <input
            type="number"
            placeholder="Enter amount received"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <div className={`flex justify-between text-sm font-bold p-2 rounded ${paidAmount === "" ? "bg-gray-200" : isPaidEnough ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
            <span>Change to Return:</span>
            <span>
              {paidAmount === "" ? "0 Tk" : `${change} Tk`}
              {paidAmount !== "" && !isPaidEnough && " (insufficient)"}
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <button
          className={`px-4 py-2 rounded text-white ${isPaidEnough ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`}
          onClick={checkout}
          disabled={!isPaidEnough}
        >
          Checkout
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setCart([]); setPaidAmount(""); }}>Clear</button>
      </div>
    </div>
  );
}
