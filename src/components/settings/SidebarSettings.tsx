import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";


export const SidebarSettings = () => {
    const { user } = useAuth();
    //console.log(user)

    const avatarUrl = user.avatar_url
        ? `${import.meta.env.VITE_API_URL}/${user.avatar_url}`
        : "/iconos/default-avatar.png";


    return (

        <main className="w-full">
 
  <section className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
    <h1 className="text-2xl sm:text-3xl font-bold text-[#199431] text-center sm:text-left">
      C O N F I G U R A C I Ó N
    </h1>
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
        <img
          src={avatarUrl}
          alt={`Imagen de ${user.name} ${user.last_name}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-center sm:text-left">
        <p className="font-bold text-lg">{user.name + " " + user.last_name}</p>
        <Link
          to="/perfil"
          className="text-sm text-gray-500 hover:underline"
        >
          Editar perfil
        </Link>
      </div>
    </div>
  </section>

  {/* Nav */}
  <nav className="bg-[#B9E99E] p-4 rounded-md flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0 text-black font-semibold items-center sm:items-start">
    <Link to="/setting/register" className="hover:text-[#199431]">
      Registro
    </Link>
    <Link to="/setting/edit-operario" className="hover:text-[#199431]">
      Editar operario
    </Link>
    <Link to="/setting/specialty" className="hover:text-[#199431]">
      Especialidades
    </Link>
  </nav>

</main>



    )
}