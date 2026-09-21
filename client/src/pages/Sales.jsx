import { useEffect, useState } from "react";
import { API, getJSON } from "../api.js";

export default function Sales() {
  const [sales, setSales] = useState([]);
  useEffect(() => { getJSON(`${API}/sales`).then(setSales).catch(() => {}); }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white m-4 p-4 rounded shadow">
      <h2 className="font-bold text-lg">Sales History</h2>
      {sales.map((s) => (
        <div key={s._id} className="border-b py-2 text-sm">
          <div className="font-bold">{new Date(s.date).toLocaleString()} - Total: {s.total} Tk</div>
          {s.items.map((it, i) => <div key={i}>- {it.name} x {it.qty} = {it.price * it.qty} Tk</div>)}
          <div className="mt-1 text-xs bg-gray-50 p-2 rounded flex justify-between">
            <span>Paid: <b>{s.paidAmount ?? s.total} Tk</b></span>
            <span>Change: <b className="text-green-600">{s.change ?? 0} Tk</b></span>
          </div>
        </div>
      ))}
      {sales.length === 0 && <p className="text-gray-500">No sales yet.</p>}
    </div>
  );
}
