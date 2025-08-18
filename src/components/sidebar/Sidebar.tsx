import { MdKeyboardArrowRight, MdHome, MdPersonAdd, MdLogin,MdLogout  } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"




export const Sidebar = ({ siderbarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const siderbarStateActive = "hidden"
  const siderbarState = "block"

  return (
    <main className='bg-[#F1F1F1] text-white sticky'>
      <button className={`absolute top-24 -right-4 w-8 h-8 rounded-[50%] shadow-[0_0_7px_white] bg-green-600 cursor-pointer border-none transition-all duration-[0.5s] outline-none ${siderbarOpen ? 'rotate-0' : 'rotate-180'}`} onClick={() => setSidebarOpen(!siderbarOpen)}>
        <MdKeyboardArrowRight className="w-full h-full" />
      </button>
      <section className="flex justify-center items-center pb-6 pt-5 ">
        <div className={`inline-flex gap-1 justify-center items-end cursor-pointer transition-all duration-200 transform ${siderbarOpen ? 'scale-[60%]' : 'scale-[75%]'}`}>
          <div>
            <img className="max-h-20 w-auto" src="/iconos/WorkSign-Engranaje.png" alt="Isotipo de la empresa" />
          </div>
          <div className={`${siderbarOpen ? siderbarStateActive : siderbarState}`}>
            <img className="max-h-16 w-auto" src="/iconos/WorkSign-Logo-07.png" alt="Logotipo de la empresa" />
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-start items-center gap-3 w-full">
        {linksArray.map(({ icon, label, To }) => (
          <div className={`flex justify-center items-center  ${siderbarOpen? 'w-full':'w-[80%]'}`} key={label}>
            <div
              className={`mx-2 py-[15%] flex flex-col justify-center items-center max-h-8
        max-w-[70%] w-full rounded-2xl border-2
        ${location.pathname === To
                  ? "border-[#199431] bg-[#199431] text-white"
                  : "border-[#ACACAE] bg-[#ACACAE] text-white hover:border-[#199431]"}
      `}
            >
              <Link to={To} className="flex items-center decoration-none py-1.5 w-full justify-center ">
                <div className="px-2 py-4 flex ">
                  {icon}
                </div>
                {!siderbarOpen && (
                  <span className="text-black">{label}</span>
                )}
              </Link>
            </div>
          </div>
        ))}
      </section>
      
      <span className="h-0.5 w-full bg-white flex my-6 " />

      <section className="flex flex-col justify-end items-center gap-1 w-full h-60">
        {secondaryLinksArray.map(({ icon, label, To }) => (
          <div className={`flex justify-center items-center  ${siderbarOpen? 'w-full':'w-[80%]'}`} key={label}>
            <div
              className={`mx-2 py-[15%] flex flex-col justify-center items-center max-h-8
        max-w-[70%] w-full rounded-2xl border-2
        ${location.pathname === To
                  ? "border-[#199431] bg-[#199431] text-white"
                  : "border-[#ACACAE] bg-[#ACACAE] text-white hover:border-[#199431]"}
      `}
            >
              <Link to={To} className="flex items-center decoration-none py-1.5 w-full justify-center ">
                <div className="px-2 py-4 flex ">
                  {icon}
                </div>
                {!siderbarOpen && (
                  <span className="text-black">{label}</span>
                )}
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}



const linksArray = [
  {
    label: "Home",
    icon: <MdHome className="size-6 text-black" />,
    To: "/"
  },
  {
    label: "Register",
    icon: <MdPersonAdd className="size-6 text-black" />,
    To: "/register"
  }


]
const secondaryLinksArray = [
  {
    label: "Salir",
    icon: <MdLogout className="size-6 text-black" />,
    To: "/logout"
  },
  


]
interface SidebarProps {
  siderbarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}