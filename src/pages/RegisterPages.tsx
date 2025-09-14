import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGeneralTask } from "../context/GeneralTaskContext";
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
  const { signup, authErrors } = useAuth();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const { getSpecialties, specialties } = useGeneralTask();
  console.log(specialties);

  useEffect(() => {
    getSpecialties();
  }, []);

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
    handleBlur, 
    setFieldValue,
    resetForm,
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
      console.log(values);

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
      const success = await signup(formData);
      if (success) {
        setShowSuccessModal(true);
      }
    },
  });

  if (showSuccessModal) {
    return (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-4">
            ¡Registro Exitoso!
          </h2>
          <p className="mb-6 text-sm sm:text-base">
            El usuario ha sido registrado correctamente.
          </p>
          <button
            onClick={() => {
              setShowSuccessModal(false);
              resetForm();
            }}
            className="bg-green-600 text-white font-bold py-2 px-4 sm:px-6 rounded-full hover:bg-green-700 transition-colors w-full sm:w-auto"
          >
            Aceptar
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-xl max-w-5xl mx-auto w-full"
    >
      <h1 className="text-green-600 font-bold text-xl sm:text-2xl mb-6 uppercase tracking-wide text-center sm:text-left">
        Registro de usuarios:
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-4">
          {/* Nombre */}
          <div>
            <label className="block font-bold text-black text-sm sm:text-base">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base"
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-xs mt-1">{errors.name}</div>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block font-bold text-black  text-sm sm:text-base">
              Apellido <span className="text-red-500">*</span>
            </label>
            <input
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base"
            />
            {touched.last_name && errors.last_name && (
              <div className="text-red-500 text-xs mt-1">
                {errors.last_name}
              </div>
            )}
          </div>

          {/* DNI */}
          <div>
            <label className="block font-bold text-black  text-sm sm:text-base">
              DNI <span className="text-red-500">*</span>
            </label>
            <input
              name="dni"
              value={values.dni}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base"
            />
            {touched.dni && errors.dni && (
              <div className="text-red-500 text-xs mt-1">{errors.dni}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-bold text-black text-sm sm:text-base">
              Correo
            </label>
            <input
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block font-bold text-black  text-sm sm:text-base">
              Teléfono
            </label>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-bold text-black text-sm sm:text-base">
              Contraseña <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          {/* Imagen */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
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

          {/* Usuario */}
          <div>
            <label className="font-bold text-black">Usuario</label>
            <select
              name="ID_type_user"
              value={values.ID_type_user}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 ml-0 sm:ml-2 w-full sm:w-auto"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Operador</option>
            </select>
          </div>

          {/* Roles */}
          <div>
            <label className="font-bold text-black block mb-2">
              Especialidades (selecciona uno o más)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {specialties.map((r) => (
                <label
                  key={r.ID_specialty}
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
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-green-600 text-white font-bold py-2 px-6 rounded-full hover:bg-green-700 w-full sm:w-auto"
        >
          Registrar
        </button>
      </div>

      {authErrors.length > 0 && (
        <div className="mt-4">
          {authErrors.map((error, i) => (
            <div
              className="bg-red-600 text-white text-center py-1 rounded-md mb-2"
              key={i}
            >
              {error}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};
