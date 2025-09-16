
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}



export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPaginationItems = () => {
    const siblingCount = 1; // Páginas a mostrar a cada lado de la actual
    const totalPageNumbers = siblingCount + 5; // Páginas a mostrar en total (aprox.)

    // Si no hay suficientes páginas para necesitar puntos suspensivos, mostrar todas
    if (totalPages <= totalPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Caso 1: No hay puntos a la izquierda, pero sí a la derecha
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    // Caso 2: No hay puntos a la derecha, pero sí a la izquierda
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [firstPageIndex, '...', ...rightRange];
    }

    // Caso 3: Hay puntos a ambos lados
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    // Fallback por si ninguna de las condiciones anteriores se cumple, aunque no debería pasar con la lógica actual.
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const paginationItems = getPaginationItems();

  if (totalPages <= 1) {
    return null; // No mostrar paginación si solo hay una página o menos
  }

  return (
    <nav className="mt-8" aria-label="Paginación">
      <ul className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
        className="px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm bg-[#ACACAE] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#199431] hover:text-white transition-colors"
          >
            Anterior
          </button>
        </li>
        {paginationItems.map((item, index) => {
          if (typeof item === 'string') {
            return <li key={`dots-${index}`} className="px-2 py-1">...</li>;
          }

          const buttonClasses = `w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md transition-colors text-xs sm:text-sm ${currentPage === item
              ? 'bg-[#199431] text-white font-bold'
              : 'bg-gray-200 hover:bg-[#199431] hover:text-white'
            }`;

          return (
            <li key={item}>
              <button
                onClick={() => onPageChange(item)}
                className={buttonClasses}
                aria-current={currentPage === item ? 'page' : undefined}
              >
                {item}
              </button>
            </li>
          );
        })}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
        className="px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm bg-[#ACACAE] rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#199431] hover:text-white transition-colors"
          >
            Siguiente
          </button>
        </li>
      </ul> 
    </nav>

  );
};