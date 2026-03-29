import { useState } from "react";

export default function Navbar({ user, handleLogout, lang, setLang, dark, setDark }) {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      backgroundColor: dark ? "#2f4f4f" : "#e8f5e9",
      color: dark ? "#fff" : "#2f4f4f",
      position: "relative"
    }}>
      <h5 style={{ margin: 0 }}>🌿 PlantApp</h5>

      <button className="btn btn-sm btn-outline-dark" onClick={() => setOpen(!open)}>☰</button>

      {open && (
        <div style={{
          position: "absolute",
          right: "20px",
          top: "60px",
          background: dark ? "#3f3f3f" : "#fff",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "10px",
          width: "180px",
          zIndex: 1000
        }}>
          <p style={{ margin: 0 }}>👤 {user?.name}</p>

          <button className="btn btn-sm w-100 mt-2"
            onClick={() => setDark(!dark)}>
            {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
          </button>

          <button className="btn btn-sm w-100 mt-2" onClick={() => setLang("en")}>EN</button>
          <button className="btn btn-sm w-100 mt-2" onClick={() => setLang("fr")}>FR</button>

          <button className="btn btn-sm btn-primary w-100 mt-2"
            onClick={() => window.open("http://127.0.0.1:8000/api/plants/pdf")}>
            Download PDF
          </button>

          <button className="btn btn-sm btn-danger w-100 mt-2" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}