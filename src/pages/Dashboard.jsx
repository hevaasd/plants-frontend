import { useEffect, useState } from "react";
import API from "../services/api";
import PlantList from "../components/PlantList";
import PlantForm from "../components/PlantForm";

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
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

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {user?.name}</p>

      {user.role === "admin" && <PlantForm refresh={fetchPlants} />}

      <PlantList
        plants={plants}
        isAdmin={user.role === "admin"}
        deletePlant={deletePlant}
      />
    </div>
  );
}