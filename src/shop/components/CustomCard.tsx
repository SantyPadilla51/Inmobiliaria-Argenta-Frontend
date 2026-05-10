import { useEffect, useState } from "react";
import { getPropiedades } from "../actions/propiedades";
import type { Propiedad } from "../../interfaces/Propiedad";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { PropiedadFoto } from "../components/PropiedadFoto";
import type { CustomCardProps } from "@/interfaces/CustomCardProps";

const CustomCard = ({ barrio, tipo, operacion }: CustomCardProps) => {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const tipoUrl = searchParams.get("tipo") || tipo || "departamento";
  const barrioUrl = searchParams.get("barrio") || barrio || "";
  const operacionUrl = searchParams.get("operacion") || operacion || "venta";

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);

      try {
        const data = await getPropiedades({
          barrio: barrioUrl,
          tipo: tipoUrl,
          operacion: operacionUrl,
        });

        setPropiedades(data);
        console.log(data);
      } catch (error) {
        console.error("Error al cargar propiedades:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [searchParams]);

  if (cargando) return <p>Cargando propiedades...</p>;

  return (
    <>
      <div className="col-span-full lg:col-start-2 lg:col-end-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 p-4 mt-14">
          {propiedades.length > 0 ? (
            propiedades.map((prop) => (
              <Card
                key={prop.id}
                className="relative w-full pt-0 overflow-hidden flex flex-col h-full rounded-none"
              >
                <div className="absolute inset-0 z-30 aspect-video " />
                <PropiedadFoto prop={prop} />
                <CardHeader className="flex-1">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-[15px]">{prop.titulo}</CardTitle>
                    <Badge variant="secondary" className="text-[15px]">
                      $
                      {new Intl.NumberFormat("de-DE").format(
                        Number(prop.precio),
                      )}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {prop.descripcion}
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <Link to={`/propiedad/${prop.id}`} className="w-full ">
                    <Button className="w-full cursor-pointer hover:bg-gray-300 rounded-none">
                      Ver Propiedad
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center col-span-full py-10 text-gray-500">
              No hay propiedades disponibles en este momento.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomCard;
