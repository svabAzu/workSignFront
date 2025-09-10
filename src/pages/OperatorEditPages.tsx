import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

interface User {
  id: number;
  name: string;
  last_name: string;
  password: string;
  email: string;
  phone: string;
  avatar_url?: string;
  specialties: number[];
  dni: string;
  ID_type_user: number;
}

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

export const EditUserForm = () => {
  const { authErrors } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    name: Yup.string().required("El nombre es obligatorio"),
    last_name: Yup.string().required("El apellido es obligatorio"),
    dni: Yup.string().required("El DNI es obligatorio"),
    email: Yup.string().email("Email inválido").required("El correo es obligatorio"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    password: Yup.string().min(4, "Mínimo 4 caracteres"),
    specialties: Yup.array().of(Yup.number()).min(1, "Selecciona al menos un rol"),
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
      ID_type_user: 1,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!selectedUserId) return;
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("last_name", values.last_name);
        if (values.password) formData.append("password", values.password);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("dni", values.dni);
        formData.append("ID_type_user", values.ID_type_user.toString());
        formData.append("specialties", JSON.stringify(values.specialties));

        if (values.avatar_url) {
          formData.append("avatar", values.avatar_url);
        }

        await axios.put(`/api/users/${selectedUserId}`, formData);
        alert("Usuario actualizado con éxito");
        navigate(0); // refrescar
      } catch (error) {
        console.error(error);
        alert("Error al actualizar el usuario");
      } finally {
        setLoading(false);
      }
    },
  });

  // Cargar usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  // Rellenar datos al seleccionar usuario
  useEffect(() => {
    if (!selectedUserId) {
      resetForm();
      return;
    }
    const user = users.find((u) => u.id === selectedUserId);
    if (user) {
      setFieldValue("name", user.name);
      setFieldValue("last_name", user.last_name);
      setFieldValue("email", user.email);
      setFieldValue("phone", user.phone);
      setFieldValue("dni", user.dni);
      setFieldValue("specialties", user.specialties || []);
      setFieldValue("ID_type_user", user.ID_type_user);
    }
  }, [selectedUserId, users]);

  const handleDelete = async () => {
    if (!selectedUserId) return;
    if (!confirm("¿Seguro que quieres dar de baja a este usuario?")) return;

    try {
      await axios.delete(`/api/users/${selectedUserId}`);
      alert("Usuario eliminado");
      setSelectedUserId("");
      navigate(0);
    } catch (error) {
      console.error(error);
      alert("Error al eliminar usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl max-w-5xl mx-auto w-full">
      <h1 className="text-green-600 font-bold text-2xl mb-6 uppercase tracking-wide">
        Editar Usuario
      </h1>

      {/* Selección de usuario */}
      <div className="mb-6">
        <label className="block font-bold mb-2">Seleccionar Usuario</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 w-full"
        >
          <option value="">-- Selecciona un usuario --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} {u.last_name}
            </option>
          ))}
        </select>
      </div>

      {/* Campos (igual que tu formulario original, con valores rellenados) */}
      {/* Nombre */}
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
            {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
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
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          {/* Avatar */}
          <div>
            <label className="block font-bold">Avatar</label>
            <input
              type="file"
              name="avatar_url"
              accept="image/*"
              onChange={(e) => setFieldValue("avatar_url", e.currentTarget.files?.[0] || null)}
            />
          </div>
          {/* Usuario */}
          <div>
            <label className="block font-bold">Tipo Usuario</label>
            <select
              name="ID_type_user"
              value={values.ID_type_user}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              <option value={1}>Administrador</option>
              <option value={2}>Operador</option>
            </select>
          </div>
          {/* Roles */}
          <div>
            <label className="block font-bold mb-2">Roles</label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <label key={r.id} className="flex items-center gap-2">
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
                          values.specialties.filter((id) => id !== r.id)
                        );
                      }
                    }}
                  />
                  {r.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          disabled={!selectedUserId || loading}
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700"
        >
          {loading ? "Guardando..." : "Editar"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!selectedUserId}
          className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700"
        >
          Dar de baja
        </button>
      </div>
    </form>
  );
};
