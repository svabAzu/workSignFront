import { Link, Outlet } from "react-router-dom";



export const CreateGeneralTask = () => {
    return (
        <div className="flex flex-col items-center pt-8 w-full justify-center bg-[#F1F1F1]">
            <section className="w-[98%] min-h-[98dvh] my-4 rounded-4xl bg-white flex flex-col p-6 shadow-lg">
                <section className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#199431] text-center sm:text-left">
                        C R E A R &nbsp; T R A B A J O
                    </h1>
                </section>
                <nav className="bg-[#B9E99E] p-4 rounded-md flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0 text-black font-semibold items-center sm:items-start">
                    <Link to="/newJob" className="hover:text-[#199431]">
                        Nuevo
                    </Link>
                    <Link to="/newJob/materials" className="hover:text-[#199431]">
                        Materiales
                    </Link>
                    <Link to="/newJob/createTypeJob" className="hover:text-[#199431]">
                        Crear tipos de trabajo
                    </Link>
                </nav>
                <section className="p-4 mt-4 w-full">
                    <Outlet />
                </section>
            </section>
        </div>
    )
}