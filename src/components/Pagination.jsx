import { ChevronRight, ChevronLeft } from "lucide-react"

export default function Pagination ({currentPage, pagesCount, previousPage, nextPage}){

     if (pagesCount <= 1) {
        return "";
    }

    return (
        <div className="flex items-center justify-center">

            <button className="bg-border text-button rounded-l-lg py-2 px-3 transition-colors duration-200 hover:bg-buttonHover hover:text-primary disabled:cursor-not-allowed disabled:opacity-40" 
                    disabled={currentPage === 1} 
                    onClick={previousPage}>
                <ChevronLeft />
            </button>

            <button className="bg-buttonHover text-border font-bold py-2 px-3 cursor-default">
                {currentPage}
            </button>

            <button className="bg-border text-button rounded-r-lg py-2 px-3 transition-colors duration-200 hover:bg-buttonHover hover:text-primary disabled:cursor-not-allowed disabled:opacity-40" 
                    disabled={currentPage === pagesCount} 
                    onClick={nextPage}>
                <ChevronRight />
            </button>

        </div>
    );
}
