import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Pagination from "./Pagination";

import FormatCategory from "./FormatCategory";

import useSort from "../hooks/useSort";
import usePagination from "../hooks/usePagination";

import { ArrowLeft, PackageOpen } from "lucide-react"

import ErrorState from "./ErrorState"
import EmptyState from "./EmptyState";

export default function CategoryDetails (){

    const {category} = useParams ();

    const navigate = useNavigate();

    const [categoryProducts, setCategoryProducts] = useState ([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [sortOption, setSortOption] = useState("Default");

    const {sortedItems} = useSort(categoryProducts, sortOption);

    const {currentItems, currentPage, pagesCount, previousPage, nextPage, retry: retryCategoryProducts} = usePagination(sortedItems, 9);

    useEffect (()=> {

        fetch(`https://dummyjson.com/products/category/${category}`)

        .then(response=> {
            if(!response.ok){
                throw new Error ("failed to load category");
            }
            return response.json()
        })

        .then((data)=> {
            setCategoryProducts(data.products)
            setLoading(false)
        })

        .catch((error)=> {
            console.error(error)
            setError("Failed to load")
            setLoading(false)
        })

    }, [category])

    const categoryWithFormat = FormatCategory(category)

    return (
        <div className="m-3">

            <p className="my-7 text-sm text-secondaryText">Home / Categories / {categoryWithFormat}</p>

            <button onClick={()=> navigate(-1)} className="p-3
                    hover:text-button rounded-lg hover:bg-elements active:scale-90"
                    title="Go back"
            >
                <ArrowLeft />
            </button>

            <div className="flex flex-col md:flex-row items-start gap-3 md:gap-0 md:justify-between m-3 lg:m-5">

                <div className="flex flex-col gap-2">
                    <h1>{categoryWithFormat}</h1>

                    <p>Explore our {categoryWithFormat} collection.</p>

                    <p>{sortedItems.length} products</p>
                </div>

                <select onChange={(e)=> setSortOption(e.target.value)}
                        className="outline-none bg-secondary border-border border-2 rounded-lg p-3"
                >
                    <option value="Default">Default</option>
                    <optgroup label="Price">
                        <option value="PriceLowtoHigh">Low to High</option>
                        <option value="PriceHightoLow">High to Low</option>
                    </optgroup>
                    <optgroup label="Rating">
                        <option value="RatingHightoLow">Highest rated</option>
                    </optgroup>      
                </select>

            </div>

            {loading
                ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                        {Array(8).fill(0).map((_, index)=>(
                            <ProductCardSkeleton key={index}/> 
                        ))}
                    </div>

                : error  
                    ? <ErrorState errorMessage="We couldn't load the products."
                                  retry={retryCategoryProducts}
                                  children="Try again"
                      />

                : currentItems.length === 0
                    ? <EmptyState icon={PackageOpen}
                                  title="No products found"
                                  description="We couldn't find any products to display right now."
                      />

                : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-3">
                    {currentItems.map((categoryProduct)=>(                             
                        <ProductCard product={categoryProduct} key={categoryProduct.id}/>     
                    ))}
                  </div>
            }

            

            <Pagination currentPage={currentPage} pagesCount={pagesCount} previousPage={previousPage} nextPage={nextPage}/>

        </div>

    );

}

