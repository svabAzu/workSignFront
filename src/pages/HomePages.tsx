import Card, { getTaskPriority } from "../components/card/Card";
import { useState, useEffect, useMemo } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useGeneralTask } from "../context/GeneralTaskContext";

export const HomePages = () => {
    const handleSearchChange = (e: any) => {
        setBusqueda(e.target.value);
    };

    const [busqueda, setBusqueda] = useState("");
    const [sortOrder, setSortOrder] = useState<'none' | 'desc' | 'asc'>('none');
    const [selectedStateId, setSelectedStateId] = useState<string>(''); // '' para "Todos"

    const { generalTask, getGeneralTask, generalTaskState, getGeneralTaskState } = useGeneralTask();

    console.log(generalTask);
    console.log(generalTaskState);


    useEffect(() => {
        getGeneralTask();
        getGeneralTaskState();
    }, []);

    const handleSortByPriority = () => {
        setSortOrder(prevOrder => {
            if (prevOrder === 'none' || prevOrder === 'asc') {
                return 'desc'; // Ordenar de más a menos urgente
            }
            return 'asc'; // Invertir orden (de menos a más urgente)
        });
    };

    const handleStateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStateId(e.target.value);
    };

    const processedTasks = useMemo(() => {
        if (!Array.isArray(generalTask)) {
            return [];
        }

        let filteredTasks = [...generalTask];

        // 1. Filtrar por estado
        if (selectedStateId) {
            filteredTasks = filteredTasks.filter(task =>
                task.generalTaskState?.ID_general_task_states.toString() === selectedStateId
            );
        }

        // 2. Filtrar por búsqueda de cliente
        if (busqueda) {
            filteredTasks = filteredTasks.filter(task =>
                task.client?.name.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        // 3. Ordenar por prioridad
        if (sortOrder !== 'none') {
            return filteredTasks.sort((a, b) => {
            const priorityA = getTaskPriority(a.creation_date, a.estimated_delivery_date);
            const priorityB = getTaskPriority(b.creation_date, b.estimated_delivery_date);
                return sortOrder === 'desc' ? priorityB - priorityA : priorityA - priorityB;
            });
        }
        return filteredTasks;
    }, [generalTask, sortOrder, selectedStateId, busqueda]);

    return (
        <div className="flex flex-col items-start w-[100%]  justify-center pt-8 bg-[#F1F1F1]">



            <section className="w-[98%] h-auto my-4 rounded-4xl min-h-[98dvh] bg-white  items-center flex flex-col p-6 shadow-lg">
                <nav className=" bg-custom-blue w-full h-20 flex rounded-b-2xl justify-between items-center px-5">
                    <div>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="search"
                                placeholder="Buscar..."
                                value={busqueda}
                                onChange={handleSearchChange}
                                className="border border-gray-200 p-2 rounded w-52 mr-10"
                            />
                        </form>
                    </div>
                    <div>
                        <button
                            onClick={handleSortByPriority}
                            className="flex items-center justify-center rounded-4xl pl-5 bg-[#199431] text-white font-bold"
                        >
                            Prioridad {sortOrder === 'desc' ? (
                                <MdArrowDropUp className="w-8 h-8" />
                            ) : (
                                <MdArrowDropDown className="w-8 h-8" />
                            )}
                        </button>
                    </div>
                    <div>
                        <label className="font-bold text-black">Estados</label>
                        <select
                            name="stateFilter"
                            value={selectedStateId}
                            onChange={handleStateFilterChange}
                            className="border border-gray-300 rounded-md p-2 ml-2"
                        >
                            <option value="">Todos los estados</option>
                            {Array.isArray(generalTaskState) && generalTaskState.map((state: any) => (
                                <option key={state.ID_general_task_states} value={state.ID_general_task_states}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </nav>
                <article className="w-full">
                    <section className="h-auto w-full flex items-center flex-col">
                        {Array.isArray(processedTasks) && processedTasks.length > 0 ? (
                            processedTasks.map((general: any) => (
                                <div className="w-full" key={general.ID_general_tasks}>
                                    <Card generalTask={general} />
                                </div>
                            ))
                        ) : (
                            <p>No hay pedidos disponibles</p>
                        )}
                    </section>
                </article>
            </section>
        </div>
    )
}
