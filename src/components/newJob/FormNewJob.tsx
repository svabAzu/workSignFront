import { useFormik } from "formik";
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import * as Yup from "yup";
import React from "react";
import { useNewJob } from "../../context/NewJobContext";

// --- Interfaces y Configuración ---
interface NewJobFormValues {
    title: string;
    description: string;
    client: string;
    sketch_url: File | null;
    job: string;
    type_job: string;
    time: string;
    due_date: string;
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required("El título es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    client: Yup.string().required("El cliente es obligatorio"),
    job: Yup.string().required("El trabajo es obligatorio"),
    type_job: Yup.string().required("El tipo de trabajo es obligatorio"),
    due_date: Yup.string().required("La fecha es obligatoria"),
    time: Yup.string().required("El tiempo es obligatorio"),
});

// --- Componentes Auxiliares ---
const FieldGroup = ({ label, children, className = '', error }: { label: string, children: React.ReactNode, className?: string, error?: string }) => (
    <div className={`flex flex-col ${className}`}>
        <label className="text-xs font-bold uppercase text-black mb-1">
            {label}
        </label>
        <div>{children}</div>
        {error && <span className="text-red-500 text-xs mt-1">({error})</span>}
    </div>
);

const StyledSelect = ({ name, value, onChange, onBlur, children, disabled = false }: { name: string, value: string, onChange: (e: React.ChangeEvent<any>) => void, onBlur: (e: React.FocusEvent<any>) => void, children: React.ReactNode, disabled?: boolean }) => (
    <div className="relative">
        <select
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className="appearance-none border border-gray-300 rounded-sm p-2 w-full text-sm bg-white cursor-pointer focus:ring-green-500 focus:border-green-500 pr-8 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
            {children}
        </select>
        <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
);

// --- Componente Principal del Formulario ---
export const FormNewJob = () => {
    const { jobs, clients, loading } = useNewJob();

    const formik = useFormik<NewJobFormValues>({
        initialValues: { title: "", description: "", client: "", sketch_url: null, job: "", type_job: "", time: "", due_date: "" },
        validationSchema: validationSchema,
        onSubmit: async (formValues) => { console.log("Formulario enviado:", formValues); },
    });

    const [typeJobOptions, setTypeJobOptions] = React.useState<any[]>([]);

    React.useEffect(() => {
        const selectedJob = jobs.find(j => j.name === formik.values.job);
        setTypeJobOptions(selectedJob ? selectedJob.typeJobs : []);
        formik.setFieldValue('type_job', '');
        formik.setFieldValue('time', '');
    }, [formik.values.job, formik.setFieldValue, jobs]);

    React.useEffect(() => {
        const selectedTypeJob = typeJobOptions.find(tj => tj.name === formik.values.type_job);
        formik.setFieldValue('time', selectedTypeJob ? selectedTypeJob.estimated_duration : '');
    }, [formik.values.type_job, typeJobOptions, formik.setFieldValue]);

    return (
        <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-6xl mx-auto">
            <fieldset disabled={loading} className="disabled:opacity-75 disabled:cursor-wait">
                {/* FILA 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-1">
                        <FieldGroup label="TITULO" error={formik.touched.title && formik.errors.title ? formik.errors.title : undefined}>
                            <input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border border-gray-300 rounded-sm p-2 w-full text-sm" placeholder="Ej: Rótulo para local" />
                        </FieldGroup>
                    </div>
                    <div className="lg:col-span-1">
                        <FieldGroup label="TRABAJOS" error={formik.touched.job && formik.errors.job ? formik.errors.job : undefined}>
                            <StyledSelect name="job" value={formik.values.job} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                <option value="">Seleccionar</option>
                                {jobs.map(job => <option key={job.ID_jobs} value={job.name}>{job.name}</option>)}
                            </StyledSelect>
                        </FieldGroup>
                    </div>
                    <div className="lg:col-span-1">
                        <FieldGroup label="ESPECIFICO" error={formik.touched.type_job && formik.errors.type_job ? formik.errors.type_job : undefined}>
                            <StyledSelect name="type_job" value={formik.values.type_job} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={!formik.values.job}>
                                <option value="">Seleccionar</option>
                                {typeJobOptions.map(tj => <option key={tj.ID_type_job} value={tj.name}>{tj.name}</option>)}
                            </StyledSelect>
                        </FieldGroup>
                    </div>
                    <div className="lg:col-span-1">
                        <FieldGroup label="TIEMPO ESPERADO" error={formik.touched.time && formik.errors.time ? formik.errors.time : undefined}>
                            <input type="text" name="time" value={formik.values.time} readOnly className="border border-gray-300 rounded-sm p-2 w-full text-sm bg-gray-100 text-gray-700 font-medium text-center" placeholder="Automático" />
                        </FieldGroup>
                    </div>
                </div>

                <div className="border-t border-gray-300 my-4"></div>

                {/* FILA 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                        <FieldGroup label="DESCRIPCIÓN" error={formik.touched.description && formik.errors.description ? formik.errors.description : undefined}>
                            <textarea name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} rows={5} className="border border-gray-300 rounded-sm p-2 w-full text-sm resize-none" placeholder="Añade detalles sobre el trabajo..." />
                        </FieldGroup>
                    </div>
                    <div className="lg:col-span-2">
                        <FieldGroup label="FECHA DE ENTREGA" error={formik.touched.due_date && formik.errors.due_date ? formik.errors.due_date : undefined}>
                            <input type="date" name="due_date" value={formik.values.due_date} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border border-gray-300 rounded-sm p-2 w-full text-sm" />
                        </FieldGroup>
                    </div>
                </div>

                <div className="border-t border-gray-300 my-4"></div>

                {/* FILA 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                    <div className="lg:col-span-2">
                        <FieldGroup label="CLIENTE" error={formik.touched.client && formik.errors.client ? formik.errors.client : undefined}>
                            <div className="flex items-center gap-2">
                                <div className="flex-grow">
                                    <StyledSelect name="client" value={formik.values.client} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                        <option value="">Seleccionar cliente</option>
                                        {clients.map((client) => <option key={client.ID_Client} value={client.name}>{client.name}</option>)}
                                    </StyledSelect>
                                </div>
                                <button type="button" className="w-9 h-9 flex items-center justify-center bg-green-500 rounded-full hover:bg-green-600 transition duration-150 p-1">
                                    <PlusIcon className="h-5 w-5 text-white" />
                                </button>
                            </div>
                        </FieldGroup>
                    </div>
                    <div className="lg:col-span-2">
                        <label className="bg-white text-black text-sm border border-gray-300 py-2 px-4 rounded-sm cursor-pointer hover:bg-gray-50 transition duration-150 flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                                {formik.values.sketch_url ? <img src={URL.createObjectURL(formik.values.sketch_url)} alt="Boceto" className="object-cover w-full h-full" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">Boceto</div>}
                            </div>
                            <span>Seleccionar archivo</span>
                            <input type="file" name="sketch_url" accept="image/*" onChange={(e) => formik.setFieldValue("sketch_url", e.currentTarget.files?.[0] || null)} className="hidden" />
                        </label>
                    </div>
                </div>

                {/* BOTÓN DE ENVÍO */}
                <div className="flex justify-center mt-8">
                    <button type="submit" className="bg-green-600 text-white font-bold py-2 px-8 rounded-sm hover:bg-green-700 transition duration-150 text-base">Siguiente</button>
                </div>
            </fieldset>
        </form>
    );
};

export const FormMaterials = () => { return <></>; };
export const FormEditJob = () => { return <></>; };
