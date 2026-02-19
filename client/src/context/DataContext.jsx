import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("carsItems")) || []
  );
  const [claims, setClaims] = useState(
    JSON.parse(localStorage.getItem("carsClaims")) || []
  );

  useEffect(() => {
    localStorage.setItem("carsItems", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("carsClaims", JSON.stringify(claims));
  }, [claims]);

  const addItem = (item) => {
    setItems((prev) => [
      ...prev,
      { ...item, id: Date.now(), status: "open" }
    ]);
  };

  const addClaim = (itemId, claimant, answer) => {
    const newClaim = {
      id: Date.now(),
      itemId,
      claimantRoll: claimant.rollNo,
      answer,
      status: "pending"
    };

    setClaims((prev) => [...prev, newClaim]);

    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, status: "claimed" } : i
      )
    );
  };

  const approveClaim = (claimId) => {
    const claim = claims.find((c) => c.id === claimId);
    if (!claim) return;

    setClaims((prev) =>
      prev.map((c) =>
        c.id === claimId ? { ...c, status: "approved" } : c
      )
    );

    setItems((prev) =>
      prev.map((i) =>
        i.id === claim.itemId
          ? { ...i, status: "resolved" }
          : i
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        items,
        claims,
        addItem,
        addClaim,
        approveClaim,
        removeItem
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
