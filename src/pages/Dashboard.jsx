import { useEffect, useState } from "react";
import API from "../services/api";
import PlantForm from "../components/PlantForm";
import PlantChart from "../components/PlantChart";
import Navbar from "../components/Navbar";
import { translations } from "../lang";

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");

  const user = JSON.parse(localStorage.getItem("user"));
  const t = translations[lang];

  const fetchPlants = async () => {
    const res = await API.get("/plants");
    setPlants(res.data);
  };

  useEffect(() => { fetchPlants(); }, []);

  const deletePlant = async (id) => {
    await API.delete(`/plants/${id}`);
    fetchPlants();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ backgroundColor: dark ? "#1e1e1e" : "#fafaf0", minHeight: "100vh" }}>
      <Navbar
        user={user}
        handleLogout={handleLogout}
        lang={lang}
        setLang={setLang}
        dark={dark}
        setDark={setDark}
      />

      {/* Welcome message centered */}
      <div className="text-center py-3" style={{ color: "#006400", fontWeight: "bold", fontSize: "1.5rem" }}>
        Welcome {user?.name} 🌿
      </div>

      {/* Graph with colors */}
      <div className="mx-auto my-4" style={{ maxHeight: "300px", width: "90%" }}>
        <PlantChart plants={plants} dark={dark} />
      </div>

      {/* Admin Form */}
      {user?.role === "admin" && (
        <div className="container my-4">
          <PlantForm refresh={fetchPlants} />
        </div>
      )}

      {/* Plants Cards */}
      <div className="container">
        <div className="row">
          {plants.map((p) => (
            <div className="col-md-4 mb-4" key={p.id}>
              <div className="card h-100 shadow" style={{
                borderRadius: "15px",
                backgroundColor: dark ? "#2f4f4f" : "#fdf6e3"
              }}>
                <img src={`http://127.0.0.1:8000/storage/${p.image}`} 
                     className="card-img-top" 
                     alt={p.name} 
                     style={{ height: "180px", objectFit: "cover", borderRadius: "15px 15px 0 0" }} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p><strong>{t.price}: {p.price} DH</strong></p>
                  <p>{t.category}: {p.category?.name}</p>
                  <p>{t.location}: {p.location?.city}</p>
                </div>
                {user?.role === "admin" && (
                  <div className="card-footer">
                    <button className="btn btn-danger w-100" onClick={() => deletePlant(p.id)}>
                      {t.delete}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}