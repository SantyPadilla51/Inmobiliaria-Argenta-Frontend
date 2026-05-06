import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { ArrowBigLeftDash } from "lucide-react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      toast.error("Las contraseñas no coinciden", { position: "top-center" });
      return;
    }

    try {
      const request = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await request.json();

      if (data.msg == "ok") {
        toast.success("Cuenta creada exitosamente", { position: "top-center" });
        setTimeout(() => {
          window.location.href = "/admin/form";
        }, 2000);
      } else {
        toast.error(data.msg, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Error al crear la cuenta", {
        position: "top-center",
      });
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

      {/* Lado Izquierdo: Visual (Mismo estilo que Login) */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden bg-slate-900">
        <img
          src="/assets/propiedades/prop-1.jpg" // Puedes cambiar la imagen para diferenciar
          alt="Inmuebles exclusivos"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Unite a la comunidad <br />
            inmobiliaria más grande.
          </h2>
          <p className="text-lg text-white/80 max-w-md">
            Creá tu cuenta hoy y empezá a publicar o buscar tu próximo hogar con
            herramientas exclusivas para usuarios registrados.
          </p>
        </div>
      </div>

      {/* Lado Derecho: Formulario de Registro */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center justify-center p-8 lg:p-16 bg-slate-50 relative">
        {/* Loading flotante */}
        {loading && (
          <div className="absolute top-10 right-10 animate-pulse flex items-center gap-2 text-blue-700 font-semibold">
            <Spinner /> <span>Creando cuenta...</span>
          </div>
        )}

        <div className="w-full max-w-md space-y-8">
          {/* Encabezado */}
          <div className="text-left">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Crear cuenta
            </h1>
            <p className="text-slate-500 mt-2">
              Completá tus datos para empezar tu experiencia.
            </p>
          </div>

          <form id="auth-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Campo: Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Juan Pérez"
                className="h-12 bg-slate-300! border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>

            {/* Campo: Email */}
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

            {/* Campo: Contraseña */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  className="h-12 bg-slate-300! border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password2">Repetir contraseña</Label>
                <Input
                  id="password2"
                  type="password"
                  className="h-12 bg-slate-300! border-slate-200 focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                  onChange={(e) =>
                    setForm({ ...form, password2: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full h-12 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/20 transition-all"
                form="auth-form"
              >
                Registrarme
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            ¿Ya tenés una cuenta?{" "}
            <Link
              to="/auth/login"
              className="font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
