
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}



export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-6 sm:mt-8" aria-label="Paginación">
  <ul className="flex flex-wrap justify-center items-center gap-2">
    <li>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 sm:px-4 py-2 bg-[#ACACAE] rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#199431] hover:text-white text-sm sm:text-base"
      >
        Anterior
      </button>
    </li>
    {pageNumbers.map(number => (
      <li key={number}>
        <button
          onClick={() => onPageChange(number)}
          className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
            currentPage === number
              ? 'bg-[#199431] text-white font-bold'
              : 'bg-gray-200 hover:bg-[#199431] hover:text-white'
          }`}
        >
          {number}
        </button>
      </li>
    ))}
    <li>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 sm:px-4 py-2 bg-[#ACACAE] rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#199431] hover:text-white text-sm sm:text-base"
      >
        Siguiente
      </button>
    </li>
  </ul>
</nav>

    );
};