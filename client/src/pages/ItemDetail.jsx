import { useParams } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function ItemDetail() {
  const { id } = useParams();
  const { items, addClaim } = useData();
  const { user } = useAuth();

  const item = items.find((i) => i.id === Number(id));
  const [answer, setAnswer] = useState("");

  if (!item) return <div>Item not found</div>;

  const handleClaim = () => {
    addClaim(item.id, user, answer);
    setAnswer("");
  };

  return (
    <div className="bg-white p-8 rounded shadow">

      <h2 className="text-xl font-semibold">{item.title}</h2>
      <p>Posted by Roll: {item.postedByRoll}</p>
      <p>Status: {item.status}</p>

      {item.status === "open" && (
        <div className="mt-4">
          <textarea
            placeholder="Describe detail"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border p-3 rounded"
          />
          <button
            onClick={handleClaim}
            className="bg-black text-white px-4 py-2 mt-2 rounded"
          >
            Claim
          </button>
        </div>
      )}

    </div>
  );
}
