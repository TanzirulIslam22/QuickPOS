import { useState } from "react";

// Login: admin / 1234
export default function Login({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

  function submit(e) {
    e.preventDefault();
    if (u === "admin" && p === "1234") {
      localStorage.setItem("user", "admin");
      onLogin();
    } else alert("Use admin / 1234");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-72 space-y-3">
        <h2 className="text-xl font-bold text-center">QuickPOS Login</h2>
        <p className="text-sm text-gray-500 text-center">admin / 1234</p>
        <input placeholder="username" value={u} onChange={(e) => setU(e.target.value)} />
        <input placeholder="password" type="password" value={p} onChange={(e) => setP(e.target.value)} />
        <button className="w-full bg-black text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
