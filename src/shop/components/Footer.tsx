import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black bg-black text-white ">
      <div className="max-w-350 mx-auto px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Branding */}
          <div className="flex flex-col gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-90"
            >
              <span className="font-bold text-xl tracking-tight ">
                Villella<span className="text-white"> Propiedades</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Líderes en el mercado inmobiliario, ayudándote a encontrar el
              hogar de tus sueños con seguridad, transparencia y la mejor
              tecnología.
            </p>
          </div>

          {/*  Navegación */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              Catálogo
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                to="/?operacion=venta"
                className="text-sm  hover:text-primary transition-colors"
              >
                Propiedades en Venta
              </Link>
              <Link
                to="/?operacion=alquiler"
                className="text-sm hover:text-primary transition-colors"
              >
                Alquileres
              </Link>
              <Link
                to="/tasaciones"
                className="text-sm  hover:text-primary transition-colors"
              >
                Tasaciones
              </Link>
              <Link
                to="/nosotros"
                className="text-sm  hover:text-primary transition-colors"
              >
                Sobre Nosotros
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm  uppercase tracking-wider">
              Legal
            </h3>
            <nav className="flex flex-col gap-3">
              <Link
                to="#"
                className="text-sm  hover:text-primary transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link
                to="#"
                className="text-sm  hover:text-primary transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                to="#"
                className="text-sm hover:text-primary transition-colors"
              >
                Defensa del Consumidor
              </Link>
            </nav>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-3 ">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Av. Libertador 1234, CABA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>+54 11 4567-8900</span>
              </li>
              <li className="flex items-center gap-3 ">
                <Mail className="h-4 w-4 text-primary" />
                <span>contacto@argenta.com.ar</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs ">
            © {currentYear} Villella Propiedades. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-1 opacity-50">
            <span className="text-[10px] font-mono uppercase tracking-tighter italic">
              Built with React & TypeScript
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
