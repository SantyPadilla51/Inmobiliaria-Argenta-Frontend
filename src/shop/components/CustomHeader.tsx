import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const CustomHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black shadow-md">
      <div className="flex items-center justify-between h-16 px-8 max-w-350 mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <span className="hidden font-bold sm:inline-block text-xl tracking-tight ">
            Inmobiliaria Argenta
          </span>
        </Link>

        {/* Navigation - Usando componentes de shadcn */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="space-x-1">
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 600,
                })
              }
              to="/?operacion=alquiler"
              className={cn(
                navigationMenuTriggerStyle(),
                "h-9 px-4 w-max text-sm hover:text-primary rounded-none",
              )}
            >
              Alquiler
            </Link>

            <Link
              onClick={() =>
                window.scrollTo({
                  top: 600,
                })
              }
              to="/?operacion=alquiler"
              className={cn(
                navigationMenuTriggerStyle(),
                "h-9 px-4 w-max text-sm hover:text-primary rounded-none",
              )}
            >
              Venta
            </Link>

            <Link
              onClick={() =>
                window.scrollTo({
                  top: 600,
                })
              }
              to="/?operacion=alquiler"
              className={cn(
                navigationMenuTriggerStyle(),
                "h-9 px-4 w-max text-sm hover:text-primary  rounded-none",
              )}
            >
              Pozo
            </Link>

            {/* Separador sutil */}
            <div className="mx-2 h-6 w-px bg-black " />

            <Link
              to="/tasaciones"
              className={cn(
                navigationMenuTriggerStyle(),
                "h-9 px-4 w-max text-sm hover:text-primary border border-black rounded-none",
              )}
            >
              Tasaciones
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default CustomHeader;
