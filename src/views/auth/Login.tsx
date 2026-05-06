import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { ArrowBigLeftDash } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const [request] = await Promise.all([
        fetch("http://localhost:5000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      const data = await request.json();

      if (data.msg === "ok") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        if (data.user.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/";
        }
      } else {
        setLoading(false);
        toast.error(data.msg);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error al iniciar sesion");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      <div className="absolute z-20 text-white left-3 top-3">
        <Link
          to="/"
          className="flex gap-4 bg-blue-600 py-2 px-3 rounded-md cursor-pointer hover:bg-blue-700"
        >
          <ArrowBigLeftDash />
          <span>Home</span>
        </Link>
      </div>
      <Toaster />

      {/* Lado Izquierdo: Visual (Oculto en móviles, visible desde md) */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden bg-slate-900">
        <img
          src="/assets/propiedades/login.jpg" // Usa una de tus fotos de /public
          alt="Propiedad de lujo"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Encontrá el lugar donde <br />
            querés vivir.
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            Gestioná tus propiedades y accedé a las mejores ofertas de Buenos
            Aires con Inmobiliaria Argenta.
          </p>
        </div>
      </div>

      {/* Lado Derecho: Formulario */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center justify-center p-8 lg:p-16 bg-slate-50 relative">
        {/* Loading flotante */}
        {loading && (
          <div className="absolute top-10 right-10 animate-pulse flex items-center gap-2 text-blue-700 font-semibold">
            <Spinner /> <span>Cargando...</span>
          </div>
        )}

        <div className="w-full max-w-md space-y-8">
          {/* Logo y Encabezado */}
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Bienvenido de nuevo
            </h1>
            <p className="text-slate-500 mt-2">
              Ingresá tus datos para gestionar tu cuenta.
            </p>
          </div>

          <form id="auth-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="h-12 bg-slate-300! border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <a
                  href="#"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                className="h-12 bg-slate-300! border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg "
              form="auth-form"
            >
              Iniciar Sesión
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            ¿Todavía no tenés cuenta?{" "}
            <Link
              to="/auth/register"
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Registrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
