import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralTask } from "../context/GeneralTaskContext";
import * as Yup from "yup";

export const OperatorEditPages = () => {
  const {
    operatorUsers,
    getOperatorUser, // trae TODOS los operadores desde /user/operators/all
    updateOperatorUser,
    deleteOperatorUser,
    getSpecialties,
    specialties,
  } = useGeneralTask();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Trae especialidades y usuarios al montar
  useEffect(() => {
    getSpecialties();
    getOperatorUser();
  }, []);

  const handleDelete = async () => {
    if (selectedUserId === null) return;

    const confirmed = window.confirm(
      "¿Estás seguro de que quieres dar de baja a este usuario?"
    );

    if (confirmed) {
      try {
        await deleteOperatorUser(selectedUserId);
        alert("Usuario dado de baja con éxito");
        setSelectedUserId(null); // Limpiar selección
      } catch (error) {
        console.error(error);
        alert("Error al dar de baja al usuario");
      }
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    last_name: Yup.string().required("El apellido es obligatorio"),
    dni: Yup.string().required("El DNI es obligatorio"),
    email: Yup.string().email("Email inválido").required("El correo es obligatorio"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    password: Yup.string().min(4, "Mínimo 4 caracteres"),
    specialties: Yup.array().of(Yup.number()).min(1, "Selecciona al menos una especialidad"),
    ID_type_user: Yup.number().required("El tipo de usuario es obligatorio"),
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
      ID_type_user: 2, // Operador
    },
    validationSchema: schema,

    onSubmit: async (formValues) => {
      if (selectedUserId === null) return;
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("last_name", formValues.last_name);
        if (formValues.password)
          formData.append("password", formValues.password);
        formData.append("email", formValues.email);
        formData.append("phone", formValues.phone);
        formData.append("dni", formValues.dni);
        formData.append("ID_type_user", formValues.ID_type_user.toString());
        formData.append("specialties", JSON.stringify(formValues.specialties));

        if (formValues.avatar_url) {
          formData.append("avatar", formValues.avatar_url);
        }

        await updateOperatorUser(selectedUserId, formData);
        alert("Usuario actualizado con éxito");
        navigate(0);
      } catch (error) {
        console.error(error);
        alert("Error al actualizar el usuario");
      } finally {
        setLoading(false);
      }
    },
  });

  // Cuando se selecciona un usuario del select, se llenan los datos del formulario
  useEffect(() => {
    if (selectedUserId) {
      const user = operatorUsers.find((u) => u.ID_users === selectedUserId);
      if (user) {
        resetForm({
          values: {
            name: user.name || "",
            last_name: user.last_name || "",
            dni: user.dni || "",
            email: user.email || "",
            phone: user.phone || "",
            password: "",
            specialties: user.specialties?.map((s) => s.ID_specialty) || [],
            ID_type_user: user.ID_type_user || 2,
            avatar_url: null,
          },
        });
      }
    }
  }, [selectedUserId]);

  const avatarUrl =
    selectedUserId &&
    operatorUsers.find((u) => u.ID_users === selectedUserId)?.avatar_url
      ? `${import.meta.env.VITE_API_URL}/${
          operatorUsers.find((u) => u.ID_users === selectedUserId)?.avatar_url
        }`
      : "/iconos/default-avatar.png";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl max-w-5xl mx-auto w-full"
    >
      <h1 className="text-green-600 font-bold text-2xl mb-6 uppercase tracking-wide">
        Editar Usuario
      </h1>

      {/* Selección de usuario */}
      <div className="mb-6">
        <label className="block font-bold mb-2">Seleccionar Usuario</label>
        <select
          value={selectedUserId ?? ""}
          onChange={(e) =>
            setSelectedUserId(e.target.value ? Number(e.target.value) : null)
          }
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">-- Selecciona un usuario --</option>
          {Array.isArray(operatorUsers) &&
            operatorUsers.map((u) => (
              <option key={u.ID_users} value={u.ID_users}>
                {u.name} {u.last_name}
              </option>
            ))}
        </select>
      </div>

      {/* Campos del formulario */}
      {selectedUserId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-bold">Nombre</label>
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {touched.name && errors.name && (
                <p className="text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block font-bold">Apellido</label>
              <input
                name="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {touched.last_name && errors.last_name && (
                <p className="text-red-500">{errors.last_name}</p>
              )}
            </div>

            <div>
              <label className="block font-bold">DNI</label>
              <input
                name="dni"
                value={values.dni}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {touched.dni && errors.dni && (
                <p className="text-red-500">{errors.dni}</p>
              )}
            </div>

            <div>
              <label className="block font-bold">Correo</label>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block font-bold">Teléfono</label>
              <input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block font-bold">Contraseña</label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Deja vacío si no quieres cambiarla"
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {touched.password && errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <img
                  src={avatarUrl}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
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

            {/* Especialidades */}
            <div>
              <label className="block font-bold mb-2">
                Especialidades (selecciona uno o más)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {specialties.map((r) => (
                  <label
                    key={r.ID_specialty}
                    className="flex items-center gap-2 border border-gray-300 rounded-md p-2 bg-gray-100 hover:bg-green-100 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={r.ID_specialty}
                      checked={values.specialties.includes(r.ID_specialty)}
                      onChange={(e) => {
                        const specialtyId = Number(e.target.value);
                        if (e.target.checked) {
                          setFieldValue("specialties", [
                            ...values.specialties,
                            specialtyId,
                          ]);
                        } else {
                          setFieldValue(
                            "specialties",
                            values.specialties.filter((id) => id !== specialtyId)
                          );
                        }
                      }}
                    />
                    {r.name}
                  </label>
                ))}
              </div>
              {touched.specialties && errors.specialties && (
                <p className="text-red-500">{errors.specialties}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          disabled={selectedUserId === null || loading}
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
        >
          {loading ? "Guardando..." : "Editar"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={selectedUserId === null}
          className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700"
        >
          Dar de baja
        </button>
      </div>
    </form>
  );
};
