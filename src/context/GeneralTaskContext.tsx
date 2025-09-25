
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { getGeneralTaskRequest, getGeneralTaskIdRequest } from "../api/Generaltask";
import { getGeneralTaskStateRequest } from "../api/Generaltask";
import { 
    getSpecialtiesRequest,
    createSpecialtyRequest,
    updateSpecialtyRequest,
    deleteSpecialtyRequest
} from "../api/Specialties";
import { getOperatorUserRequest, putOperatorUserRequest } from "../api/OperatorUser";


interface GeneralTaskContextType {
    generalTask: any[];
    getGeneralTask: () => Promise<void>;
    generalTaskState: any[]; 
    getGeneralTaskState: () => Promise<void>;
    specialties: any[];
    getSpecialties: () => Promise<void>;
    addSpecialty: (specialty: { name: string }) => Promise<void>;
    updateSpecialty: (id: number, specialty: { name: string }) => Promise<void>;
    deleteSpecialty: (id: number) => Promise<void>;
    getOperatorUser: () => Promise<void>; 
    operatorUsers: any[];
    updateOperatorUser: (id: number, userData: FormData) => Promise<void>;
    individualTask: any;
    setIndividualTask: (task: any) => void;
    getGeneralTaskById: (id: any) => Promise<void>;
    }

const GeneralTaskContext = createContext<GeneralTaskContextType | null>(null);

export const useGeneralTask = () => {
    const context = useContext(GeneralTaskContext)

    if (!context) {
        throw new Error("useGeneralTask deberia estar dentro de un GeneralTaskProvider")
    }

    return context
}

export function GeneralTaskProvider({ children }: { children: ReactNode }) {
    const [generalTask, setGeneralTask] = useState([]);

    const [individualTask, setIndividualTask] = useState<any>(null);
    
    const [generalTaskState, setGeneralTaskState] = useState([]);
    const [specialties, setSpecialties] = useState([]); // Estado para almacenar las especialidades  
    const [operatorUsers, setOperatorUsers] = useState([]); // Estado para almacenar los usuarios operadores

    const getGeneralTask = async () => {
        try {
            const res = await getGeneralTaskRequest();
            setGeneralTask(res.data.data || []);
        } catch (error) {
            setGeneralTask([]);
        }
    };

    const getGeneralTaskById = async (id: any) => {
        try {
            const res = await getGeneralTaskIdRequest(id);
            setIndividualTask(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };


    const getGeneralTaskState = async () => {
        try {
            const res = await getGeneralTaskStateRequest(); 
            setGeneralTaskState(res.data.data || []);
        } catch (error) {
            setGeneralTaskState([]);
        }
    };

    //Peticiones de especialidades y usuarios
    const getSpecialties = async () => {
        try {
            const res = await getSpecialtiesRequest();
            setSpecialties(res.data.data || []);
        } catch (error) {
            setSpecialties([]);
        }
    };

    const addSpecialty = async (specialty: { name: string }) => {
        try {
            await createSpecialtyRequest(specialty);
            await getSpecialties(); // Refresh list
        } catch (error) {
            console.error("Error al agregar especialidad:", error);
        }
    };

    const updateSpecialty = async (id: number, specialty: { name: string }) => {
        try {
            await updateSpecialtyRequest(id, specialty);
            await getSpecialties(); // Refresh list
        } catch (error) {
            console.error("Error al actualizar especialidad:", error);
        }
    };

    const deleteSpecialty = async (id: number) => {
        try {
            await deleteSpecialtyRequest(id);
            await getSpecialties(); // Refresh list
        } catch (error) {
            console.error("Error al eliminar especialidad:", error);
        }
    };

    const getOperatorUser = async () => {
        try {
            const res = await getOperatorUserRequest();
            setOperatorUsers(res.data.data || []);
        } catch (error) {
            setOperatorUsers([]);
        }
    }

        const updateOperatorUser = async (id: number, userData: FormData) => {
            try {
                await putOperatorUserRequest(id, userData);
            await getOperatorUser(); 
        } catch (error) {
            console.error("Error al actualizar usuario operador", error);
        }
        };

    return (
        <GeneralTaskContext.Provider value={{
            generalTask,
            getGeneralTask,
            generalTaskState,
            getGeneralTaskState,
            getSpecialties,
            specialties,
            addSpecialty,
            updateSpecialty,
            deleteSpecialty,
            getOperatorUser,
            operatorUsers,
            updateOperatorUser,
            individualTask,
            setIndividualTask,
            getGeneralTaskById
        }}>
            {children}
        </GeneralTaskContext.Provider>
    );
}
