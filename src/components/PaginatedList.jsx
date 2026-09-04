import usePagination from "../hooks/usePagination";
import Pagination from "./Pagination";

export default function PaginatedList ({items, renderItem, itemsPerPage}){

    const {currentItems, currentPage, pagesCount, previousPage, nextPage} = usePagination(items, itemsPerPage);

    return(
        <div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-5 mx-3">
                {currentItems.map(renderItem)}
            </div>

            {pagesCount > 1 && (
                <Pagination
                    currentPage={currentPage}
                    pagesCount={pagesCount}
                    previousPage={previousPage}
                    nextPage={nextPage}
                />
            )}

        </div>
    );
}