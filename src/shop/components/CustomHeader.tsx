import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Menu } from "lucide-react";

const CustomHeader = () => {
  const [open, setOpen] = useState(false);

  const handleNavClick = (scrollTo?: number) => {
    setOpen(false);
    if (scrollTo) {
      window.scrollTo({ top: scrollTo, behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "Alquiler", to: "/?operacion=alquiler", scroll: 1100 },
    { label: "Venta", to: "/?operacion=venta", scroll: 1100 },
    { label: "Pozo", to: "/?operacion=pozo", scroll: 1100 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-black shadow-md">
      <div className="flex items-center justify-between h-16 px-8 max-w-350 mx-auto">
        <Link to="/" className="flex items-center justify-center">
          <span className=" font-bold sm:inline-block text-xl  ">
            Inmobiliaria Argenta
          </span>
        </Link>

        {/* Navigation */}
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

        {/* {Menu Hamburguesa} */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-300px sm:w-400px">
              <SheetHeader>
                <SheetTitle className="text-left">Menú</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-4 mt-8 mx-5">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => handleNavClick(item.scroll)}
                    className="text-lg font-medium transition-colors hover:text-primary border-b pb-2"
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  to="/tasaciones"
                  onClick={() => handleNavClick()}
                  className="mt-4 flex h-11 items-center justify-center rounded-none border border-black px-6 text-sm font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Tasaciones
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
