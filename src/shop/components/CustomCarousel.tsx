import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const CustomCarousel = () => {
  const plugin = React.useRef(Autoplay({ delay: 4000 }));

  const images = [
    "/assets//propiedades/prop-1.webp",
    "/assets/propiedades/prop-2.webp",
    "/assets/propiedades/prop-3.webp",
  ];

  return (
    <div className="w-screen overflow-hidden relative">
      {/* Capa de texto sobre el carrusel */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-2xl tracking-tight">
          Tu próximo hogar <span className="text-blue-400">empieza acá</span>
        </h1>
        <p className="text-white/90 text-lg md:text-2xl mt-4 max-w-2xl drop-shadow-md font-light">
          Descubrí las propiedades más exclusivas y el diseño que siempre
          imaginaste.
        </p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[60vh] md:h-[80vh] overflow-hidden"
      >
        <CarouselContent
          className="ml-0 mt-0 flex pt-0"
          style={{ marginTop: 0, paddingTop: 0 }}
        >
          {images.map((src, index) => (
            <CarouselItem key={index} className="pl-0 pt-0 relative">
              <div className="absolute inset-0 bg-black/40 z-5" />

              <div className="flex h-[60vh] md:h-[80vh] items-center justify-center p-0 overflow-hidden">
                <img
                  src={src}
                  alt={`Vista ${index + 1}`}
                  fetchPriority="high"
                  className="w-full h-full object-cover block"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
