import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FiltersProp = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const operacionSeleccionada = searchParams.get("operacion");
  const tipoSeleccionado = searchParams.get("tipo");
  const barrio = searchParams.get("barrio") || "";

  useEffect(() => {
    if (!searchParams.get("operacion")) {
      const params = new URLSearchParams(searchParams);
      params.set("operacion", "alquiler");

      setSearchParams(params, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const updateFilter = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const limpiarFiltros = () => {
    setSearchParams({});
  };

  return (
    <>
      <div className="mx-auto w-60 flex flex-col gap-8 lg:w-full">
        <div className="lg:space-y-3">
          <Label className="text-slate-900 font-bold text-sm uppercase tracking-wider">
            Operación
          </Label>
          <div className="grid grid-cols-2 gap-2 ">
            {["alquiler", "venta"].map((op) => {
              const isActive = operacionSeleccionada === op;

              return (
                <button
                  onClick={() =>
                    updateFilter("operacion", isActive ? null : op)
                  }
                  key={op}
                  className={cn(
                    "cursor-pointer px-4 py-2 rounded-none border transition-all text-sm font-medium capitalize",
                    isActive
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-white text-slate-600 border border-gray-500 hover:border-blue-500 hover:text-blue-600",
                  )}
                >
                  {op}
                </button>
              );
            })}
          </div>
        </div>

        {/*Tipo de Propiedad*/}

        <div className="flex flex-wrap gap-2">
          <Label className="text-slate-900 font-bold text-sm uppercase tracking-wider">
            Tipo de Propiedad
          </Label>
          {["departamento", "ph", "casa"].map((tipo) => {
            const isActive = tipoSeleccionado === tipo;

            return (
              <button
                onClick={() => updateFilter("tipo", isActive ? null : tipo)}
                key={tipo}
                className={cn(
                  "cursor-pointer px-4 py-2 rounded-none border transition-all text-sm font-medium capitalize",
                  isActive
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white border-gray-500 text-slate-600 hover:border-blue-500 hover:text-blue-600",
                )}
              >
                {tipo}
              </button>
            );
          })}
        </div>

        {/*  Barrio */}
        <div className="space-y-3">
          <Label className="text-slate-900 font-bold text-sm uppercase tracking-wider">
            Ubicación
          </Label>
          <Select
            value={barrio}
            onValueChange={(val) => updateFilter("barrio", val)}
          >
            <SelectTrigger className="w-full h-11 border border-gray-500 cursor-pointer rounded-none ">
              <SelectValue placeholder="Seleccioná un barrio" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              <SelectGroup>
                <SelectLabel>Barrios más buscados</SelectLabel>
                <SelectItem value="almagro">Almagro</SelectItem>
                <SelectItem value="recoleta">Recoleta</SelectItem>
                <SelectItem value="belgrano">Belgrano</SelectItem>
                <SelectItem value="puerto madero">Puerto Madero</SelectItem>
                <SelectItem value="balvanera">Balvanera</SelectItem>
                <SelectItem value="barracas">Barracas</SelectItem>
                <SelectItem value="chacarita">Chacarita</SelectItem>
                <SelectItem value="caballito">Caballito</SelectItem>
                <SelectItem value="constitucion">Constitucion</SelectItem>
                <SelectItem value="colegiales">Colegiales</SelectItem>
                <SelectItem value="flores">Flores</SelectItem>
                <SelectItem value="monserrat">Monserrat</SelectItem>
                <SelectItem value="retiro">Retiro</SelectItem>
                <SelectItem value="nuñez">Nuñez</SelectItem>
                <SelectItem value="parque chacabuco">
                  Parque Chacabuco
                </SelectItem>
                <SelectItem value="saavedra">Saavedra</SelectItem>
                <SelectItem value="san telmo">San Telmo</SelectItem>
                <SelectItem value="villa crespo">Villa Crespo</SelectItem>
                <SelectItem value="villa devoto">Villa Devoto</SelectItem>
                <SelectItem value="villa urquiza">Villa Urquiza</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Botón de Limpiar Filtros */}
        <Button
          variant="link"
          className="text-slate-600 text-xs font-semibold w-fit p-0 h-auto self-center hover:text-red-600  cursor-pointer"
          onClick={limpiarFiltros}
        >
          Limpiar todos los filtros
        </Button>
      </div>
    </>
  );
};

export default FiltersProp;
