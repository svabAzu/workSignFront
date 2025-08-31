import { useFormik } from "formik";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";

interface RegisterFormValues {
  name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string;
  avatar_url: File | null;
  specialties: number[];
  dni: string;
  ID_type_user: number;
}

export const RegisterForm = () => {
  const { signup, authErrors, user } = useAuth();

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

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("El nombre es obligatorio")
      .min(2, "El nombre debe tener al menos 2 caracteres"),
    last_name: Yup.string()
      .required("El apellido es obligatorio")
      .min(2, "El apellido debe tener al menos 2 caracteres"),
    dni: Yup.string()
      .required("El DNI es obligatorio")
      .matches(/^\d{7,10}$/, "El DNI debe tener entre 7 y 10 dígitos"),
    email: Yup.string()
      .email("Email inválido")
      .required("El correo es obligatorio"),
    phone: Yup.string()
      .required("El teléfono es obligatorio")
      .matches(/^\d{8,15}$/, "El teléfono debe tener entre 8 y 15 dígitos"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(4, "La contraseña debe tener al menos 4 caracteres"),
    avatar_url: Yup.mixed<File>()
      .nullable()
      .test("fileSize", "La imagen es muy grande (máx 2MB)", (value) => {
        if (!value) return true;
        return value instanceof File ? value.size <= 2 * 1024 * 1024 : true;
      })
      .test(
        "fileType",
        "Solo se permiten imágenes (jpg, jpeg, png)",
        (value) => {
          if (!value) return true;
          return value instanceof File
            ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            : true;
        }
      ),
    specialties: Yup.array()
      .of(Yup.number())
      .min(1, "Selecciona al menos un rol"),
    ID_type_user: Yup.number()
      .oneOf([1, 2], "Selecciona un tipo de usuario válido")
      .required("El tipo de usuario es obligatorio"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur, // <--- añadido
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      last_name: "",
      password: "",
      email: "",
      phone: "",
      avatar_url: null,
      specialties: [],
      dni: "",
      ID_type_user: 1,
    },
    validationSchema: schema,
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
        formData.append("avatar", values.avatar_url);
      }

      formData.append("specialties", JSON.stringify(values.specialties));
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
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name}</div>
            )}
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {touched.last_name && errors.last_name && (
              <div className="text-red-500 text-xs mt-1">
                {errors.last_name}
              </div>
            )}
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              DNI <span className="text-red-500">*</span>
            </label>
            <input
              name="dni"
              value={values.dni}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {touched.dni && errors.dni && (
              <div className="text-red-500 text-xs mt-1">{errors.dni}</div>
            )}
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              Correo
            </label>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {touched.email && errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>
          <div>
            <label className="block font-bold text-black uppercase">
              Teléfono
            </label>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {touched.phone && errors.phone && (
              <div className="text-red-500 text-xs mt-1">{errors.phone}</div>
            )}
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
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            {touched.password && errors.password && (
              <div className="text-red-500 text-xs mt-1">{errors.password}</div>
            )}
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
              onBlur={handleBlur}
              className="text-sm"
            />
          </div>
          {touched.avatar_url && errors.avatar_url && (
            <div className="text-red-500 text-xs mt-1">
              {errors.avatar_url as string}
            </div>
          )}

          <div>
            <label className="font-bold text-black">Usuario</label>
            <select
              name="ID_type_user"
              value={values.ID_type_user}
              onChange={handleChange}
              onBlur={handleBlur}
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
                        setFieldValue("specialties", [
                          ...values.specialties,
                          r.id,
                        ]);
                      } else {
                        setFieldValue(
                          "specialties",
                          values.specialties.filter((roleId) => roleId !== r.id)
                        );
                      }
                    }}
                    onBlur={handleBlur}
                    className="accent-green-600"
                  />
                  {r.name}
                </label>
              ))}
            </div>
            {touched.specialties && errors.specialties && (
              <div className="text-red-500 text-xs mt-1">
                {errors.specialties as string}
              </div>
            )}
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
