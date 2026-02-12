import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import SwipeCard from "../components/SwipeCard";
import { calcularCompatibilidad } from "../utils/compatibility";

export default function Home() {

  const { perfiles, usuario, darLike } = useContext(AppContext);

  return (
    <div className="container mt-4">

      <h2 className="text-center mb-4">Descubrir</h2>

      <div className="row justify-content-center">
        {perfiles.map(perfil => {

          const compatibilidad = calcularCompatibilidad(usuario, perfil);

          return (
            <div key={perfil.id} className="col-md-4 mb-4">
              <SwipeCard
                perfil={perfil}
                compatibilidad={compatibilidad}
                onLike={() => darLike(perfil)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
