import {
  MdKeyboardArrowRight,
  MdHome,
  MdLogout,
  MdOutlineSettings,
  MdAdd,
  MdHelpOutline, 
} from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Sidebar = ({ siderbarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const siderbarStateActive = "hidden";
  const siderbarState = "block";
  const { logoutUser } = useAuth();

  // const { user } = useAuth();
  // //console.log(user)

  // const avatarUrl = user.avatar_url
  //   ? `${import.meta.env.VITE_API_URL}/${user.avatar_url}`
  //   : "/iconos/default-avatar.png";

  const handleClick = async () => {
    await logoutUser();
  };

  return (
    <main className="bg-[#F1F1F1] text-white sticky top-0 h-[100dvh] pt-8 flex flex-col">
      <button
        className={`absolute top-24 -right-7 2xl:-right-10 w-8 h-8 rounded-[50%] shadow-[0_0_7px_white] bg-[#199431] hover:bg-[#ADC708] hover:text-black cursor-pointer border-none transition-all duration-[0.5s] outline-none ${
          siderbarOpen ? "rotate-0" : "rotate-180"
        }`}
        onClick={() => setSidebarOpen(!siderbarOpen)}
      >
        <MdKeyboardArrowRight className="w-full h-full" />
      </button>
      <section className="flex justify-center items-center mt-3 mb-3">
        <div
          className={`inline-flex gap-1 justify-center items-end cursor-pointer transition-all duration-200 transform ${
            siderbarOpen ? "scale-[60%]" : "scale-[75%]"
          }`}
        >
          <div>
            <img
              className="max-h-20 w-auto"
              src="/iconos/engranajeAnimado.gif"
              alt="Isotipo de la empresa"
            />
          </div>
          <div
            className={`${siderbarOpen ? siderbarStateActive : siderbarState}`}
          >
            <img
              className="max-h-16 w-auto"
              src="/iconos/WorkSign-Logo-07.png"
              alt="Logotipo de la empresa"
            />
          </div>
          
        </div>
      </section>

      


      <section className="flex flex-col gap-6 items-center w-full">
        {linksArray.map(({ icon, label, To }) => (
          <div
            className={`flex justify-center items-center  ${
              siderbarOpen ? "w-full" : "w-[80%]"
            }`}
            key={label}
          >
            <div
              className={`mx-2 py-[15%] flex flex-col justify-center items-center max-h-8
        max-w-[70%] w-full rounded-2xl border-2
        ${
          (
            To === "/"
              ? location.pathname === To
              : location.pathname.startsWith(To)
          )
            ? "border-[#199431] bg-[#199431] text-white"
            : "border-[#ACACAE] bg-[#ffffff] text-black hover:border-[#ADC708]"
        }
      `}
            >
              <Link
                to={To}
                className="flex  items-center decoration-none w-full justify-center "
              >
                <div className="px-2  py-2 flex ">{icon}</div>
                {!siderbarOpen && <span className="">{label}</span>}
              </Link>
            </div>
          </div>
        ))}
      </section>

      <span className="h-0.5 w-full bg-white flex my-6 " />

    <section className="flex flex-col justify-start items-center gap-3 w-full mt-auto mb-4">
  {secondaryLinksArray.map(({ icon, label, To }) => (
    <div
      className={`flex justify-center items-center ${
        siderbarOpen ? "w-full" : "w-[80%]"
      }`}
      key={label}
    >
      <div
        className={`mx-2 py-[15%] flex flex-col justify-center items-center max-h-8
        max-w-[70%] w-full rounded-2xl border-2
        ${
          (
            To === "/"
              ? location.pathname === To
              : location.pathname.startsWith(To)
          )
            ? "border-[#199431] bg-[#199431] text-white"
            : "border-[#ACACAE] bg-[#ffffff] text-black hover:border-[#ADC708]"
        }
      `}
      >
        <Link
          to={To}
          className="flex items-center decoration-none py-1.5 w-full justify-center "
        >
          <div className="px-2 py-2 flex ">{icon}</div>
          {!siderbarOpen && <span>{label}</span>}
        </Link>
      </div>
    </div>
  ))}

  {/* 🔗 Nuevo botón para el Manual de Usuario */}
  <div
    className={`flex justify-center items-center ${
      siderbarOpen ? "w-full" : "w-[80%]"
    }`}
  >
    <div
      className={`mx-2 py-[15%] flex flex-col justify-center items-center max-h-8 max-w-[70%] w-full rounded-2xl border-2 border-[#ACACAE] bg-[#ffffff] text-black hover:border-[#ADC708]`}
    >
      <a
        href="https://www.canva.com/design/DAG223iZ468/tMkQpGOK6_s2qLXZlFvMcA/view?utm_content=DAG223iZ468&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h12e7206703"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center decoration-none py-1.5 w-full justify-center"
      >
        <div className="px-2 py-2 flex">
          {/* Podés cambiar el ícono si querés */}
          <MdHelpOutline className="size-6" />
        </div>
        {!siderbarOpen && <span>Manual</span>}
      </a>
    </div>
  </div>

  {/* Botón de Salir */}
  <div
    className={`flex justify-center items-center ${
      siderbarOpen ? "w-full" : "w-[80%]"
    }`}
  >
    <div
      className={`mx-2 py-[15%] flex flex-col justify-center items-center max-h-8 max-w-[70%] w-full rounded-2xl border-2 border-[#ACACAE] bg-[#ffffff] text-black hover:border-[#ADC708]`}
    >
      <button
        onClick={handleClick}
        className="flex items-center decoration-none py-1.5 w-full justify-center"
      >
        <div className="px-2 py-2 flex">
          <MdLogout className="size-6" />
        </div>
        {!siderbarOpen && <span>Salir</span>}
      </button>
    </div>
  </div>
</section>

    </main>
  );
};

const linksArray = [
  {
    label: "Inicio",
    icon: <MdHome className="size-6 " />,
    To: "/",
  },
  {
    label: "Nuevo Trabajo",
    icon: <MdAdd className="size-6" />,
    To: "/newJob",
  },
];

const secondaryLinksArray = [
  {
    label: "Ajustes",
    icon: <MdOutlineSettings className="size-6" />,
    To: "/setting",
  },
];

interface SidebarProps {
  siderbarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
