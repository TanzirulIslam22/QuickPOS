// One place for backend URL + helper functions.
// Beginner tip: all fetch() calls go through here.

export const API = "http://localhost:5000/api";

export async function getJSON(url) {
  const r = await fetch(url);
  return r.json();
}

export async function postJSON(url, data) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}
