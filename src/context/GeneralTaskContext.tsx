import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { getGeneralTaskRequest } from "../api/Generaltask";
import { getGeneralTaskStateRequest } from "../api/Generaltask";


interface GeneralTaskContextType {
    generalTask: any[];
    getGeneralTask: () => Promise<void>;
    generalTaskState: any[]; 
    getGeneralTaskState: () => Promise<void>; 
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
    const [generalTaskState, setGeneralTaskState] = useState([]);  
  

    const getGeneralTask = async () => {
        try {
            const res = await getGeneralTaskRequest();
            setGeneralTask(res.data.data || []);
        } catch (error) {
            setGeneralTask([]);
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


    return (
        <GeneralTaskContext.Provider value={{
            generalTask,
            getGeneralTask,
            generalTaskState,
            getGeneralTaskState // Esta línea faltaba en el objeto original
        }}>
            {children}
        </GeneralTaskContext.Provider>
    );
}