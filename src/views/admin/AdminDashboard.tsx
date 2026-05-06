import { Plus } from "lucide-react";
import SideBar from "./components/SideBar";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <SideBar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Bienvenido al panel de administración
            </h1>
            <p className="text-sm text-slate-500">
              Gestiona tus propiedades y publicaciones
            </p>
          </div>

          <Link to="/admin/add-prop">
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm active:scale-95 cursor-pointer">
              <Plus size={20} />
              Nueva Propiedad
            </button>
          </Link>
        </header>

        <section className="flex-1 overflow-y-auto p-8">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">Publicaciones Recientes</h2>
              <button className="text-indigo-600 text-sm font-bold hover:underline">
                Ver todo
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                    <th className="px-6 py-4">Propiedad</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Precio</th>
                    <th className="px-6 py-4">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      Apartamento de Lujo - Palermo
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                        Activo
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">$450,000</td>
                    <td className="px-6 py-4 space-x-3 ">
                      <button className="text-indigo-600 font-bold text-sm">
                        Editar
                      </button>
                      <button className="text-red-500 font-bold text-sm">
                        Borrar
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-800">
                      Casa de Campo - Pilar
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                        Borrador
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">$280,000</td>
                    <td className="px-6 py-4 space-x-3">
                      <button className="text-indigo-600 font-bold text-sm">
                        Editar
                      </button>
                      <button className="text-red-500 font-bold text-sm">
                        Borrar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
