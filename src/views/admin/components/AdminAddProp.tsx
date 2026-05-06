import FormProp from "./FormProp";
import SideBar from "./SideBar";

const AdminAddProp = () => {
  return (
    <>
      <div className="flex min-h-screen w-full bg-slate-50 font-sans text-slate-900">
        <SideBar />

        <div className="flex flex-col flex-1 h-screen overflow-y-auto">
          <header className="sticky top-0 z-10 h-24 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Agrega una nueva Propiedad
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Completa los campos para crear una nueva publicación
              </p>
            </div>
          </header>

          <main className="p-2 ">
            <div className="bg-white ">
              <FormProp />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminAddProp;
