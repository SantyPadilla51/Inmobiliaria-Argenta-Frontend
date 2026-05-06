import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const CustomHeader = () => {
  const menuItems = [
    { title: "Alquiler", href: "/?operacion=alquiler" },
    { title: "Venta", href: "/?operacion=venta" },
    { title: "Pozo", href: "/?operacion=pozo" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black shadow-md">
      <div className="flex items-center justify-between h-16 px-8 max-w-350 mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <span className="hidden font-bold sm:inline-block text-xl tracking-tight ">
            Villella<span className="text-black"> Propiedades</span>
          </span>
        </Link>

        {/* Navigation - Usando componentes de shadcn */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="space-x-1">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <Link
                  to={item.href}
                  onClick={() =>
                    window.scrollTo({
                      top: 600,
                    })
                  }
                >
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "h-9 px-4 w-max text-black text-sm font-medium rounded-none transition-colors hover:text-primary focus:text-primary bg-transparent",
                    )}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            {/* Separador sutil */}
            <div className="mx-2 h-6 w-px bg-black " />

            <NavigationMenuItem>
              <Link to="/tasaciones">
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "h-9 px-4 w-max text-sm hover:text-primary border border-black rounded-none",
                  )}
                >
                  Tasaciones
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default CustomHeader;
