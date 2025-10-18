import { Link } from "react-router-dom";
import { useState } from "react";
import { getTaskPriority, formatDate } from "../../utils/taskUtils";
import { useGeneralTask } from "../../context/GeneralTaskContext";
import { useAuth } from "../../context/AuthContext";

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
  const [isZoomed, setIsZoomed] = useState(false);
  const { updateGeneralTaskState, getGeneralTaskById } = useGeneralTask();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

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
    setIsZoomed(false);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setImageModalOpen(false);
    setIsZoomed(false);
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
        <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-4">
          <div className="flex flex-col text-center md:text-left gap-3">
            <h1 className="text-xl text-custom-green font-bold">{generalTask.title}</h1>
            <h2 className="text-base">
              <span className="font-bold">Cliente: </span>
              {generalTask.client?.name || generalTask.company || 'Sin cliente'}
            </h2>
            <h2 className="text-base break-words max-w-md">
              <span className="font-bold">Descripción: </span>
              {generalTask.description}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-2 text-center md:text-right">
              <h2 className="text-base">
                <span className="font-bold">Fecha de entrega</span>
              </h2>
              <div className="w-full max-w-[150px] md:w-36 h-10 flex items-center justify-center border-2 border-black rounded bg-white text-black font-bold">
                {formatDate(generalTask.estimated_delivery_date)}
              </div>
              <div className="flex flex-row items-center gap-2 mt-2">
                <h2 className="text-base m-0">
                  <span className="font-bold">Estado: </span>
                  {generalTask.generalTaskState?.name || 'Sin estado'}
                </h2>
                {user && user.ID_type_user && user.ID_type_user.ID_type_user === 1 && generalTask.generalTaskState?.ID_general_task_states === 2 && (
                  <button
                    className="h-8 px-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 font-bold text-xs whitespace-nowrap flex items-center justify-center"
                    style={{ minWidth: 100 }}
                    disabled={loading}
                    onClick={async (e) => {
                      e.preventDefault();
                      setLoading(true);
                      await updateGeneralTaskState(generalTask.ID_general_tasks, 5);
                      // Refrescar la tarea individual si existe (detalle)
                      if (getGeneralTaskById && generalTask.ID_general_tasks) {
                        await getGeneralTaskById(generalTask.ID_general_tasks);
                      }
                      setLoading(false);
                    }}
                  >
                    {loading ? 'Cambiando...' : 'Terminar trabajo'}
                  </button>
                )}
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
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
            className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-black text-4xl font-bold hover:text-gray-700 z-20"
            >
              &times;
            </button>
            {/* The container that provides the scrollbars */}
            <div className="w-full h-full overflow-auto">
              <img
                src={imageUrl}
                alt={`Imagen ampliada de ${generalTask.title}`}
                onClick={() => setIsZoomed(!isZoomed)}
                className={`transition-all duration-300 ease-in-out ${
                  isZoomed
                    ? 'min-w-[150%] min-h-[100%] w-auto h-auto cursor-zoom-out'
                    : 'max-w-full max-h-[75vh] w-full h-full object-contain cursor-zoom-in'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
