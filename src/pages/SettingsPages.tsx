import { SidebarSettings } from "../components/settings/SidebarSettings";

export const SettingsPages = () => {
  return (
    <main className="flex flex-col items-center pt-8 w-full justify-center bg-[#F1F1F1]">
  <article className="w-[98%] h-auto my-4 rounded-4xl min-h-[98dvh] bg-white flex flex-col p-6 shadow-lg">
    <SidebarSettings />
  </article>
</main>

  );
};
