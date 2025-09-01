import Card from "../components/card/Card"
import { useState, useEffect } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { useGeneralTask } from "../context/GeneralTaskContext";




export const HomePages = () => {

    const handleSearchChange = (e: any) => {
        setBusqueda(e.target.value);
    };


    const [busqueda, setBusqueda] = useState("");

    const { generalTask, getGeneralTask } = useGeneralTask();


    useEffect(() => {

        getGeneralTask();

    }, []);



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
                        <button className="flex items-center justify-center rounded-4xl pl-5 bg-[#199431]">Prioridad <MdArrowDropDown className="w-8 h-8" /></button>
                    </div>
                    <div>
                        <label className="font-bold text-black">Estados</label>
                        <select
                            name="ID_type_user"
                            // value={values.ID_type_user}
                            // onChange={handleChange}
                            className="border border-gray-300 rounded-md p-2 ml-2"
                        >
                            <option value={1}>Completado</option>
                            <option value={2}>aca van los estados traidos por el back</option>
                        </select>
                    </div>
                </nav>
                <article className="w-full">
                    <section className="h-auto w-full flex items-center flex-col">
                        {Array.isArray(generalTask) && generalTask.length > 0 ? (
                            generalTask.map((general: any) => (
                                <div className="w-full" key={general.id}>
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
