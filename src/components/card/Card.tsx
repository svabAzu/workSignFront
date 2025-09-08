import { Link } from "react-router-dom";

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
  const trafficLightColor = getTrafficLightColor(
    getTaskPriority(generalTask.creation_date, generalTask.estimated_delivery_date)
  );

  return (
    <Link
      to={`/generalTask/${generalTask.ID_general_tasks}`}
      className="h-auto flex justify-start rounded-lg my-4 mx-4 py-4 border-solid border-2 shadow-xl gap-4"
      style={{
        borderColor: generalTask.generalTaskState?.color_code || '#ACACAE',
      }}
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
          <div
            className="w-10 h-10 rounded-full overflow-hidden border border-gray-300"
            style={{
              backgroundColor: trafficLightColor || generalTask.generalTaskState?.color_code || '#A9A9A9',
            }}
          ></div>
        </div>
      </div>
    </Link>
  );
};

export default Card;