import { SidebarSettings } from "../components/settings/SidebarSettings";

export const SettingsPages = () => {
  return (
    <main className="flex flex-col items-start w-[100%] justify-center  bg-[#F1F1F1]">
      <article className=" w-[98%] h-auto my-4 rounded-4xl  bg-white  flex flex-col p-6 shadow-lg">
        {<SidebarSettings />}
      </article>
    </main>
  );
};
