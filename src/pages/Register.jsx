import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/register", { name, email, password });
      navigate("/");
    } catch (err) {
      alert("Error creating account!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#e8f5e9" }}>
      
      <form className="p-5 border rounded shadow bg-white"
        style={{ minWidth: "350px", maxWidth: "400px" }}
        onSubmit={handleRegister}
      >
        <h3 className="text-center mb-4" style={{ color: "#2E8B57" }}>🌿 PlantApp Register</h3>

        <div className="mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Name" 
            required
            onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <input 
            type="email" 
            className="form-control" 
            placeholder="Email" 
            required
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <input 
            type="password" 
            className="form-control" 
            placeholder="Password" 
            required
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="btn btn-success w-100 mb-3" type="submit">
          Register
        </button>

        <p className="text-center">
          Already have an account? <Link to="/" style={{ color: "#2E8B57", fontWeight: "bold" }}>Login</Link>
        </p>
      </form>
    </div>
  );
}