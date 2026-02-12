import { createContext, useState, useEffect } from "react";
import { calcularCompatibilidad } from "../utils/compatibility";
import { generarConsejos } from "../utils/aiAdvisor";

export const AppContext = createContext();

export function AppProvider({ children }) {

  const [usuario, setUsuario] = useState({
    nombre: "Marcos",
    edad: 25,
    personalidad: "aventurero",
    hobbies: ["música", "viajar"],
    monedas: 200,
    premium: false,
    boostActivo: false,
    likesDados: [],
    likesRecibidos: [],
    matches: [],
    modoOscuro: false,
    ubicacion: null
  });

  const [perfiles, setPerfiles] = useState([
    {
      id: 1,
      nombre: "Sofía",
      edad: 23,
      personalidad: "romántica",
      hobbies: ["cine", "música"],
      distancia: 3,
      fotos: [
        "https://randomuser.me/api/portraits/women/1.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg"
      ],
      online: true
    },
    {
      id: 2,
      nombre: "Valentina",
      edad: 27,
      personalidad: "aventurero",
      hobbies: ["viajar", "gym"],
      distancia: 8,
      fotos: [
        "https://randomuser.me/api/portraits/women/3.jpg"
      ],
      online: false
    }
  ]);

  const [notificaciones, setNotificaciones] = useState([]);
  const [ranking, setRanking] = useState([]);

  // 📍 Geolocalización real
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(pos => {
      setUsuario(prev => ({
        ...prev,
        ubicacion: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
      }));
    });
  }, []);

  // ❤️ Dar like
  const darLike = (perfil) => {
    setUsuario(prev => ({
      ...prev,
      likesDados: [...prev.likesDados, perfil]
    }));

    // algoritmo que aprende
    aprenderDeLike(perfil);

    if (Math.random() > 0.5) {
      setUsuario(prev => ({
        ...prev,
        matches: [...prev.matches, perfil]
      }));

      agregarNotificacion(`🎉 Match con ${perfil.nombre}`);
    }
  };

  const aprenderDeLike = (perfil) => {
    setPerfiles(prev =>
      prev.map(p =>
        p.personalidad === perfil.personalidad
          ? { ...p, prioridad: (p.prioridad || 0) + 1 }
          : p
      )
    );
  };

  const activarBoost = () => {
    if (usuario.monedas >= 50) {
      setUsuario(prev => ({
        ...prev,
        monedas: prev.monedas - 50,
        boostActivo: true
      }));

      agregarNotificacion("🚀 Boost activado por 30 minutos");

      setTimeout(() => {
        setUsuario(prev => ({ ...prev, boostActivo: false }));
      }, 1800000);
    }
  };

  const comprarPremium = () => {
    if (usuario.monedas >= 200) {
      setUsuario(prev => ({
        ...prev,
        premium: true,
        monedas: prev.monedas - 200
      }));
    }
  };

  const agregarNotificacion = (mensaje) => {
    setNotificaciones(prev => [...prev, mensaje]);
    setTimeout(() => {
      setNotificaciones(prev => prev.slice(1));
    }, 4000);
  };

  const toggleModo = () => {
    setUsuario(prev => ({
      ...prev,
      modoOscuro: !prev.modoOscuro
    }));
  };

  return (
    <AppContext.Provider value={{
      usuario,
      perfiles,
      darLike,
      comprarPremium,
      activarBoost,
      notificaciones,
      toggleModo,
      ranking,
      generarConsejos
    }}>
      {children}
    </AppContext.Provider>
  );
}
