export const getPropiedades = async (filtros: {
  barrio?: string;
  tipo?: string;
  operacion?: string;
}) => {
  const params = new URLSearchParams();

  if (!filtros.barrio) {
    params.set("barrio", "");
  } else {
    params.set("barrio", filtros.barrio);
  }
  if (!filtros.tipo) {
    params.set("tipo", "departamento");
  } else {
    params.set("tipo", filtros.tipo);
  }

  if (!filtros.operacion) {
    params.set("operacion", "alquiler");
  } else {
    params.set("operacion", filtros.operacion);
  }

  const url = `https://backend-inmobiliaria-argenta.vercel.app/propiedades/?${params.toString()}`;

  console.log(url);

  const response = await fetch(url);

  if (!response.ok) throw new Error("Error al obtener datos");

  const data = await response.json();

  return data.propiedades;
};
