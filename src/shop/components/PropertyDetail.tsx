import { BedDouble, Bath, Car, MapPin, ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AgendarVisita } from "../pages/AgendarVisita";
import { MapByAddress } from "./Map";
import type { Propiedad } from "../../interfaces/Propiedad";
import GaleriaPropiedad from "./GaleriaPropiedad";
import CustomHeader from "./CustomHeader";
import CustomCard from "./CustomCard";
import Footer from "./Footer";

export function PropertyDetail() {
  const [prop, setProp] = useState<Propiedad>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getProp = async () => {
    try {
      setLoading(true);

      const req = await fetch(
        `https://backend-inmobiliaria-argenta.vercel.app/propiedades/${id}`,
      );

      if (!req.ok) {
        throw new Error("No se pudo obtener la propiedad");
      }

      const data = await req.json();
      setProp(data.data);
    } catch (error) {
      console.error("Hubo un error en la petición:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProp();
  }, [id]);

  const formatCurrency = (value: any) => {
    const digits = String(value).replace(/\D/g, "");

    if (!digits) return "";

    const formatted = new Intl.NumberFormat("de-DE").format(Number(digits));

    return `${formatted}`;
  };

  const getIntersectionAddress = (): string => {
    const { calle, direccion, barrio } = prop || {};

    if (!calle || !direccion) return "";

    let base = `${calle} ${direccion}`;

    const fullQuery = `${base}, ${barrio || ""}, Buenos Aires, Argentina`;
    return fullQuery.replace(/\s+/g, " ").replace(/,\s*,/g, ",").trim();
  };

  const fullAddress = getIntersectionAddress();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold">
        Cargando propiedad...
      </div>
    );
  if (!prop)
    return (
      <div className="min-h-screen flex items-center justify-center">
        No se encontró la propiedad.
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      <CustomHeader />
      <div className="max-w-300 mx-auto p-4 flex justify-between items-center">
        <Link to="/">
          <Button
            variant="ghost"
            className="flex gap-2 items-center text-slate-600 cursor-pointer"
          >
            <ChevronLeft size={18} /> Volver al listado
          </Button>
        </Link>
      </div>

      <GaleriaPropiedad prop={prop} />

      <main className="max-w-300 mx-auto px-4 mt-8 grid grid-rows-1 lg:grid lg:grid-cols-3 gap-12">
        <aside className="w-full row-start-2 row-end-3 lg:row-start-1 lg:w-90  lg:col-start-3 lg:col-end-5">
          <div>
            <Card className="shadow-2xl border-slate-100 rounded-none overflow-hidden">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-1">
                  <p className=" font-medium italic text-white">
                    Precio de {prop.operacion}
                  </p>
                  <p className="text-3xl lg:text-5xl font-black text-white">
                    $ {formatCurrency(prop.precio)}
                  </p>
                  <p className="text-sm text-green-600 font-bold tracking-tight mt-2">
                    Valor de expensas $ {formatCurrency(prop.expensas)}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <AgendarVisita title={prop.titulo} />
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        <div className=" lg:row-start-1 lg:col-span-2 space-y-8">
          <div>
            <Badge className="bg-blue-100 text-blue-600 border border-blue-700 hover:bg-blue-100  px-4 py-1 capitalize">
              {prop.operacion}
            </Badge>
            <h1 className="text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {prop.titulo}
            </h1>
            <div className="flex items-center gap-2 text-slate-500 mt-2">
              <MapPin size={18} className="text-blue-500" />
              <div className="font-medium capitalize">
                {prop.calle} {prop.direccion},{" "}
                <span className="capitalize">{prop.barrio}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <BedDouble size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold">
                  Dormitorios
                </p>
                <p className="font-bold text-slate-900">{prop.habitaciones}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <Bath size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold">
                  Baños
                </p>
                <p className="font-bold text-slate-900">{prop.wc}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <Car size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold">
                  Cochera
                </p>
                {prop.cochera === "true" ? (
                  <p className="font-bold text-slate-900">SI</p>
                ) : (
                  <p className="font-bold text-slate-900">No</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-80 lg:w-full lg:space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">Descripción</h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {prop.descripcion}
            </p>
          </div>

          <div className=" lg:space-y-4 pt-4">
            <h3 className="text-2xl font-bold text-slate-900">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {prop.amenities && prop.amenities.length > 0
                ? prop.amenities.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-700 capitalize"
                    >
                      <Check
                        className="w-4 h-4 text-green-500"
                        strokeWidth={3}
                      />
                      <span>{item}</span>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="w-full row-start-3 row-end-4 lg:col-start-1 lg:col-end-4 z-10">
          <h1 className="mb-3 text-2xl font-bold text-slate-900">
            Ubicación de la Propiedad
          </h1>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <MapByAddress address={fullAddress} />
          </div>
        </div>

        <div className=" lg:col-span-3 sm:col-span-2 mt-6 pt-12 border-t border-slate-100 pb-20">
          <h2 className="text-2xl font-bold">
            Propiedades similares que te pueden interesar
          </h2>

          <CustomCard
            tipo={prop?.tipo}
            barrio={prop?.barrio}
            operacion={prop.operacion}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
