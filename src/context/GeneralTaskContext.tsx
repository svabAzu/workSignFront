import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { getGeneralTaskRequest } from "../api/Generaltask";


interface GeneralTaskContextType {
    generalTask: any[];
    getGeneralTask: () => Promise<void>;
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
  

    const getGeneralTask = async () => {
        try {
            const res = await getGeneralTaskRequest();
            setGeneralTask(res.data.data || []);
        } catch (error) {
            setGeneralTask([]);
        }
    };


    return (
        <GeneralTaskContext.Provider value={{
            generalTask,
            getGeneralTask,
        }}>
            {children}
        </GeneralTaskContext.Provider>
    );
}