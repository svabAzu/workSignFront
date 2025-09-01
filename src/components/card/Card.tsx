import { Link } from "react-router-dom";

const Card = ({ generalTask }: { generalTask: any }) => {
  return (
    <Link
      to={`/generalTask/${generalTask.ID_general_tasks}`}
      className="h-auto flex justify-start rounded-lg my-4 mx-4 py-4 border-solid border-1 border-[#ACACAE] shadow-xl gap-4"
    >
      <div className="w-30 h-30 ml-5 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
        <img
          src={generalTask.sketch_url ? `${import.meta.env.VITE_API_URL}/${generalTask.sketch_url}` : '/iconos/default-avatar.png'}
          alt={`Imagen de ${generalTask.title}`}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex w-[80%]">
        <div className="flex w-full justify-between items-center">
          <div className="w-auto flex flex-col gap-3 text-left">
            <h1 className="text-xl text-custom-green font-bold">{generalTask.title}</h1>
            <h2 className="text-base">
              <span className="font-bold">Cliente: </span>
              {generalTask.client?.name || generalTask.company || 'Sin cliente'}
            </h2>
            <h2 className="text-base">
              <span className="font-bold">Descripción: </span>
              {generalTask.description}
            </h2>
          </div>
          <div className="w-auto flex flex-col gap-1 text-left">
            <h2 className="text-base">
              <span className="font-bold">Fecha de entrega</span>
            </h2>
            <div className="w-35 h-10 flex mb-3 items-center justify-center  border-2 border-black rounded bg-white text-black font-bold">
              {generalTask.estimated_delivery_date?.slice(0, 10) || 'Sin fecha'}
            </div>
            <h2 className="text-base">
              <span className="font-bold">Estado: </span>
              {generalTask.generalTaskState?.name || 'Sin estado'}
            </h2>
          </div>
          <div className="w-10 h-10 bg-green-500 rounded-full overflow-hidden border border-gray-300"></div>
        </div>
      </div>
    </Link>
  );
};

export default Card;