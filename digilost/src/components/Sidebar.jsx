import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();
  const location = useLocation();

  const closeSidebar = () => {
    if (setSidebarOpen) setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed z-50 lg:static top-0 left-0 h-full w-64
          bg-black text-white shadow-2xl
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
        `}
      >
        {/* Logo */}
        <div className="p-6 text-2xl font-bold border-b border-gray-800 tracking-wide">
          <span className="text-red-600">CARS</span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 text-sm font-medium">

          <NavItem
            to="/"
            text="Dashboard"
            active={location.pathname === "/"}
            closeSidebar={closeSidebar}
          />

          <NavItem
            to="/items"
            text="Items"
            active={location.pathname === "/items"}
            closeSidebar={closeSidebar}
          />

          <NavItem
            to="/post"
            text="Post Item"
            active={location.pathname === "/post"}
            closeSidebar={closeSidebar}
          />

          {/* Admin Only */}
          {user?.role === "admin" && (
            <NavItem
              to="/admin"
              text="Admin Panel"
              active={location.pathname === "/admin"}
              closeSidebar={closeSidebar}
            />
          )}

        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-800 text-xs text-gray-400">
          <div className="flex justify-between">
            <span>{user?.name}</span>
            <span className="capitalize">{user?.role}</span>
          </div>
        </div>

      </aside>
    </>
  );
}

function NavItem({ to, text, active, closeSidebar }) {
  return (
    <Link
      to={to}
      onClick={closeSidebar}
      className={`
        block px-4 py-3 rounded-lg transition-all duration-200
        ${
          active
            ? "bg-red-600 text-white shadow-md"
            : "hover:bg-red-600 hover:text-white"
        }
      `}
    >
      {text}
    </Link>
  );
}
