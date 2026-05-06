import CustomCard from "../components/CustomCard";
import CustomHeader from "../components/CustomHeader";
import FiltersProp from "../components/FiltersProp";
import Paginacion from "../components/Pagination";
import CustomCarousel from "../components/CustomCarousel";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <CustomHeader />
      <CustomCarousel />
      <div className="bg-slate-50/50 min-h-screen">
        {/* Encabezado */}
        <div className="max-w-350 mx-auto pt-16 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Nuestras Oportunidades
              </h2>
              <p className="text-slate-500 mt-2 text-lg">
                Explorá las mejores propiedades seleccionadas para vos en Buenos
                Aires.
              </p>
            </div>
          </div>
        </div>

        {/* Contenedor Principal*/}
        <main className="max-w-350 mx-auto px-4 md:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className=" ">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    Filtros de búsqueda
                  </h4>
                  <FiltersProp />
                </div>
              </div>
            </aside>

            {/* Propiedades */}
            <section className="lg:col-span-3 xl:col-span-4">
              <CustomCard />
            </section>
          </div>
        </main>
      </div>

      <Paginacion />

      <Footer />
    </>
  );
};

export default HomePage;
