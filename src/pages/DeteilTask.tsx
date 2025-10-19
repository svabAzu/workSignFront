import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGeneralTask } from "../context/GeneralTaskContext";
import { Card } from "../components/card/Card";
import { IoMdClose } from "react-icons/io";
import { TaskCard } from "../components/card/TaskCard";
import { PlusIcon } from "@heroicons/react/24/solid";

export const DetailTask = () => {
  const { id } = useParams();
  const {
    getGeneralTaskById,
    individualTask,
    setIndividualTask,
    getTasksByGeneralTaskId,
    TasksByGeneralTaskId,
  } = useGeneralTask();

  // console.log("Esto viene del general tarea", individualTask);
  //console.log("esto viene de task", TasksByGeneralTaskId);

  useEffect(() => {
    if (id) {
      getGeneralTaskById(id);
      getTasksByGeneralTaskId(id);
      const interval = setInterval(() => {
        getGeneralTaskById(id);
        getTasksByGeneralTaskId(id);
      }, 10000); // refresca cada 10 segundos
      return () => clearInterval(interval);
    }
  }, [id]);

  const handleClose = () => {
    window.history.back();
    setIndividualTask(null);
  };

  return (
    <div className="flex flex-col items-center pt-8 w-full justify-center bg-[#F1F1F1]">
      <section className="w-[98%] min-h-[98dvh] my-4 rounded-4xl bg-white flex flex-col p-6 shadow-lg">
        {individualTask ? (
          <div>  
            <h1 className="text-2xl sm:text-3xl  text-[#199431] text-center sm:text-left" >TRABAJO EN PROCESO </h1>
            <article className="w-full flex flex-col md:flex-row justify-between items-start px-4 sm:px-6 md:px-8 lg:px-12 py-4">
               
             
              <div className="flex flex-col-reverse md:flex-row justify-between items-start w-full h-full">
               
                <div
                  className="w-full md:w-[100%]"
                  key={individualTask.ID_general_tasks}
                >
                  <Card generalTask={individualTask} />
                </div>

                
                <div className="w-full md:w-auto flex justify-end mb-4 md:mb-0">
                  <button
                    className="cursor-pointer p-2 rounded-full hover:bg-gray-200 transition"
                    onClick={handleClose}
                  >
                    <IoMdClose className="w-8 h-8 text-[#199431] hover:text-white" />
                  </button>
                </div>
              </div>
            </article>

            <main className="w-full mx-auto p-4 border-gray-300 rounded-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <section className="lg:col-span-2 space-y-4 pr-4 ">
                  <div>
                    <header className="text-lg font-bold uppercase mb-2">
                      DETALLE:
                    </header>
                    <div className="p-3 border border-gray-400 rounded-md bg-gray-50">
                      <p className="text-sm">{individualTask.description}</p>
                    </div>
                  </div>

                  <dl className="space-y-4">
                    {/* Materiales */}
                    <div>
                      <dt className="text-lg font-bold uppercase mb-2">
                        Materiales:
                      </dt>
                      <dd className="text-sm mb-1">
                        {TasksByGeneralTaskId &&
                        TasksByGeneralTaskId.flatMap(
                          (task) => task.materialsTasks
                        ).length > 0 ? (
                          TasksByGeneralTaskId.flatMap(
                            (task) => task.materialsTasks
                          ).map((material, index) => (
                            <div
                              key={index}
                              className="p-2 border-b last:border-b-0"
                            >
                              <p>
                                <span className="font-semibold">
                                  {material.material.name}
                                </span>
                              </p>
                              {material.observations && (
                                <p className="text-xs text-gray-600 pl-2">
                                  Observaciones: {material.observations}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p>No hay materiales asignados.</p>
                        )}
                      </dd>
                      <hr className="border-t border-[#199431] my-1" />
                    </div>

                    {/* Encargados */}
                    <div>
                      <dt className="text-lg font-bold uppercase mb-2">
                        Encargados:
                      </dt>
                      <dd className="text-sm mb-1">
                        {TasksByGeneralTaskId.flatMap((task: any) =>
                          task.taskOperators.map((operator: any) =>
                            operator.user && operator.user.name
                              ? operator.user.name
                              : "Sin asignar"
                          )
                        ).join(" - ")}
                      </dd>

                      <hr className="border-t border-[#199431] my-1" />
                    </div>
                  </dl>
                </section>

                {/* Columna de Observación */}
                <aside className="lg:col-span-1 lg:border-l lg:ml-5 border-t lg:border-t-0 border-gray-200 pt-4 lg:pt-0 lg:pl-4">
                  <div>
                    <header className="text-lg font-bold uppercase mb-2">
                      OBSERVACIÓN:
                    </header>
                    <div
                      className="p-3 min-h-30 w-[90%] border border-gray-400 rounded-md bg-gray-50"
                      role="alert"
                    >
                      {TasksByGeneralTaskId.flatMap((task: any) =>
                        task.taskOperators.map((operator: any) => {
                          if (operator.observations) {
                            return (
                              <p
                                key={`${task.ID_task}-${operator.ID_user}`}
                                className="text-sm font-bold text-red-700"
                              >
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

            <article className="w-full max-w-7xl mx-auto h-auto mt-10">
              {/* Header for larger screens */}
              <div className="hidden md:flex items-center text-gray-500 font-bold px-4 py-2 border-b">
                <div className="w-2/5">Etapa</div>
                <div className="w-1/5">Operario</div>
                <div className="w-1/5 text-center">Estado</div>
                <div className="w-1/5 text-right">Fecha</div>
              </div>

              {TasksByGeneralTaskId &&
                TasksByGeneralTaskId.map((task: any, index: number) => (
                  <TaskCard key={task.ID_task} task={task} index={index} />
                ))}
            </article>

            <div className="flex justify-center mt-6">
              <Link to={`/newJob/${id}/newTask`}>
                <button className="bg-[#199431] hover:bg-[#ADC708] hover:text-black text-white font-bold py-2 px-4 rounded-full">
                  <PlusIcon className="h-6 w-6" />
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p className="mt-10 text-gray-500 text-center">
            No se encotraron datos de la tarea.
          </p>
        )}
      </section>
    </div>
  );
};
