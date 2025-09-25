import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGeneralTask } from "../context/GeneralTaskContext";
import { Card } from "../components/card/Card";
import { IoMdClose } from "react-icons/io";

export const DetailTask = () => {
    const { id } = useParams();
    const { getGeneralTaskById, individualTask,
        setIndividualTask,
        getTasksByGeneralTaskId,
        TasksByGeneralTaskId
    } = useGeneralTask();


    console.log("Esto viene del general tarea",individualTask);
        console.log("esto viene de task",TasksByGeneralTaskId);


    useEffect(() => {
        if (id) {
            getGeneralTaskById(id);
            getTasksByGeneralTaskId(id)
        }
    }, [id]);


    const handleClose = () => {
        window.history.back();
        setIndividualTask(null);
    }


    return (
        <div className="flex flex-col items-center pt-8 w-full justify-center bg-[#F1F1F1]">
            <section className="w-[98%] max-w-7xl mx-auto h-auto rounded-3xl min-h-[90dvh] bg-white flex flex-col p-4 sm:p-6 shadow-lg">
                {individualTask ?
                    <div>

                        <article className="w-full max-w-7xl mx-auto h-auto">

                            <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-start">
                                <div className="w-full md:w-[70%]" key={individualTask.ID_general_tasks}>
                                    <Card generalTask={individualTask} />
                                </div>
                                <div className="w-full md:w-auto flex justify-end">
                                    <button className="cursor-pointer" onClick={handleClose}><IoMdClose className="w-8 h-8 text-[#199431] hover:text-black" /></button>
                                </div>
                            </div>

                        </article>

                        <main className="w-full mx-auto p-4 border-gray-300 rounded-lg" >

                            <div className="grid grid-cols-3 gap-4">


                                <section className="col-span-2 space-y-4 pr-4 ">


                                    <div>
                                        <header className="text-lg font-bold uppercase mb-2">DETALLE:</header>
                                        <div className="p-3 border border-gray-400 rounded-md bg-gray-50">
                                            <p className="text-sm">
                                                {individualTask.description}
                                            </p>
                                        </div>
                                    </div>


                                    <dl className="space-y-4">
                                        {/* Materiales */}
                                        <div>
                                            <dt className="text-lg font-bold uppercase mb-2">Materiales:</dt>
                                            <dd className="text-sm mb-1">
                                              <div>Esto es para acordarme de hablar con azu con el diseño diciendole que esta parte es para las tareas individuales y no para la general, que deberiamos mover este apartado a otro lado</div>
                                            </dd>
                                            <hr className="border-t border-green-600 my-1" />
                                        </div>

                                        {/* Encargados */}
                                        <div>
                                            <dt className="text-lg font-bold uppercase mb-2">Encargados:</dt>
                                            <dd className="text-sm mb-1">
                                                {TasksByGeneralTaskId.flatMap((task: any) =>
                                                    task.taskOperators.map((operator: any) => (operator.user && operator.user.name) ? operator.user.name : 'Sin asignar')
                                                ).join(' - ')}
                                            </dd>
                                    
                                            <hr className="border-t border-green-600 my-1" />
                                        </div>
                                    </dl>
                                </section>

                                {/* Columna de Observación */}
                                <aside className="col-span-1 border-l ml-5 border-gray-200 pl-4">
                                    <div>
                                        <header className="text-lg font-bold uppercase mb-2">OBSERVACIÓN:</header>
                                        <div className="p-3 border border-gray-400 rounded-md bg-gray-50" role="alert">
                                            {TasksByGeneralTaskId.flatMap((task: any) =>
                                                task.taskOperators.map((operator: any) => {
                                                    if (operator.observations) {
                                                        return (
                                                            <p key={`${task.ID_task}-${operator.ID_user}`} className="text-sm font-bold text-red-700">
                                                                🔴{operator.observations}
                                                            </p>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            )}
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </main>
                    </div>
                    :
                    <p className="mt-10 text-gray-500 text-center">
                        No se encotraron datos de la tarea.
                    </p>
                }
            </section>
        </div>
    );
};