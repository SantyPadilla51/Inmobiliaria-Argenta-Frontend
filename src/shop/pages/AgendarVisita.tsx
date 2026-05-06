import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

const schema = z.object({
  nombre: z.string().min(1, "Requerido"),
  tel: z.string().min(1, "Requerido"),
});

export function AgendarVisita({ title }: { title: string }) {
  const [open, setOpen] = React.useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { nombre: "", tel: "" },
  });

  const onSubmit = (data: any) => {
    console.log(data);

    setTimeout(() => {
      toast.success("Successfully created!");
    }, 2000);
    setOpen(false);
    form.reset();
  };

  return (
    <>
      <Toaster />
      <Button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-600 text-white hover:bg-blue-700 h-14 font-bold rounded-none cursor-pointer"
      >
        Agendar Visita
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agendar Visita</DialogTitle>
            <DialogDescription>Propiedad: {title}</DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="nombre"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Nombre</FieldLabel>
                    <Input {...field} placeholder="Tu nombre" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="tel"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Teléfono</FieldLabel>
                    <Input {...field} placeholder="Tu teléfono" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              className="w-full bg-blue-600 py-6 text-white cursor-pointer hover:bg-blue-500"
            >
              Confirmar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
