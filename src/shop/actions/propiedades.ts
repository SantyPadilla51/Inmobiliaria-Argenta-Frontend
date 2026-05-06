export interface ImagenPropiedad {
  url?: string;
  es_principal: boolean;
}

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
  imagenes: ImagenPropiedad[];
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
  imagenes: ImagenPropiedad[] = [];
  amenities: string[] = [];
}

export const getPropiedades = async (filtros: {
  barrio?: string | null;
  tipo?: string | null;
  operacion?: string | null;
}): Promise<Propiedad[]> => {
  const params = new URLSearchParams();
  if (filtros.barrio) params.append("barrio", filtros.barrio);
  if (filtros.tipo) params.append("tipo", filtros.tipo);
  if (filtros.operacion) params.append("operacion", filtros.operacion);

  const url = `https://backend-inmobiliaria-argenta-29hw3bece-santypadilla51s-projects.vercel.app?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener datos");

  const data = await response.json();

  return data.propiedades;
};
