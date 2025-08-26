import { SidebarSettings } from "../components/settings/SidebarSettings";

export const SettingsPages = () => {
  return (
    <main className="flex flex-col items-center justify-center h-[95vh] bg-[#F1F1F1]">
      <article className="h-[95%] w-full bg-white rounded-4xl flex flex-col p-6 shadow-lg">
        {<SidebarSettings />}
      </article>
    </main>
  );
};
