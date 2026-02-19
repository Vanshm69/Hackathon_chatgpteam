import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./context/AuthContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostItem from "./pages/PostItem";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";
import Admin from "./pages/Admin";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      {!user && (
        <>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Default route → Register */}
          <Route path="*" element={<Navigate to="/register" />} />
        </>
      )}

      {/* PROTECTED ROUTES */}
      {user && (
        <Route
          path="*"
          element={
            <div className="flex h-screen bg-gray-100">

              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <div className="flex-1 flex flex-col">

                <Topbar
                  setSidebarOpen={setSidebarOpen}
                  notifications={notifications}
                />

                <main className="flex-1 p-6 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/items" element={<Items />} />
                    <Route
                      path="/post"
                      element={
                        <PostItem
                          setNotifications={setNotifications}
                        />
                      }
                    />
                    <Route path="/item/:id" element={<ItemDetail />} />
                    <Route
                      path="/admin"
                      element={<Admin />}
                    />
                  </Routes>
                </main>

              </div>
            </div>
          }
        />
      )}

    </Routes>
  );
}
