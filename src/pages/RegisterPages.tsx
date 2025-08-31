import { useFormik } from "formik";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface RegisterFormValues {
  name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string;
  avatar_url: File | null;
  specialties: number[]; // <-- Tipado explícito
  dni: string;
  ID_type_user: number;
}
export const RegisterForm = () => {
  const { signup, authErrors, user } = useAuth();

//  if (user && user.ID_type_user !== 1) return <Navigate to="/" replace />;

  // Array de roles con id y nombre
  const roles = [
    { id: 1, name: "Plegador" },
    { id: 2, name: "Pintor" },
    { id: 3, name: "Soldador" },
    { id: 4, name: "Maquinario" },
    { id: 5, name: "Diseñador" },
    { id: 6, name: "Electricista" },
    { id: 7, name: "Obrero" },
    { id: 8, name: "Técnico" },
  ];

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      last_name: "",
      password: "",
      email: "",
      phone: "",
      avatar_url: null,
      specialties: [], // <-- Ahora es number[]
      dni: "",
      ID_type_user: 1,
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("last_name", values.last_name);
      formData.append("password", values.password);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("dni", values.dni);
      formData.append("ID_type_user", values.ID_type_user.toString());

      if (values.avatar_url) {
        formData.append("avatar", values.avatar_url); // Cambia el nombre del campo
      }

      formData.append("specialties", JSON.stringify(values.specialties)); // Envía como array
      console.log(values);
      const res = await signup(formData);
      console.log(res);
    },
  });

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
              accept="image/*"
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
                  key={r.id}
                  className="flex items-center gap-2 border border-gray-300 rounded-md p-2 bg-gray-100 hover:bg-green-100 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={r.id}
                    checked={values.specialties.includes(r.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue("specialties", [...values.specialties, r.id]);
                      } else {
                        setFieldValue(
                          "specialties",
                          values.specialties.filter((roleId) => roleId !== r.id)
                        );
                      }
                    }}
                    className="accent-green-600"
                  />
                  {r.name}
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

      <div className="">
        {authErrors.map((error, i) => (
          <div className="bg-red-600" key={i}>
            {error}
          </div>
        ))}
      </div>
    </form>
  );
};