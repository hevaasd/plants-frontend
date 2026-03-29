import { useState, useEffect } from "react";
import API from "../services/api";

export default function PlantForm({ refresh }) {
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/categories").then(res => setCategories(res.data));
    API.get("/locations").then(res => setLocations(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category_id", form.category_id);
      data.append("location_id", form.location_id);
      data.append("image", form.image);

      await API.post("/plants", data);
      setForm({});
      refresh();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding plant");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded mb-4" style={{ backgroundColor: "#fdf6e3" }}>
      <h4 className="mb-3" style={{ color: "#2f4f4f" }}>Add Plant</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-2">
        <input type="text" placeholder="Name" className="form-control" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>

      <div className="mb-2">
        <input type="text" placeholder="Description" className="form-control" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>

      <div className="mb-2">
        <input type="number" placeholder="Price" className="form-control" onChange={(e) => setForm({ ...form, price: e.target.value })} />
      </div>

      <div className="mb-2">
        <select className="form-select" onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
          <option>Select Category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="mb-2">
        <select className="form-select" onChange={(e) => setForm({ ...form, location_id: e.target.value })}>
          <option>Select Location</option>
          {locations.map(l => <option key={l.id} value={l.id}>{l.city}</option>)}
        </select>
      </div>

      <div className="mb-2">
        <input type="file" className="form-control" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />
      </div>

      <button type="submit" className="btn btn-success w-100 mt-2">Add</button>
    </form>
  );
}