import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Topbar({ setSidebarOpen }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between">
      <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
        ☰
      </button>

      <h1 className="font-semibold">CARS</h1>

      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center cursor-pointer"
        >
          {user ? user.name[0] : "?"}
        </div>

        {open && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow w-40">
            {user ? (
              <>
                <div className="p-2 text-sm">{user.role}</div>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="px-4 py-2">Login Required</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
