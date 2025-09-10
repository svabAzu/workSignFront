import Card, { getTaskPriority } from "../components/card/Card";
import { useState, useEffect, useMemo } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useGeneralTask } from "../context/GeneralTaskContext";
import { Pagination } from "../components/card/Pagination";


export const HomePages = () => {
    const [busqueda, setBusqueda] = useState("");
    const [sortOrder, setSortOrder] = useState<'none' | 'desc' | 'asc'>('none');
    const [selectedStateId, setSelectedStateId] = useState<string>(''); // '' para "Todos"
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(4); // Número de tarjetas por página

    const handleSearchChange = (e: any) => {
        setBusqueda(e.target.value);
    };

    const { generalTask, getGeneralTask, generalTaskState, getGeneralTaskState } = useGeneralTask();

    console.log(generalTask);
    console.log(generalTaskState);


    useEffect(() => {
        getGeneralTask();
        getGeneralTaskState();
    }, []);

    // Resetear a la página 1 cuando los filtros cambian
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedStateId, busqueda, sortOrder]);

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

    // Lógica de paginación memoizada
    const { currentTasks, totalPages } = useMemo(() => {
        const indexOfLastTask = currentPage * tasksPerPage;
        const indexOfFirstTask = indexOfLastTask - tasksPerPage;
        const tasksForPage = processedTasks.slice(indexOfFirstTask, indexOfLastTask);
        return { currentTasks: tasksForPage, totalPages: Math.ceil(processedTasks.length / tasksPerPage) };
    }, [currentPage, tasksPerPage, processedTasks]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col items-center pt-8 w-full justify-center bg-[#F1F1F1]">
  <section className="w-[98%] h-auto my-4 rounded-3xl min-h-[90dvh] bg-white flex flex-col p-4 sm:p-6 shadow-lg">
    {/* Barra de filtros */}
    <nav className="bg-custom-blue w-full flex flex-col sm:flex-row rounded-b-2xl justify-between items-center px-3 sm:px-5 py-3 sm:py-0 gap-3 sm:gap-0">
      {/* Buscador */}
      <div className="w-full sm:w-auto">
        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <input
            type="search"
            placeholder="Buscar..."
            value={busqueda}
            onChange={handleSearchChange}
            className="border border-gray-200 p-2 rounded w-full sm:w-52"
          />
        </form>
      </div>

      {/* Botón Prioridad */}
      <div className="w-full sm:w-auto">
        <button
          onClick={handleSortByPriority}
          className="w-full sm:w-auto flex items-center justify-center rounded-4xl pl-5 pr-3 py-2 bg-[#199431] text-white font-bold"
        >
          Prioridad {sortOrder === 'desc' ? (
            <MdArrowDropUp className="w-6 h-6" />
          ) : (
            <MdArrowDropDown className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Filtro Estados */}
      <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start">
        <label className="font-bold text-black mr-2">Estados</label>
        <select
          name="stateFilter"
          value={selectedStateId}
          onChange={handleStateFilterChange}
          className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
        >
          <option value="">Todos</option>
          {Array.isArray(generalTaskState) &&
            generalTaskState.map((state: any) => (
              <option key={state.ID_general_task_states} value={state.ID_general_task_states}>
                {state.name}
              </option>
            ))}
        </select>
      </div>
    </nav>

    {/* Lista de Cards */}
    <article className="w-full">
      <section className="w-full flex flex-col items-center">
        {Array.isArray(currentTasks) && currentTasks.length > 0 ? (
          currentTasks.map((general: any) => (
            <div className="w-full" key={general.ID_general_tasks}>
              <Card generalTask={general} />
            </div>
          ))
        ) : (
          <p className="mt-10 text-gray-500 text-center">
            No hay pedidos que coincidan con los filtros seleccionados.
          </p>
        )}
      </section>
    </article>

    {/* Paginación */}
    {totalPages > 1 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    )}
  </section>
</div>

    )
}
