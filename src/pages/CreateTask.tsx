
import { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router-dom';
import { createTaskRequest } from '../api/Task';
import { useNewJob } from '../context/NewJobContext'; // Import the context hook
import { useGeneralTask } from '../context/GeneralTaskContext';
import { TaskCard } from '../components/card/TaskCard';
import { InfoModal } from '../components/modals/InfoModal';

export const CreateTask = () => {
  const { ID_general_tasks } = useParams();
  const { operators, materials } = useNewJob(); // Get operators and materials from context
  const { getTasksByGeneralTaskId, TasksByGeneralTaskId } = useGeneralTask();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', isSuccess: false });

  useEffect(() => {
    if (ID_general_tasks) {
      getTasksByGeneralTaskId(ID_general_tasks);
    }
  }, [ID_general_tasks, getTasksByGeneralTaskId]);

  console.log("Operators from context:", operators);
  const initialFormValues = {
    title: '',
    description: '',
    operators: [{ ID_users: '' }],
    materials: [{ ID_materials: '', observations: '' }],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('El nombre de la tarea es requerido'),
    description: Yup.string().required('La descripción es requerida'),
    operators: Yup.array()
      .of(
        Yup.object().shape({
          ID_users: Yup.string().required('Debe seleccionar un operario'),
        })
      )
      .min(1, 'Debe haber al menos un operario'),
    materials: Yup.array()
      .of(
        Yup.object().shape({
          ID_materials: Yup.string().required('Debe seleccionar un material'),
          observations: Yup.string().required('Las observaciones son requeridas'),
        })
      )
      .min(1, 'Debe haber al menos un material'),
  });

  const handleSubmit = async (values: typeof initialFormValues, { resetForm }: any) => {
    const payload = {
      ...values,
      ID_general_tasks: ID_general_tasks ? parseInt(ID_general_tasks, 10) : 1,
      assignment_date: new Date().toISOString(),
      ID_operator_task_states: 1, // Default state as per example
      operators: values.operators.map(op => ({
        ID_users: parseInt(op.ID_users),
        assignment_date: new Date().toISOString(),
        ID_operator_task_states: 1
      })),
      materials: values.materials.map(mat => ({
        ID_materials: parseInt(mat.ID_materials),
        observations: mat.observations,
      })),
    };

    console.log("Final payload:", JSON.stringify(payload, null, 2));

    try {
      await createTaskRequest(payload);
      setModalContent({ title: 'Éxito', message: 'Tarea creada exitosamente', isSuccess: true });
      setIsModalOpen(true);
      resetForm();
      if (ID_general_tasks) {
        getTasksByGeneralTaskId(ID_general_tasks);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setModalContent({ title: 'Error', message: 'Hubo un error al crear la tarea. Por favor, inténtelo de nuevo.', isSuccess: false });
      setIsModalOpen(true);
    }
  };


  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      <InfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        isSuccess={modalContent.isSuccess}
      />
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-6">CREAR TAREA</h1>

        <Formik
          initialValues={initialFormValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-bold text-gray-700">TAREA</label>
                  <Field id="title" name="title" type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-bold text-gray-700">DESCRIPCIÓN</label>
                  <Field as="textarea" id="description" name="description" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" />
                  <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              {/* --- OPERATORS --- */}
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">OPERARIOS</h2>
                <FieldArray
                  name="operators"
                  render={arrayHelpers => (
                    <div className="space-y-4">
                      {values.operators.map((operator, index) => {
                        const selectedOperatorData = operators.find(op => op.id === parseInt(operator.ID_users));
                        return (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 items-end p-4 bg-gray-50 rounded-lg">
                            <div className="col-span-2 grid grid-cols-2 gap-x-8">
                              <div>
                                <label htmlFor={`operators.${index}.ID_users`} className="block text-sm font-bold text-gray-700">OPERARIO</label>
                                <Field as="select" id={`operators.${index}.ID_users`} name={`operators.${index}.ID_users`} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                  <option value="">Seleccionar operario...</option>
                                  {operators.map(op => <option key={op.id} value={op.id}>{op.name}</option>)}
                                </Field>
                                <ErrorMessage name={`operators.${index}.ID_users`} component="div" className="text-red-500 text-xs mt-1" />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-700">ESPECIALIDAD</label>
                                <input type="text" readOnly value={selectedOperatorData?.specialty.name_specialty || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-full">
                                <label className="block text-sm font-bold text-gray-700">TAREAS ASIGNADAS</label>
                                <input type="text" readOnly value={`${selectedOperatorData?.tasks || 0} tareas`} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 text-center" />
                              </div>
                              <button type="button" onClick={() => arrayHelpers.remove(index)} className="p-2 bg-red-500 rounded-full self-end mb-1 hover:bg-red-600 transition">
                                <TrashIcon className="h-5 w-5 text-white" />
                              </button>
                              {index === values.operators.length - 1 && (
                                <button type="button" onClick={() => arrayHelpers.push({ ID_users: '' })} className="p-2 bg-green-500 rounded-full self-end mb-1 hover:bg-green-600 transition">
                                  <PlusIcon className="h-5 w-5 text-white" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </div>

              {/* --- MATERIALS --- */}
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h2 className="text-lg font-bold text-gray-800 mb-2">MATERIALES</h2>
                <FieldArray
                  name="materials"
                  render={arrayHelpers => (
                    <div className="space-y-4">
                      {values.materials.map((_material, index) => {
                        return (
                          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4 items-end p-4 bg-gray-50 rounded-lg">
                            <div className="col-span-2">
                              <div>
                                <label htmlFor={`materials.${index}.ID_materials`} className="block text-sm font-bold text-gray-700">MATERIAL</label>
                                <Field as="select" id={`materials.${index}.ID_materials`} name={`materials.${index}.ID_materials`} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                  <option value="">Seleccionar material...</option>
                                  {materials.map(mat => <option key={mat.id} value={mat.id}>{`${mat.name} - ${mat.type}`}</option>)}
                                </Field>
                                <ErrorMessage name={`materials.${index}.ID_materials`} component="div" className="text-red-500 text-xs mt-1" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-full">
                                <label htmlFor={`materials.${index}.observations`} className="block text-sm font-bold text-gray-700">OBSERVACIONES</label>
                                <Field as="textarea" id={`materials.${index}.observations`} name={`materials.${index}.observations`} rows={1} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 resize-none" />
                                <ErrorMessage name={`materials[${index}].observations`} component="div" className="text-red-500 text-xs" />
                              </div>
                              <button type="button" onClick={() => arrayHelpers.remove(index)} className="p-2 bg-red-500 rounded-full self-end mb-1 hover:bg-red-600 transition">
                                <TrashIcon className="h-5 w-5 text-white" />
                              </button>
                              {index === values.materials.length - 1 && (
                                <button type="button" onClick={() => arrayHelpers.push({ ID_materials: '', observations: '' })} className="p-2 bg-green-500 rounded-full self-end mb-1 hover:bg-green-600 transition">
                                  <PlusIcon className="h-5 w-5 text-white" />
                                </button>
                              )}
                            </div>
                          </div>);
                      })}
                    </div>
                  )}
                />
              </div>

              <div className="text-center mt-10 border-t border-gray-200 pt-6">
                <button
                  type="submit"
                  className="bg-green-600 text-white font-bold py-3 px-10 rounded-lg cursor-pointer hover:bg-green-700 transition"
                >
                  Completar y Crear Tarea
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">TAREAS CREADAS</h2>
          <article className="w-full max-w-7xl mx-auto h-auto mt-10">
            {/* Header for larger screens */}
            <div className="hidden md:flex items-center text-gray-500 font-bold px-4 py-2 border-b">
              <div className="w-2/5">Etapa</div>
              <div className="w-1/5">Operario</div>
              <div className="w-1/5 text-center">Estado</div>
              <div className="w-1/5 text-right">Fecha</div>
            </div>

            {TasksByGeneralTaskId && TasksByGeneralTaskId.map((task: any, index: number) => (
              <TaskCard key={task.ID_task} task={task} index={index} />
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};
