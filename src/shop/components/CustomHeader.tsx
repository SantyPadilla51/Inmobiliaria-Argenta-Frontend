const CustomHeader = () => {
  return (
    <>
      <header className="sticky top-0 bg-gray-300 p-3 text-black grid grid-cols-3 items-center font-semibold text-[15px]">
        <div className="justify-self-start">
          <h1 className="text-[25px]">Inmobiliaria Argenta</h1>
        </div>

        <ul className="flex gap-6 justify-self-center">
          <li className="hover:underline cursor-pointer">Alquileres</li>
          <li className="hover:underline cursor-pointer">En Venta</li>
        </ul>

        <div className="justify-self-end">
          {/* Puedes dejarlo vacío o poner un botón de "Contacto" */}
        </div>
      </header>
    </>
  );
};

export default CustomHeader;
