import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGeneralTask } from "../context/GeneralTaskContext";
import { Card } from "../components/card/Card";
import { IoMdClose } from "react-icons/io";

export const DetailTask = () => {
    const { id } = useParams();
    const { getGeneralTaskById, individualTask, setIndividualTask } = useGeneralTask();

    useEffect(() => {
        if (id) {
            getGeneralTaskById(id);
        }
    }, [id]);

  
    const handleClose = () => {
        window.history.back();
        setIndividualTask(null);
    }


    return (
        <div className="flex flex-col items-center pt-8 w-full justify-center bg-[#F1F1F1]">
            <section className="w-[98%] max-w-7xl mx-auto h-auto rounded-3xl min-h-[90dvh] bg-white flex flex-col p-4 sm:p-6 shadow-lg">
                <article className="w-full max-w-7xl mx-auto h-auto">

                    {individualTask ?
                        <div className="flex flex-col items-start gap-4 md:gap-0 md:flex-row justify-center md:justify-between">
                            <div className="w-[70%]" key={individualTask.ID_general_tasks}>
                                <Card generalTask={individualTask} />
                            </div>
                            <div>
                                <button className="cursor-pointer" onClick={handleClose}><IoMdClose className="w-8 h-8 text-[#199431]  hover:text-black"/></button>
                            </div>
                        </div>
                        :
                        <p className="mt-10 text-gray-500 text-center">
                            No se encotraron datos de la tarea.
                        </p>
                    }
                </article>

            </section>
        </div>
    );
};