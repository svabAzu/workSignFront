import { Link, Outlet } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";


export const SidebarSettings = () => {
    const { user } = useAuth();
    console.log(user)


    return (

        <main>
            <section className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#199431]">Configuración</h1>
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                        <img src={user.avatar_url} alt={"Imagen de " + user.name + " " + user.last_name} className="object-cover w-full h-full" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">{user.name + " " + user.last_name}</p>
                        <Link to="/perfil" className="text-sm text-gray-500 hover:underline">Editar perfil</Link>
                    </div>
                </div>
            </section>


            <nav className="bg-[#B9E99E] p-4 rounded-md flex space-x-8 text-black font-semibold">

                <Link to="/setting/register" className="hover:text-[#199431] ">
                    Registro
                </Link>

                <Link to="/setting/edit-operario" className="hover:text-[#199431]">
                    Editar operario
                </Link>

                <Link to="/setting/specialty" className="hover:text-[#199431]">
                    Especialidades
                </Link>
            </nav>

            <section className="p-4 mt-4">
                <Outlet />
            </section>
        </main>


    )
}