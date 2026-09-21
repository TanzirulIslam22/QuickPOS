import { useEffect, useState } from "react";
import { API, getJSON, postJSON } from "../api.js";

// Products: list + add + delete
export default function Products() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const load = () => getJSON(`${API}/products`).then(setList);
  useEffect(() => { load(); }, []);

  async function add(e) {
    e.preventDefault();
    await postJSON(`${API}/products`, { name, price: Number(price), stock: Number(stock) });
    setName(""); setPrice(""); setStock("");
    load();
  }

  async function del(id) {
    await fetch(`${API}/products/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="max-w-2xl mx-auto bg-white m-4 p-4 rounded shadow">
      <h2 className="font-bold text-lg">Products</h2>
      <form onSubmit={add} className="flex gap-2 mt-2">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input placeholder="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <button className="bg-black text-white px-4 rounded">Add</button>
      </form>
      <table className="w-full mt-3 text-sm">
        <thead><tr className="border-b"><th className="text-left p-2">Name</th><th className="text-left">Price</th><th className="text-left">Stock</th><th></th></tr></thead>
        <tbody>
          {list.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-2">{p.name}</td><td>{p.price}</td><td>{p.stock}</td>
              <td><button className="text-red-500" onClick={() => del(p._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
