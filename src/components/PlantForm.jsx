import { useState, useEffect } from "react";
import API from "../services/api";

export default function PlantForm({ refresh }) {
  const [form, setForm] = useState({});
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
    API.get("/locations").then((res) => setLocations(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("category_id", form.category_id);
    data.append("location_id", form.location_id);
    data.append("image", form.image);

    await API.post("/plants", data);

    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Plant</h3>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />

      <select onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
        <option>Select Category</option>
        {categories.map((c) => (
          <option value={c.id}>{c.name}</option>
        ))}
      </select>

      <select onChange={(e) => setForm({ ...form, location_id: e.target.value })}>
        <option>Select Location</option>
        {locations.map((l) => (
          <option value={l.id}>{l.city}</option>
        ))}
      </select>

      <input type="file" onChange={(e) => setForm({ ...form, image: e.target.files[0] })} />

      <button>Add</button>
    </form>
  );
}