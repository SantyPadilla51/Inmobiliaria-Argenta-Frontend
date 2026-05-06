import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ChevronLeft, ClipboardCheck, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import CustomHeader from "../components/CustomHeader";

const tasacionSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  email: z.string().email("Ingresá un correo electrónico válido."),
  telefono: z.string().min(8, "El teléfono debe tener al menos 8 dígitos."),
  direccion: z.string().min(5, "La dirección es obligatoria."),
  mensaje: z
    .string()
    .max(200, "El mensaje no puede superar los 200 caracteres.")
    .optional(),
});

export default function TasacionesForm() {
  const form = useForm<z.infer<typeof tasacionSchema>>({
    resolver: zodResolver(tasacionSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      direccion: "",
      mensaje: "",
    },
  });

  function onSubmit(data: z.infer<typeof tasacionSchema>) {
    toast.success("Solicitud enviada", {
      description: "Un asesor te contactará pronto.",
      position: "bottom-right",
    });
    form.reset();
  }

  return (
    <>
      <CustomHeader />
      <div className="max-w-350 mx-auto px-8 py-10">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-muted-foreground hover:text-foreground transition-colors -ml-2 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <ChevronLeft className="h-4 w-4" />
            Volver al catálogo
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-black lg:text-5xl">
              Tasamos tu propiedad con{" "}
              <span className="text-blue-600">precisión</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Conocé el valor real de tu inmueble en el mercado actual. Nuestro
              equipo analiza cada detalle para brindarte la tasación más
              acertada.
            </p>

            <div className="grid gap-6">
              {[
                {
                  icon: Clock,
                  title: "Rapidez",
                  desc: "Informe detallado en menos de 48hs.",
                },
                {
                  icon: ClipboardCheck,
                  title: "Profesionalismo",
                  desc: "Martilleros matriculados.",
                },
                {
                  icon: MapPin,
                  title: "Cobertura",
                  desc: "Tasaciones presenciales en CABA y GBA.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-blue-600 p-2 rounded-lg text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Card className="w-full shadow-lg border-border">
            <CardHeader>
              <CardTitle>Datos de la Tasación</CardTitle>
              <CardDescription>
                Completá los datos y te contactaremos a la brevedad.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="tasacion-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  {/* Nombre */}
                  <Controller
                    name="nombre"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Nombre Completo</FieldLabel>
                        <Input
                          {...field}
                          placeholder="Escribí tu nombre"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Email</FieldLabel>
                          <Input
                            {...field}
                            type="email"
                            placeholder="ejemplo@correo.com"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    {/* Teléfono */}
                    <Controller
                      name="telefono"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Teléfono</FieldLabel>
                          <Input
                            {...field}
                            placeholder="11 1234 5678"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  {/* Dirección */}
                  <Controller
                    name="direccion"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Dirección de la Propiedad</FieldLabel>
                        <Input
                          {...field}
                          placeholder="Calle, Altura, Barrio"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Mensaje / Descripción con contador */}
                  <Controller
                    name="mensaje"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Notas Adicionales</FieldLabel>
                        <InputGroup>
                          <InputGroupTextarea
                            {...field}
                            placeholder="Contanos sobre los ambientes, estado, m2..."
                            rows={4}
                            className="min-h-25 resize-none"
                            aria-invalid={fieldState.invalid}
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupText className="tabular-nums text-[10px]">
                              {field.value?.length || 0}/200
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Button
                    type="submit"
                    form="tasacion-form"
                    className="w-full font-bold py-6 cursor-pointer"
                  >
                    Solicitar Tasación Ahora
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
