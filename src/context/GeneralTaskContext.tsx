
import type { ReactNode } from "react";
import {
    createContext, useContext, useState, useCallback,
} from "react";
import { getGeneralTaskRequest, getGeneralTaskIdRequest } from "../api/Generaltask";
import { getGeneralTaskStateRequest, updateGeneralTaskStateRequest } from "../api/Generaltask";
import {
    getSpecialtiesRequest,
    createSpecialtyRequest,
    updateSpecialtyRequest,
    deleteSpecialtyRequest
} from "../api/Specialties";
import { getOperatorUserRequest, putOperatorUserRequest, updateOperatorUserStateRequest } from "../api/OperatorUser";

import { getTaskUssingGeneralTaskIdRequest } from "../api/Task";


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
    updateOperatorUserState: (id: number, state: boolean) => Promise<void>;
    updateGeneralTaskState: (id: number, ID_general_task_states: number) => Promise<void>;
    individualTask: any;
    setIndividualTask: (task: any) => void;
    getTasksByGeneralTaskId: (id: any) => Promise<void>;
    TasksByGeneralTaskId: any[];
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
    const [TasksByGeneralTaskId, setTasksByGeneralTaskId] = useState([]); // Estado para almacenar las tareas relacionadas a una tarea general

    //Peticiones de tareas generales y estados

    const getGeneralTask = useCallback(async () => {
        try {
            const res = await getGeneralTaskRequest();
            setGeneralTask(res.data.data || []);
        } catch (error) {
            setGeneralTask([]);
        }
    }, []);

    const getGeneralTaskById = useCallback(async (id: any) => {
        try {
            const res = await getGeneralTaskIdRequest(id);
            setIndividualTask(res.data.data);
        } catch (error) {
            console.error(error);
        }
    }, []);


    const getGeneralTaskState = useCallback(async () => {
        try {
            const res = await getGeneralTaskStateRequest();
            setGeneralTaskState(res.data.data || []);
        } catch (error) {
            setGeneralTaskState([]);
        }
    }, []);

     // Cambia el estado de una tarea general
    const updateGeneralTaskState = useCallback(async (id: number, ID_general_task_states: number) => {
        try {
            await updateGeneralTaskStateRequest(id, ID_general_task_states);
            await getGeneralTask();
        } catch (error) {
            console.error("Error al actualizar el estado de la tarea general", error);
        }
    }, [getGeneralTask]);

    //Peticiones de especialidades y usuarios
    const getSpecialties = useCallback(async () => {
        try {
            const res = await getSpecialtiesRequest();
            setSpecialties(res.data.data || []);
        } catch (error) {
            setSpecialties([]);
        }
    }, []);

    const addSpecialty = useCallback(async (specialty: { name: string }) => {
        try {
            await createSpecialtyRequest(specialty);
            await getSpecialties(); 
        } catch (error) {
            console.error("Error al agregar especialidad:", error);
        }
    }, [getSpecialties]);

    const updateSpecialty = useCallback(async (id: number, specialty: { name: string }) => {
        try {
            await updateSpecialtyRequest(id, specialty);
            await getSpecialties(); 
        } catch (error) {
            console.error("Error al actualizar especialidad:", error);
        }
    }, [getSpecialties]);

    const deleteSpecialty = useCallback(async (id: number) => {
        try {
            await deleteSpecialtyRequest(id);
            await getSpecialties(); 
        } catch (error) {
            console.error("Error al eliminar especialidad:", error);
        }
    }, [getSpecialties]);

    const getOperatorUser = useCallback(async () => {
        try {
            const res = await getOperatorUserRequest();
            setOperatorUsers(res.data.data || []);
        } catch (error) {
            console.error("Error al cargar operadores", error);
            setOperatorUsers([]);
        }
    }, []);

   const updateOperatorUser = useCallback(async (id: number, userData: FormData) => {
        try {
            await putOperatorUserRequest(id, userData);
            await getOperatorUser(); // vuelve a cargar la lista
        } catch (error) {
            console.error("Error al actualizar usuario operador", error);
        }
    }, [getOperatorUser]);

    const updateOperatorUserState = useCallback(async (id: number, state: boolean) => {
        try {
            await updateOperatorUserStateRequest(id, state);
            await getOperatorUser(); // Refresh the list
        } catch (error) {
            console.error("Error al actualizar estado del usuario operador", error);
        }
    }, [getOperatorUser]);

    //Peticion para obtener las tareas relacionadas a una tarea general
    const getTasksByGeneralTaskId = useCallback(async (id: any) => {
        try {
            const res = await getTaskUssingGeneralTaskIdRequest(id);
            setTasksByGeneralTaskId(res.data.data || []);

        } catch (error) {
            console.error(error);
            setTasksByGeneralTaskId([]);
        }
    }, []);



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
            updateOperatorUserState,
            updateGeneralTaskState,
            individualTask,
            setIndividualTask,
            getGeneralTaskById,
            getTasksByGeneralTaskId,
            TasksByGeneralTaskId,
        }}>
            {children}
        </GeneralTaskContext.Provider>
    );
}
