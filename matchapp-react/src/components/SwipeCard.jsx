import { useState } from "react";

export default function SwipeCard({ perfil, compatibilidad, onLike }) {

  const [fotoActual, setFotoActual] = useState(0);

  return (
    <div className="card bg-dark text-light shadow swipe-card">

      <img
        src={perfil.fotos[fotoActual]}
        className="card-img-top"
      />

      <div className="card-body">

        <h4>
          {perfil.nombre}, {perfil.edad}
          {perfil.online && <span className="online-dot ms-2"></span>}
        </h4>

        <p>📍 {perfil.distancia} km</p>
        <p>❤️ Compatibilidad: {compatibilidad}%</p>

        <button
          className="btn btn-success w-100"
          onClick={onLike}
        >
          Me gusta
        </button>

        <div className="mt-2 d-flex justify-content-center">
          {perfil.fotos.map((_, i) => (
            <span
              key={i}
              className="foto-dot"
              onClick={() => setFotoActual(i)}
            ></span>
          ))}
        </div>

      </div>
    </div>
  );
}
