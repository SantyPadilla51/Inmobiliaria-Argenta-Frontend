import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { optimizarImagen } from "../../utils/CloudinaryHelper";

const GaleriaPropiedad = ({ prop }: { prop: any }) => {
  const [index, setIndex] = useState(-1);

  const imagenesRaw: string[] = prop.imagenes || [];

  const slides = imagenesRaw.map((url) => ({ src: url }));

  if (imagenesRaw.length === 0) {
    return (
      <div className="p-4 text-center bg-gray-100 rounded">
        Sin fotos disponibles
      </div>
    );
  }

  return (
    <>
      <div className="max-w-300 mx-auto px-4 lg:grid lg:grid-cols-4 lg:grid-rows-2 gap-2 h-50 lg:h-100 rounded-2xl overflow-hidden">
        {/* Imagen Principal (Índice 0) */}
        <div
          className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden"
          onClick={() => setIndex(0)}
        >
          <img
            src={optimizarImagen(imagenesRaw[0]) || undefined}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt="Principal"
          />
        </div>

        {/* Imágenes secundarias (Índices 1 a 3) */}
        {imagenesRaw.slice(1, 4).map((url, i) => (
          <div
            key={i}
            className="relative group cursor-pointer overflow-hidden"
            onClick={() => setIndex(i + 1)}
          >
            <img
              src={optimizarImagen(url) || undefined}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt={`Vista ${i + 2}`}
            />
          </div>
        ))}

        {/* Quinta imagen con contador (Índice 4) */}
        {imagenesRaw.length >= 5 && (
          <div
            className="relative group cursor-pointer overflow-hidden"
            onClick={() => setIndex(4)}
          >
            <img
              src={optimizarImagen(imagenesRaw[4]) || undefined}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt="Vista 5"
            />
            {imagenesRaw.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
                <span className="text-white font-bold text-2xl">
                  +{imagenesRaw.length - 4}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        animation={{ fade: 300 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
};

export default GaleriaPropiedad;
