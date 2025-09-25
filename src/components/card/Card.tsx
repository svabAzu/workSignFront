import { Link } from "react-router-dom";
import { useState } from "react";
import { getTaskPriority } from "../../utils/taskUtils";

const getDaysRemaining = (deliveryDateStr?: string): number | string => {
  if (!deliveryDateStr) {
    return "-";
  }
  const deliveryDate = new Date(deliveryDateStr);
  const now = new Date();

  if (isNaN(deliveryDate.getTime())) {
    return "-"; // Fecha inválida
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const deliveryDay = new Date(deliveryDate.getFullYear(), deliveryDate.getMonth(), deliveryDate.getDate());

  const timeDiff = deliveryDay.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

const getTrafficLightColor = (priority: number): string | undefined => {
  if (priority === 3) return "#dc3545"; // Rojo
  if (priority === 2) return "#ffc107"; // Amarillo
  if (priority === 1) return "#28a745"; // Verde
  return undefined;
};

export const Card = ({ generalTask }: { generalTask: any }) => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const trafficLightColor = getTrafficLightColor(
    getTaskPriority(generalTask.creation_date, generalTask.estimated_delivery_date)
  );

  const daysRemaining = getDaysRemaining(
    generalTask.estimated_delivery_date
  );

  const imageUrl = generalTask.sketch_url ? `${import.meta.env.VITE_API_URL}/${generalTask.sketch_url}` : '/iconos/default-avatar.png';

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setImageModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setImageModalOpen(false);
  };

  return (
    <>
      <Link
        to={`/individualTask/${generalTask.ID_general_tasks}`}
        className="h-auto flex flex-col md:flex-row justify-start rounded-lg my-4 mx-2 sm:mx-4 p-4 border-solid border-2 shadow-xl gap-4"
        style={{
          borderColor: generalTask.generalTaskState?.color_code || '#ACACAE',
        }}
      >
        <div
          className="w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0 md:ml-5 bg-gray-200 rounded-full overflow-hidden border border-gray-300 cursor-pointer flex-shrink-0"
          onClick={handleImageClick}
        >
          <img
            src={imageUrl}
            alt={`Imagen de ${generalTask.title}`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <div className="flex flex-col md:flex-row w-full justify-between items-center gap-4 text-center md:text-left">
            <div className=" flex flex-col gap-3">
              <h1 className="text-xl text-custom-green font-bold">{generalTask.title}</h1>
              <h2 className="text-base">
                <span className="font-bold">Cliente: </span>
                {generalTask.client?.name || generalTask.company || 'Sin cliente'}
              </h2>
              <h2 className="text-base break-words">
                <span className="font-bold">Descripción: </span>
                {generalTask.description}
              </h2>
            </div>
            <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2 text-center md:text-right">
              <h2 className="text-base">
                <span className="font-bold">Fecha de entrega</span>
              </h2>
              <div className="w-full max-w-[150px] md:w-36 h-10 flex items-center justify-center border-2 border-black rounded bg-white text-black font-bold">
                {generalTask.estimated_delivery_date?.slice(0, 10) || 'Sin fecha'}
              </div>
              <h2 className="text-base mt-2">
                <span className="font-bold">Estado: </span>
                {generalTask.generalTaskState?.name || 'Sin estado'}
              </h2>
            </div>
            <div
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center text-white font-bold text-sm"
              style={{
                backgroundColor: trafficLightColor || '#A9A9A9',
              }}
            >
              {daysRemaining}
            </div>
          </div>
        </div>
      </Link>



      {isImageModalOpen && (
       <div
    className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
    onClick={closeModal}
  >
    <div
      className="relative bg-white p-1 rounded-lg shadow-xl max-w-full sm:max-w-4xl max-h-[80vh] w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        className="absolute top-2 right-3 text-black text-3xl sm:text-4xl font-bold hover:text-gray-700"
      >
        &times;
      </button>
      <img
        src={imageUrl}
        alt={`Imagen ampliada de ${generalTask.title}`}
        className="object-contain max-w-full max-h-[75vh] mx-auto"
      />
    </div>
  </div>
      )}
    </>
  );
};

export default Card;