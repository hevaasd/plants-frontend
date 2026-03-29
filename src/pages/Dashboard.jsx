import { useEffect, useState } from "react";
import API from "../services/api";
import PlantForm from "../components/PlantForm";
import PlantChart from "../components/PlantChart";
import { translations } from "../lang";

export default function Dashboard() {
  const [plants, setPlants] = useState([]);
  const [lang, setLang] = useState("en");
  const user = JSON.parse(localStorage.getItem("user"));
  const t = translations[lang];

  const fetchPlants = async () => {
    const res = await API.get("/plants");
    setPlants(res.data);
  };

  useEffect(() => { fetchPlants(); }, []);

  const deletePlant = async (id) => { await API.delete(`/plants/${id}`); fetchPlants(); };
  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"; };

  return (
    <div className="container mt-4">

      {/* Language Switch */}
      <div className="mb-3">
        <button className="btn btn-secondary me-2" onClick={() => setLang("en")}>EN</button>
        <button className="btn btn-secondary" onClick={() => setLang("fr")}>FR</button>
      </div>

      {/* Welcome + Logout */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{t.welcome} {user?.name}</h2>
        <button className="btn btn-danger" onClick={handleLogout}>{t.logout}</button>
      </div>

      {/* PDF button */}
      <button
        className="btn btn-primary mb-4"
        onClick={() => window.open("http://127.0.0.1:8000/api/plants/pdf")}
      >
        Download PDF
      </button>

      {/* Graph أصغر */}
      <div className="mb-4" style={{ maxHeight: "300px" }}>
        <PlantChart plants={plants} />
      </div>

      {/* Form admin */}
      {user?.role === "admin" && (
        <div className="mb-4">
          <PlantForm refresh={fetchPlants} />
        </div>
      )}

      {/* Plants Cards */}
      <div className="row">
        {plants.map((p) => (
          <div className="col-md-4 mb-4" key={p.id}>
            <div className="card h-100 shadow">
              <img src={`http://127.0.0.1:8000/storage/${p.image}`} className="card-img-top" alt="" />
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
  );
}