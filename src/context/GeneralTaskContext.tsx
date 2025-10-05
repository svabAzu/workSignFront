
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
import { getOperatorUserRequest, putOperatorUserRequest, deleteOperatorUserRequest } from "../api/OperatorUser";

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
    deleteOperatorUser: (id: number) => Promise<void>;
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
            await getSpecialties(); 
        } catch (error) {
            console.error("Error al agregar especialidad:", error);
        }
    };

    const updateSpecialty = async (id: number, specialty: { name: string }) => {
        try {
            await updateSpecialtyRequest(id, specialty);
            await getSpecialties(); 
        } catch (error) {
            console.error("Error al actualizar especialidad:", error);
        }
    };

    const deleteSpecialty = async (id: number) => {
        try {
            await deleteSpecialtyRequest(id);
            await getSpecialties(); 
        } catch (error) {
            console.error("Error al eliminar especialidad:", error);
        }
    };

    const getOperatorUser = async () => {
  try {
    const res = await getOperatorUserRequest();
    console.log("Respuesta del backend:", res.data.data);
    setOperatorUsers(res.data.data || []);
  } catch (error) {
    console.error("Error al cargar operadores", error);
    setOperatorUsers([]);
  }
};

   const updateOperatorUser = async (id: number, userData: FormData) => {
  try {
    await putOperatorUserRequest(id, userData);
    await getOperatorUser(); // vuelve a cargar la lista
  } catch (error) {
    console.error("Error al actualizar usuario operador", error);
  }
};

    const deleteOperatorUser = async (id: number) => {
        try {
            await deleteOperatorUserRequest(id);
            await getOperatorUser(); // Refresh the list
        } catch (error) {
            console.error("Error al eliminar usuario operador", error);
        }
    };

    //Peticion para obtener las tareas relacionadas a una tarea general
    const getTasksByGeneralTaskId = async (id: any) => {
        try {
            const res = await getTaskUssingGeneralTaskIdRequest(id);
            setTasksByGeneralTaskId(res.data.data || []);

        } catch (error) {
            console.error(error);
            setTasksByGeneralTaskId([]);
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
            deleteOperatorUser,
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
