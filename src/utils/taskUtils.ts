export const getTaskPriority = ( creationDateStr?: string,deliveryDateStr?: string): number =>{
  
  
  
  if (!creationDateStr || !deliveryDateStr) {
    return 0; // Prioridad más baja si no hay fechas
  }
  
  
  const creationDate = new Date(creationDateStr);
  const deliveryDate = new Date(deliveryDateStr);
  const now = new Date();

  if (isNaN(creationDate.getTime()) || isNaN(deliveryDate.getTime())) {
    return 0; // Fechas inválidas
  }

  // Normalizar 'now' y 'deliveryDate' para comparar solo la fecha (sin la hora)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const deliveryDay = new Date(deliveryDate.getFullYear(), deliveryDate.getMonth(), deliveryDate.getDate());

  // Si la fecha de entrega es hoy, es de máxima prioridad.
  if (today.getTime() === deliveryDay.getTime()) {
    return 3; // Rojo (máxima prioridad porque es hoy)
  } else if (today > deliveryDay) {
    return 3; // Rojo si la fecha ya pasó (atrasado)
  }

  const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const timeRemaining = deliveryDay.getTime() - today.getTime();

  // Si falta 1 semana o menos (y no es hoy o pasado), es amarillo.
  if (timeRemaining <= ONE_WEEK_IN_MS) return 2; // Amarillo
  return 1; // Verde (más de una semana)
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) {
    return 'Sin fecha';
  }
  const datePart = dateString.slice(0, 10);
  const [year, month, day] = datePart.split('-');

  if (year && month && day && year.length === 4 && month.length === 2 && day.length === 2) {
      return `${day}/${month}/${year}`;
  }

  return datePart || 'Sin fecha';
};
