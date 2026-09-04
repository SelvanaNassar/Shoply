import { useState } from "react";

export default function usePagination (items, itemsPerPage=9){

    const [currentPage, setCurrentPage] = useState (1);

    const pagesCount = Math.ceil(items.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage

    const currentItems = items.slice(startIndex, startIndex + itemsPerPage)

    function previousPage (){
        setCurrentPage ((page)=> 
            page > 1 ? page - 1 : page
        )
    }
    
    function nextPage (){
        setCurrentPage ((page)=> 
            page < pagesCount ? page + 1 : page
        )
    }

    return {currentItems, currentPage, pagesCount, previousPage, nextPage};
}
