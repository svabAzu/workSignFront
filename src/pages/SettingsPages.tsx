import { Outlet, useLocation } from "react-router-dom";
import { SidebarSettings } from "../components/settings/SidebarSettings";

export const SettingsPages = () => {
  const location = useLocation();

  return (
    <main className="flex flex-col items-center pt-8 w-full justify-center bg-[#F1F1F1]">
      <article className="w-[98%] h-auto my-4 rounded-4xl min-h-[98dvh] bg-white flex flex-col p-6 shadow-lg">
        <SidebarSettings />
        {location.pathname === '/setting' && (
          <section className="flex flex-col justify-center items-center">
            <img className=" max-w-20 mt-20" src="/iconos/WorkSign-Engranaje.png" alt="Isotipo de la empresa" />
            <h1 className="mt-5 text-2xl ">Manual de Usuario</h1>
          </section>
        )}
        <Outlet />
      </article>
    </main>
  );
};
