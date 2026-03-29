import { Link } from "react-router-dom";

export default function Navbar({ user, handleLogout, lang, setLang }) {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#2f4f4f", color: "#f5f5dc" }}>
      <div className="container">
        {/* Welcome center */}
        <span className="navbar-brand mx-auto" style={{ color: "#f5f5dc" }}>
          Welcome {user?.name}
        </span>

        {/* Right side */}
        <div className="d-flex align-items-center">
          <button className="btn btn-sm btn-outline-light me-2" onClick={() => setLang("en")}>EN</button>
          <button className="btn btn-sm btn-outline-light me-3" onClick={() => setLang("fr")}>FR</button>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}