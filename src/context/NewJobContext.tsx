import {
    createContext,
    useState,
    useContext,
    useEffect,
    type ReactNode,
} from "react";
import { getJobAndTypeJobRequest, getClientRequest } from "../api/NewJob";

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
    // Agrega aquí otras propiedades del cliente si las hay
}

interface NewJobContextType {
    jobs: Job[];
    clients: Client[];
    loading: boolean;
    loadInitialData: () => Promise<void>;
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
    const [loading, setLoading] = useState<boolean>(true);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            // Cargar trabajos y clientes en paralelo
            const [jobsRes, clientsRes] = await Promise.all([
                getJobAndTypeJobRequest(),
                getClientRequest(),
            ]);

            setJobs(jobsRes.data.data || []);
            setClients(clientsRes.data.data || []); // Asumiendo que los clientes también vienen en .data.data

        } catch (error) {
            console.error("Error fetching initial data:", error);
            setJobs([]);
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    return (
        <NewJobContext.Provider value={{
            jobs,
            clients,
            loading,
            loadInitialData
        }}>
            {children}
        </NewJobContext.Provider>
    );
};