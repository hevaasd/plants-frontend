import { useEffect, useState } from "react";
import API from "../services/api";
import PlantList from "../components/PlantList";
import PlantForm from "../components/PlantForm";

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch all plants
  const fetchPlants = async () => {
    try {
      const res = await API.get("/plants");
      setPlants(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  // Delete plant (admin only)
  const deletePlant = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plant?")) return;

    try {
      await API.delete(`/plants/${id}`);
      fetchPlants();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard</h1>
        <div>
          <span style={{ marginRight: "15px" }}>Hello, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Add plant form for admin */}
      {user.role === "admin" && (
        <div style={{ margin: "20px 0" }}>
          <PlantForm refresh={fetchPlants} />
        </div>
      )}

      {/* List of plants */}
      <PlantList plants={plants} isAdmin={user.role === "admin"} deletePlant={deletePlant} />
    </div>
  );
}