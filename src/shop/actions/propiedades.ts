export interface Propiedad {
  id?: string;
  titulo: string;
  direccion: string;
  calle: string;
  descripcion: string;
  habitaciones: number;
  precio: number;
  wc: number;
  expensas: number;
  barrio: string;
  operacion: string;
  cochera: string;
  tipo: string;
  imagenes: string[];
  amenities: string[];
}

export class PropiedadModelo implements Propiedad {
  titulo = "";
  direccion = "";
  calle = "";
  descripcion = "";
  habitaciones = 0;
  precio = 0;
  barrio = "";
  wc = 0;
  expensas = 0;
  operacion = "";
  cochera = "";
  tipo = "";
  imagenes: string[] = [];
  amenities: string[] = [];
}

export const getPropiedades = async (filtros: {
  barrio?: string;
  tipo?: string;
  operacion?: string;
}) => {
  const params = new URLSearchParams();
  if (filtros.barrio) params.set("barrio", filtros.barrio);
  if (filtros.tipo) params.set("tipo", filtros.tipo);
  if (filtros.operacion) params.set("operacion", filtros.operacion);

  const url = `https://backend-inmobiliaria-argenta.vercel.app/propiedades/?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) throw new Error("Error al obtener datos");

  const data = await response.json();

  return data.propiedades;
};
