import { useEffect, useState } from "react";
import API from "../services/api";
import PlantForm from "../components/PlantForm";

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [dark, setDark] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPlants = async () => {
    const res = await API.get("/plants");
    setPlants(res.data);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const deletePlant = async (id) => {
    await API.delete(`/plants/${id}`);
    fetchPlants();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const styles = {
    container: {
      padding: "20px",
      minHeight: "100vh",
      background: dark ? "#1e1e1e" : "#f5f5f5",
      color: dark ? "#fff" : "#000",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      background: dark ? "#2c2c2c" : "#fff",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    },
    img: {
      width: "100%",
      height: "150px",
      objectFit: "cover",
      borderRadius: "10px",
    },
    button: {
      marginTop: "10px",
      padding: "6px 10px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2>Welcome {user?.name}</h2>

      {/* Dark Mode */}
      <button style={styles.button} onClick={() => setDark(!dark)}>
        {dark ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      {/* Form admin */}
      {user?.role === "admin" && (
        <PlantForm refresh={fetchPlants} />
      )}

      {/* Cards */}
      <div style={styles.grid}>
        {plants.map((p) => (
          <div key={p.id} style={styles.card}>
            <img
              src={`http://127.0.0.1:8000/storage/${p.image}`}
              style={styles.img}
              alt=""
            />

            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><b>{p.price} DH</b></p>
            <p>{p.category?.name}</p>
            <p>{p.location?.city}</p>

            {user?.role === "admin" && (
              <button
                style={styles.button}
                onClick={() => deletePlant(p.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Logout */}
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}