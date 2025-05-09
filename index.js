import { useEffect, useState } from "react";

const events = [
  { id: 1, name: "Buchiamo una gomma lungo la Route 66", cost: 30 },
  { id: 2, name: "Veniamo fermati dalla polizia", cost: 25 },
  { id: 3, name: "Uno vomita al ristorante", cost: 20 },
  { id: 4, name: "Ci perdiamo nel deserto", cost: 15 },
  { id: 5, name: "Facciamo amicizia con un gruppo di motociclisti", cost: 10 },
];

export default function Home() {
  const maxCredits = 100;
  const [nickname, setNickname] = useState("");
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const savedNick = localStorage.getItem("nickname");
    if (savedNick) {
      setNickname(savedNick);
      setEntered(true);
    }
  }, []);

  const handleEnter = () => {
    if (nickname.trim()) {
      localStorage.setItem("nickname", nickname);
      setEntered(true);
    }
  };

  const totalCost = selected.reduce((sum, id) => {
    const ev = events.find((e) => e.id === id);
    return sum + (ev?.cost || 0);
  }, 0);

  const toggleEvent = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  if (!entered) {
    return (
      <div style={{ backgroundColor: '#0f172a', color: 'white', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>FantaRoute66</h1>
        <p style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Scommetti sugli imprevisti. Vivi il viaggio. Vinci la gloria.</p>
        <input
          type="text"
          placeholder="Inserisci il tuo nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '0.25rem', width: '200px', marginBottom: '1rem', color: 'black' }}
        />
        <button onClick={handleEnter} style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '0.25rem' }}>
          Entra nel gioco
        </button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>FantaRoute66</h1>
      <p>Benvenuto, <strong>{nickname}</strong>! Hai {maxCredits} crediti. Seleziona gli eventi che pensi accadranno!</p>
      <div>
        {events.map((event) => {
          const isSelected = selected.includes(event.id);
          const disabled = !isSelected && totalCost + event.cost > maxCredits;

          return (
            <div key={event.id} style={{ opacity: disabled ? 0.4 : 1, cursor: disabled ? 'not-allowed' : 'pointer', border: `2px solid ${isSelected ? 'lime' : 'white'}`, marginBottom: '1rem', padding: '1rem' }} onClick={() => !disabled && toggleEvent(event.id)}>
              <h2>{event.name}</h2>
              <p>Costo: {event.cost} crediti</p>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <p>Crediti usati: {totalCost} / {maxCredits}</p>
        <button disabled={totalCost === 0} style={{ padding: '0.5rem 1rem', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '0.25rem', marginTop: '1rem' }}>
          Conferma selezione
        </button>
      </div>
    </div>
  );
}