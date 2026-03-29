import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#e8f5e9" }}>
      
      <form className="p-5 border rounded shadow bg-white"
        style={{ minWidth: "350px", maxWidth: "400px" }}
        onSubmit={handleLogin}
      >
        <h3 className="text-center mb-4" style={{ color: "#2E8B57" }}>🌿 PlantApp Login</h3>

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
          Login
        </button>

        <p className="text-center">
          No account? <Link to="/register" style={{ color: "#2E8B57", fontWeight: "bold" }}>Register</Link>
        </p>
      </form>
    </div>
  );
}