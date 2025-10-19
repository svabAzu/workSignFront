import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeneralTask } from "../context/GeneralTaskContext";
import * as Yup from "yup";
import type { RegisterFormValues } from "../types";

export const OperatorEditPages = () => {
  const {
    operatorUsers,
    getOperatorUser,
    updateOperatorUser,
    updateOperatorUserState,
    getSpecialties,
    specialties,
  } = useGeneralTask();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [modalInfo, setModalInfo] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSpecialties();
    getOperatorUser();
  }, []);

  const handleDeactivate = async () => {
    if (selectedUserId === null) return;

    const confirmed = window.confirm(
      "¿Estás seguro de que quieres dar de baja a este usuario?"
    );

    if (confirmed) {
      try {
        await updateOperatorUserState(selectedUserId, false); // false = desactivado
        setModalInfo({
          show: true,
          title: "¡Éxito!",
          message: "Usuario dado de baja con éxito.",
          type: 'success',
        });
      } catch (error) {
        console.error(error);
        setModalInfo({
          show: true,
          title: "Error",
          message: "Error al dar de baja al usuario.",
          type: 'error',
        });
      }
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string().required("El nombre es obligatorio"),
    last_name: Yup.string().required("El apellido es obligatorio"),
    dni: Yup.string().required("El DNI es obligatorio"),
    email: Yup.string()
      .email("Email inválido")
      .required("El correo es obligatorio"),
    phone: Yup.string().required("El teléfono es obligatorio"),
    password: Yup.string().min(4, "Mínimo 4 caracteres"),
    specialties: Yup.array()
      .of(Yup.number())
      .min(1, "Selecciona al menos una especialidad"),
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
      ID_type_user: 2,
    },
    validationSchema: schema,

    onSubmit: async (formValues) => {
      if (selectedUserId === null) return;
      setLoading(true);
      console.log(formValues);

      try {
        const formData = new FormData();
        formData.append("name", formValues.name);
        formData.append("last_name", formValues.last_name);
        if (formValues.password) formData.append("password", formValues.password);
        formData.append("email", formValues.email);
        formData.append("phone", formValues.phone);
        formData.append("dni", formValues.dni);
        formData.append("ID_type_user", formValues.ID_type_user.toString());
        formData.append("specialties", JSON.stringify(formValues.specialties));

        if (formValues.avatar_url) {
          formData.append("avatar_url", formValues.avatar_url);
        }

        await updateOperatorUser(selectedUserId, formData);

        setModalInfo({
          show: true,
          title: "¡Éxito!",
          message: "Usuario actualizado con éxito.",
          type: 'success',
        });
        navigate(0)
      } catch (error) {
        console.error(error);
        setModalInfo({
          show: true,
          title: "Error",
          message: "Error al actualizar el usuario.",
          type: 'error',
        });

      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    setAvatarPreview(null);
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
            specialties: user.specialties?.map((s: any) => s.ID_specialty) || [],
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
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl max-w-5xl mx-auto w-full"
      >
        <h1 className="text-2xl mb-6 uppercase tracking-wide">
          EDITAR USUARIO:
        </h1>

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

        {selectedUserId && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  <img
                    src={avatarPreview || avatarUrl}
                    alt="preview"
                    className="object-cover w-full h-full"
                  />
                </div>
                
                <label
                  htmlFor="avatar_url"
                  className="bg-[#199431] text-white font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-[#ADC708] hover:text-black transition-colors text-sm"
                >
                  Seleccionar imagen
                </label>
                <input
                  type="file"
                  id="avatar_url"
                  name="avatar_url"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue("avatar_url", file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAvatarPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setFieldValue("avatar_url", null);
                      setAvatarPreview(null);
                    }
                  }}
                  onBlur={handleBlur}
                  className="hidden"
                />

                {/* Nombre del archivo si hay uno nuevo */}
                {values.avatar_url && (
                  <span className="text-gray-600 text-xs mt-1 truncate max-w-[200px]">
                    {values.avatar_url.name} seleccionada
                  </span>
                )}

                {/* Mostrar error si hay */}
                {touched.avatar_url && errors.avatar_url && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.avatar_url as string}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold mb-2">
                  Especialidades (selecciona uno o más)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {specialties.map((r: any) => (
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

        <div className="flex justify-between mt-6 md:col-span-2">
          <button
            type="submit"
            disabled={selectedUserId === null || loading}
            className="bg-[#199431] text-white py-2 px-6 rounded-full hover:bg-[#ADC708] hover:text-black disabled:bg-gray-400"
          >
            {loading ? "Guardando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={handleDeactivate}
            disabled={selectedUserId === null}
            className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 disabled:bg-gray-400"
          >
            Dar de baja
          </button>
        </div>
      </form>

      {modalInfo && modalInfo.show && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
            <h2 className={`text-xl sm:text-2xl font-bold ${modalInfo.type === 'success' ? 'text-green-600' : 'text-red-600'} mb-4`}>
              {modalInfo.title}
            </h2>
            <p className="mb-6 text-sm sm:text-base">
              {modalInfo.message}
            </p>
            <button
              onClick={() => {
                setModalInfo(null);
                if (modalInfo.type === 'success') {
                  resetForm();
                  setSelectedUserId(null);
                  setAvatarPreview(null);
                  getOperatorUser();
                }
              }}
              className={`${modalInfo.type === 'success' ? 'bg-[#199431] hover:bg-[#ADC708] hover:text-black' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-2 px-4 sm:px-6 rounded-full transition-colors w-full sm:w-auto`}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </>
  );
};