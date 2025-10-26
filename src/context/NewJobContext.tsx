import {
    createContext,
    useState,
    useContext,
    useEffect,
    type ReactNode,
} from "react";
import { getJobAndTypeJobRequest, getClientRequest, postClientRequest } from "../api/NewJob";
import { createGeneralTaskRequest } from "../api/Generaltask";
import { getMaterialsAllRequest, getOperatorWorkloadRequest } from "../api/Task"; // Importar la nueva función
import { getOperatorUserRequest } from "../api/OperatorUser";
import { type OperatorWorkload } from "../types"; // Importar el nuevo tipo

// --- Interfaces ---
interface TypeJob {
    ID_type_job: number;
    name: string;
    estimated_duration: string;
}

interface Job {
    ID_jobs: number;
    name: string;
    description: string;
    typeJobs: TypeJob[];
}

interface Client {
    ID_Client: number;
    name: string;
    company: string;
    phone: string;
}

interface Operator {
    id: number;
    name: string;
    specialty: {
      name_specialty: string;
    };
    tasks: number;
}

interface Material {
    id: number;
    name: string;
    type: string; // Added type property
}

interface NewJobContextType {
    jobs: Job[];
    clients: Client[];
    operators: Operator[];
    materials: Material[];
    operatorWorkload: OperatorWorkload[]; // Añadir el nuevo estado al tipo
    loading: boolean;
    loadInitialData: () => Promise<void>;
    createGeneralTask: (task: any) => Promise<any>;
    createClient: (client: any) => Promise<void>;
}

interface NewJobProviderProps {
    children: ReactNode;
}

// --- Contexto de React ---
export const NewJobContext = createContext<NewJobContextType | null>(null);

export const useNewJob = () => {
    const context = useContext(NewJobContext);
    if (!context) {
        throw new Error("useNewJob debe estar dentro de un NewJobProvider");
    }
    return context;
};

// --- Provider del Contexto ---
export const NewJobProvider = ({ children }: NewJobProviderProps) => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [operators, setOperators] = useState<Operator[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [operatorWorkload, setOperatorWorkload] = useState<OperatorWorkload[]>([]); // Nuevo estado
    const [loading, setLoading] = useState<boolean>(true);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            // Cargar todos los datos en paralelo
            const [jobsRes, clientsRes, operatorsRes, materialsRes, workloadRes] = await Promise.all([
                getJobAndTypeJobRequest(),
                getClientRequest(),
                getOperatorUserRequest(),
                getMaterialsAllRequest(),
                getOperatorWorkloadRequest(), // Llamar a la nueva función
            ]);

            setJobs(jobsRes.data.data || []);
            setClients(clientsRes.data.data || []);
            setOperatorWorkload(workloadRes.data || []); // Guardar los datos de carga de trabajo

            // Transform and set operators
            const operatorData = (operatorsRes.data.data || [])
              .filter((user: any) => user.ID_type_user === 2) // Filter for operators
              .map((user: any) => {
                const specialtyNames = (user.specialties && user.specialties.length > 0)
                    ? user.specialties.map((spec: any) => spec.name).join(', ')
                    : 'N/A';

                return {
                    id: user.ID_users,
                    name: user.name,
                    specialty: { name_specialty: specialtyNames },
                    tasks: user.tasks_count || 0, // This field is not in the response, will default to 0
                };
            });
            setOperators(operatorData);

            // Transform and set materials
            const materialsData = (materialsRes.data.data || []).map((mat: any) => ({
                id: mat.ID_materials,
                name: mat.name,
                type: mat.type || 'N/A', // Added type property, defaults to N/A
            }));
            setMaterials(materialsData);

        } catch (error) {
            console.error("Error fetching initial data:", error);
            setJobs([]);
            setClients([]);
            setOperators([]);
            setMaterials([]);
            setOperatorWorkload([]); // Limpiar en caso de error
        } finally {
            setLoading(false);
        }
    };

    const createGeneralTask = async (task: any) => {
        try {
            const res = await createGeneralTaskRequest(task);
            return res;
        } catch (error) {
            console.error("Error al crear la tarea general", error);
            throw error; // Re-throw the error to be caught in the component
        }
    };

    const createClient = async (client: any) => {
        try {
            await postClientRequest(client);
            // Después de crear, recargar la lista de clientes para mantenerla actualizada
            const clientsRes = await getClientRequest();
            setClients(clientsRes.data.data || []);
        } catch (error) {
            console.error("Error al crear el cliente", error);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    return (
        <NewJobContext.Provider value={{
            jobs,
            clients,
            operators,
            materials,
            operatorWorkload, // Exponer el nuevo estado
            loading,
            loadInitialData,
            createGeneralTask,
            createClient
        }}>
            {children}
        </NewJobContext.Provider>
    );
};