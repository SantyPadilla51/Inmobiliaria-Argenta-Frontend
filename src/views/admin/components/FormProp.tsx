import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, type ChangeEvent } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { PropiedadModelo, type Propiedad } from "@/shop/actions/propiedades";
import toast, { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AMENITIES_LIST,
  BARRIOS,
  OPCIONES_BANOS,
  OPCIONES_HABITACIONES,
  OPERACION,
  TIPO_LIST,
} from "@/constants/propiedades";

const FormProp = () => {
  const [form, setForm] = useState<Propiedad>(new PropiedadModelo());
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  interface ImageFile {
    file: File;
    preview: string;
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      const newImages: ImageFile[] = filesArray.map((file) => ({
        file: file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      // Importante: Liberar memoria de la URL creada
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const camposAValidar = (
      Object.keys(form) as Array<keyof typeof form>
    ).filter((campo) => campo !== "amenities" && campo !== "imagenes");

    const tieneCamposVacios = camposAValidar.some((campo) => {
      const valor = form[campo];

      return (valor ?? "").toString().trim() === "";
    });

    if (tieneCamposVacios) {
      toast.error("Por favor, completa todos los campos obligatorios.", {
        position: "top-right",
        style: { background: "#E61717", color: "white" },
        iconTheme: {
          primary: "#E61717",
          secondary: "#ffff",
        },
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      const precioLimpio = parseInt(form.precio.replace(/[^0-9]/g, ""), 10);
      const expensasLimpias = parseInt(
        form.expensas.replace(/[^0-9]/g, ""),
        10,
      );

      formData.append("titulo", form.titulo);
      formData.append("barrio", form.barrio);
      formData.append("habitaciones", form.habitaciones);
      formData.append("wc", form.wc);
      formData.append("descripcion", form.descripcion);
      formData.append("operacion", form.operacion);
      formData.append("calle", form.calle);
      formData.append("cochera", form.cochera);
      formData.append("tipo", form.tipo);
      formData.append("direccion", Number(form.direccion).toString());
      formData.append("amenities", JSON.stringify(form.amenities));
      formData.append("precio", precioLimpio.toString());
      formData.append("expensas", expensasLimpias.toString());

      // Agregamos las imágenes reales del estado 'images'
      images.forEach((imgObj) => {
        formData.append("fotos", imgObj.file);
      });

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/admin/dashboard/propiedades",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const result = await response.json();

      if (result.ok) {
        toast.success("Propiedad Creada", {
          duration: 4000,
          position: "bottom-right",
        });
        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: any) => {
    const digits = value.replace(/\D/g, "");

    if (!digits) return "";

    const formatted = new Intl.NumberFormat("de-DE").format(digits);

    return `$${formatted}`;
  };

  return (
    <>
      <Toaster />
      <form className=" p-4 rounded-sm">
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="mb-6 rounded-t-lg bg-slate-100 p-4 text-sm font-bold uppercase tracking-wide text-black shadow-inner flex items-center gap-2">
              <span className="text-xl">🏠</span>
              Información de la Propiedad
            </FieldLegend>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Nombre de la Propiedad</FieldLabel>
                  <Input
                    className="bg-gray-300! shadow-none"
                    id="titulo"
                    placeholder="Ej: Departamento en Palermo"
                    onChange={(e) =>
                      setForm({ ...form, titulo: e.target.value })
                    }
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Tipo de Propiedad</FieldLabel>
                  <Select
                    value={form.tipo}
                    onValueChange={(value) =>
                      setForm({ ...form, tipo: value ?? "" })
                    }
                  >
                    <SelectTrigger
                      className="bg-gray-300!"
                      id="operacion-propiedad"
                    >
                      <SelectValue placeholder="Venta o Alquiler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {TIPO_LIST.map((item) => (
                          <SelectItem key={item.id} value={item.value}>
                            {item.value}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Calle</FieldLabel>
                  <Input
                    className="bg-gray-300!"
                    id="calle-propiedad"
                    placeholder="Ej: Av. Santa Fe"
                    onChange={(e) =>
                      setForm({ ...form, calle: e.target.value })
                    }
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Direccion</FieldLabel>
                  <Input
                    className="bg-gray-300!"
                    id="direccion-propiedad"
                    placeholder="Ej: 3526"
                    maxLength={4}
                    minLength={2}
                    onChange={(e) =>
                      setForm({ ...form, direccion: e.target.value })
                    }
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Barrio</FieldLabel>
                  <Select
                    value={form.barrio}
                    onValueChange={(value) =>
                      setForm({ ...form, barrio: value ?? "" })
                    }
                  >
                    <SelectTrigger
                      className="bg-gray-300!"
                      id="barrio-propiedad"
                    >
                      <SelectValue placeholder="Seleccionar barrio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {BARRIOS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel>Baños</FieldLabel>
                  <Select
                    value={form.wc}
                    onValueChange={(value) =>
                      setForm({ ...form, wc: value ?? "" })
                    }
                  >
                    <SelectTrigger className="bg-gray-300!" id="wc-propiedad">
                      <SelectValue placeholder="Cantidad de baños" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {OPCIONES_BANOS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Cochera</FieldLabel>
                  <Select
                    value={form.cochera}
                    onValueChange={(value) =>
                      setForm({ ...form, cochera: value ?? "" })
                    }
                  >
                    <SelectTrigger
                      className="bg-gray-300!"
                      id="cochera-propiedad"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          { value: "Si", label: "Sí" },
                          { value: "No", label: "No" },
                        ].map((opcion) => (
                          <SelectItem key={opcion.value} value={opcion.value}>
                            {opcion.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Habitaciones</FieldLabel>
                  <Select
                    value={form.habitaciones}
                    onValueChange={(value) =>
                      setForm({ ...form, habitaciones: value ?? "" })
                    }
                  >
                    <SelectTrigger className="bg-gray-300!" id="wc-propiedad">
                      <SelectValue placeholder="Cantidad de habitaciones" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {OPCIONES_HABITACIONES.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Precio</FieldLabel>
                  <Input
                    className="bg-gray-300!"
                    id="precio-propiedad"
                    placeholder="$550.000"
                    value={form.precio || ""}
                    onChange={(e) => {
                      const formattedValue = formatCurrency(e.target.value);
                      setForm({ ...form, precio: formattedValue });
                    }}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Expensas</FieldLabel>
                  <Input
                    className="bg-gray-300!"
                    id="expensas-propiedad"
                    placeholder="$90.000"
                    // Es vital pasar el valor del estado al input para que se vea el cambio
                    value={form.expensas || ""}
                    onChange={(e) => {
                      const formattedValue = formatCurrency(e.target.value);
                      setForm({ ...form, expensas: formattedValue });
                    }}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel>Tipo de Operacion</FieldLabel>
                  <Select
                    value={form.operacion}
                    onValueChange={(value) =>
                      setForm({ ...form, operacion: value ?? "" })
                    }
                  >
                    <SelectTrigger
                      className="bg-gray-300!"
                      id="operacion-propiedad"
                    >
                      <SelectValue placeholder="Venta o Alquiler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {OPERACION.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />

          <Field>
            <FieldLabel>Amenities</FieldLabel>
            <div className="flex gap-4 mt-2 p-4 border rounded-md bg-black text-white border-gray-200">
              {AMENITIES_LIST.map((amenity) => (
                <div key={amenity.id} className="flex items-center w-full">
                  <Checkbox
                    id={amenity.id}
                    className={cn("cursor-pointer")}
                    checked={form.amenities?.includes(amenity.id)}
                    onCheckedChange={(checked) => {
                      const currentAmenities = form.amenities || [];
                      const newAmenities = checked
                        ? [...currentAmenities, amenity.id]
                        : currentAmenities.filter((id) => id !== amenity.id);

                      setForm({ ...form, amenities: newAmenities });
                    }}
                  />
                  <label
                    htmlFor={amenity.id}
                    className=" ms-3 text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </Field>

          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Descripcion</FieldLabel>
                <Textarea
                  id="descripcion-propiedad"
                  placeholder="Ej: Hermoso departamento de 3 ambientes en Palermo, con excelente ubicación y amenities."
                  className="resize-none bg-gray-300!"
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field>
            <FieldLabel>Fotos de la Propiedad</FieldLabel>
            <div className="mt-2 flex flex-col gap-4">
              {/* Zona de Carga */}
              <label
                htmlFor="images-upload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer bg-white hover:bg-slate-50 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <svg
                    className="w-8 h-8 mb-3 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-slate-600 font-medium">
                    Click para cargar imágenes
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    JPG, PNG o WEBP (puedes seleccionar varias)
                  </p>
                </div>
                <input
                  id="images-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {/* Grid de Previsualización */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2">
                  {images.map((img, index) => (
                    <div
                      key={img.preview}
                      className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm"
                    >
                      <img
                        src={img.preview}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Botón Eliminar */}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full p-1.5 shadow-md transition-all opacity-0 group-hover:opacity-100"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Field>

          {loading ? (
            <div className="justify-end animate-pulse flex items-center gap-2 text-blue-700 font-semibold">
              <Spinner /> <span>Guardando...</span>
            </div>
          ) : (
            <Field orientation="horizontal" className="justify-end ">
              <Button
                className="bg-black text-white px-8 hover:bg-slate-800 cursor-pointer"
                type="submit"
                onClick={handleSubmit}
              >
                Guardar Propiedad
              </Button>
            </Field>
          )}
        </FieldGroup>
      </form>
    </>
  );
};

export default FormProp;
