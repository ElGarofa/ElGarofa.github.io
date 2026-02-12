import { useState } from "react";

export default function Chat() {

  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const [typing, setTyping] = useState(false);

  const enviar = () => {
    if (!texto) return;

    setMensajes([...mensajes, { autor: "yo", texto }]);
    setTexto("");

    setTyping(true);

    setTimeout(() => {
      setMensajes(prev => [...prev, { autor: "otro", texto: "Hola 😊" }]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="container mt-4">
      <div className="chat-box">
        {mensajes.map((m, i) => (
          <div key={i} className={m.autor === "yo" ? "msg-yo" : "msg-otro"}>
            {m.texto}
          </div>
        ))}

        {typing && <div className="typing">Está escribiendo...</div>}
      </div>

      <div className="d-flex mt-3">
        <input
          className="form-control"
          value={texto}
          onChange={e => setTexto(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={enviar}>
          Enviar
        </button>
      </div>
    </div>
  );
}
