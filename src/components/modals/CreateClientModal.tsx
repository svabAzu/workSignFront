import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClient: (values: { name: string; phone: string; company: string }) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  phone: Yup.string().required('El teléfono es requerido'),
  company: Yup.string().required('La compañía es requerida'),
});

export const CreateClientModal: React.FC<CreateClientModalProps> = ({ isOpen, onClose, onCreateClient }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      company: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onCreateClient(values);
      formik.resetForm();
      onClose();
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
      <div className="relative bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Nuevo Cliente</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex flex-col items-center justify-center">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mb-4 flex flex-col items-center justify-center">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Teléfono
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>
            ) : null}
          </div>

          <div className="mb-6 flex flex-col items-center justify-center">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1 text-center">
              Compañía
            </label>
            <input
              id="company"
              name="company"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
              className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {formik.touched.company && formik.errors.company ? (
              <div className="text-red-500 text-xs mt-1">{formik.errors.company}</div>
            ) : null}
          </div>

          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Crear Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
