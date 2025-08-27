import { useFormik } from "formik";
import React from "react";

export const RegisterForm = () => {
  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      password: "",
      email: "",
      phone: "",
      avatar_url: null,
      specialties: [], // Ahora es un array de strings
      dni: "",
      ID_type_user: 1,
    },
    onSubmit: (vals) => {
      console.log(vals);
    },
  });

  const roles = [
    "Plegador",
    "Pintor",
    "Soldador",
    "Maquinario",
    "Diseñador",
    "Electricista",
    "Obrero",
    "Técnico",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl max-w-5xl mx-auto"
    >
      <h1 className="text-green-600 font-bold text-2xl mb-6 uppercase tracking-wide">
        Registro de usuarios:
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block font-bold text-black uppercase">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              DNI <span className="text-red-500">*</span>
            </label>
            <input
              name="dni"
              value={values.dni}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              Correo
            </label>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              Teléfono
            </label>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {values.avatar_url && (
                <img
                  src={URL.createObjectURL(values.avatar_url)}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <input
              type="file"
              id="avatar_url"
              name="avatar_url"
              onChange={(e) =>
                setFieldValue("avatar_url", e.currentTarget.files?.[0] || null)
              }
              className="text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-black">Usuario</label>
            <select
              name="ID_type_user"
              value={values.ID_type_user}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 ml-2"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Operador</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-black block mb-2">
              Roles (selecciona uno o más)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-2 border border-gray-300 rounded-md p-2 bg-gray-100 hover:bg-green-100 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={r}
                    checked={values.specialties.includes(r)}  
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue("specialties", [...values.specialties, r]);
                      } else {
                        setFieldValue(
                          "specialties",
                          values.specialties.filter((role) => role !== r)
                        );
                      }
                    }}
                    className="accent-green-600"
                  />
                  {r}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700"
        >
          Registrar
        </button>
      </div>
    </form>
  );
};
