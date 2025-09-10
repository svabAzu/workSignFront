import { Link } from "react-router-dom";
import { useState } from "react";

export const getTaskPriority = (
  creationDateStr?: string,
  deliveryDateStr?: string
): number => {
  if (!creationDateStr || !deliveryDateStr) {
    return 0; // Prioridad más baja si no hay fechas
  }
  const creationDate = new Date(creationDateStr);
  const deliveryDate = new Date(deliveryDateStr);
  const now = new Date();

  if (isNaN(creationDate.getTime()) || isNaN(deliveryDate.getTime())) {
    return 0; // Fechas inválidas
  }

  // Si la tarea ya pasó o es hoy, es de máxima prioridad.
  if (now >= deliveryDate) {
    return 3; // Rojo (máxima prioridad)
  }

  // Si la tarea aún no ha comenzado, es de baja prioridad.
  if (now < creationDate) {
    return 1; // Verde (baja prioridad)
  }

  const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const TWO_WEEKS_IN_MS = 14 * 24 * 60 * 60 * 1000;
  const timeRemaining = deliveryDate.getTime() - now.getTime();

  if (timeRemaining <= ONE_WEEK_IN_MS) return 3; // Rojo: una semana o menos
  if (timeRemaining <= TWO_WEEKS_IN_MS) return 2; // Amarillo: dos semanas o menos
  return 1; // Verde: más de dos semanas
};

const getTrafficLightColor = (priority: number): string | undefined => {
  if (priority === 3) return "#dc3545"; // Rojo
  if (priority === 2) return "#ffc107"; // Amarillo
  if (priority === 1) return "#28a745"; // Verde
  return undefined;
};

const Card = ({ generalTask }: { generalTask: any }) => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);

  const trafficLightColor = getTrafficLightColor(
    getTaskPriority(generalTask.creation_date, generalTask.estimated_delivery_date)
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
  to={`/generalTask/${generalTask.ID_general_tasks}`}
  className="flex flex-col sm:flex-row justify-start rounded-lg my-4 mx-2 sm:mx-4 py-4 border-2 shadow-xl gap-4 p-4"
  style={{ borderColor: generalTask.generalTaskState?.color_code || '#ACACAE' }}
>
  {/* Imagen */}
  <div
    className="w-24 h-24 sm:w-30 sm:h-30 bg-gray-200 rounded-full overflow-hidden border border-gray-300 cursor-pointer flex-shrink-0 mx-auto sm:mx-0"
    onClick={handleImageClick}
  >
    <img
      src={imageUrl}
      alt={`Imagen de ${generalTask.title}`}
      className="object-cover w-full h-full"
    />
  </div>

  {/* Contenido */}
  <div className="flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap-0">
    <div className="flex flex-col gap-3 text-left">
      <h1 className="text-lg sm:text-xl text-custom-green font-bold">{generalTask.title}</h1>
      <h2 className="text-sm sm:text-base">
        <span className="font-bold">Cliente: </span>
        {generalTask.client?.name || generalTask.company || 'Sin cliente'}
      </h2>
      <h2 className="text-sm sm:text-base">
        <span className="font-bold">Descripción: </span>
        {generalTask.description}
      </h2>
    </div>
    <div className="flex flex-col gap-2 text-left">
      <h2 className="text-sm sm:text-base font-bold">Fecha de entrega</h2>
      <div className="w-full sm:w-35 h-10 flex items-center justify-center border-2 border-black rounded bg-white text-black font-bold">
        {generalTask.estimated_delivery_date?.slice(0, 10) || 'Sin fecha'}
      </div>
      <h2 className="text-sm sm:text-base">
        <span className="font-bold">Estado: </span>
        {generalTask.generalTaskState?.name || 'Sin estado'}
      </h2>
    </div>
    <div
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300"
      style={{
        backgroundColor: trafficLightColor || generalTask.generalTaskState?.color_code || '#A9A9A9',
      }}
    ></div>
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