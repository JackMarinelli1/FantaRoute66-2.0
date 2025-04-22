import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-950 text-white p-4">
        <h1 className="text-4xl font-bold mb-4">FantaRoute66</h1>
        <p className="mb-6 text-center">Scommetti sugli imprevisti. Vivi il viaggio. Vinci la gloria.</p>
        <input
          type="text"
          placeholder="Inserisci il tuo nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="p-2 rounded-md text-black w-64 mb-4"
        />
        <Button onClick={handleEnter}>Entra nel gioco</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">FantaRoute66</h1>
      <p className="mb-4 text-sm">Benvenuto, <span className="font-semibold">{nickname}</span>! Hai {maxCredits} crediti. Seleziona gli eventi che pensi accadranno!</p>
      <div className="grid gap-4">
        {events.map((event) => {
          const isSelected = selected.includes(event.id);
          const disabled = !isSelected && totalCost + event.cost > maxCredits;

          return (
            <Card
              key={event.id}
              className={`cursor-pointer border-2 bg-blue-800 text-white rounded-xl shadow-md transition-transform hover:scale-105 ${
                isSelected ? "border-green-400" : "border-white/10"
              } ${disabled ? "opacity-40" : ""}`}
              onClick={() => !disabled && toggleEvent(event.id)}
            >
              <CardContent className="p-4">
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p className="text-sm text-gray-300">Costo: {event.cost} crediti</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-6">
        <p className="text-lg font-semibold">Crediti usati: {totalCost} / {maxCredits}</p>
        <Button className="mt-4" disabled={totalCost === 0}>Conferma selezione</Button>
      </div>
    </div>
  );
}
