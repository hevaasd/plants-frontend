export default function PlantList({ plants, isAdmin, deletePlant }) {
  return (
    <div>
      {plants.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <img
            src={`http://127.0.0.1:8000/storage/${p.image}`}
            width="120"
          />
          <p>{p.description}</p>
          <p>{p.price} DH</p>
          <p>{p.category?.name}</p>
          <p>{p.location?.city}</p>

          {isAdmin && (
            <button onClick={() => deletePlant(p.id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}