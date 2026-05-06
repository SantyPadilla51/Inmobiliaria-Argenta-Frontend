import { Home, LayoutDashboard, LogOut, Users } from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const closeSession = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <aside className="hidden md:flex w-64 flex-col bg-slate-300 border-r border-slate-200 p-6">
        <div className="flex items-center gap-2 px-2 mb-10">
          <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            RealEstate
          </span>
        </div>

        <nav className="flex-1 space-y-1">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-medium transition-all"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-xl font-medium transition-all"
          >
            <Home size={20} />
            Propiedades
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 hover:text-slate-800 rounded-xl font-medium transition-all"
          >
            <Users size={20} />
            Clientes
          </a>
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <button
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-500 transition-colors font-medium cursor-pointer"
            onClick={closeSession}
          >
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
