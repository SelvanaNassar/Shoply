import { useNavigate } from "react-router-dom";

import useCategories from "../hooks/useCategories";
import useProducts from "../hooks/useProducts";
import usePagination from "../hooks/usePagination.jsx";

import CategoryCard from "../components/CategoryCard";
import Pagination from "../components/Pagination.jsx";

import CategoryCardSkeleton from "../components/CategoryCardSkeleton.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";

import {Layers, ImageOff} from "lucide-react"

export default function Categories() {

  const navigate = useNavigate();

  const {categories, loading, error, retry: retryCategories} = useCategories ();

  const {products} = useProducts();

  const {currentItems, currentPage, pagesCount, previousPage, nextPage} = usePagination (categories, 12);

  function getCategoryImage (categoryName){
    
    const productCategory = products.find(product=> 
      product.category === categoryName
    )

    return productCategory?.images?.[0]

  }

  return (
    <div className="min-h-full flex flex-col gap-3 mb-5">
      <div className="flex flex-col items-center text-center mx-4 lg:mx-0 mt-5">
        <h1>Categories</h1>
        <p className="border-b-[1px] border-button w-16 my-4 rounded-full"></p>
        <p>Explore our collections.</p>
        <p>Find exactly what you need from our wide range of products.</p>     
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2 py-5">

        {loading 
          ? Array(12).fill(0).map((_,index)=>
              <div key={index} className="flex flex-col md:flex-row items-center gap-2 md:justify-around p-2 bg-elements rounded-lg">
                <div className="size-[170px] aspect-square bg-secondary/50 shadow-sm rounded-full flex items-center justify-center">
                </div>
                <div className="w-40 h-6 bg-secondary/50 rounded-full">
                  <CategoryCardSkeleton />
                </div>
              </div>
              )

          : error 
            ? <ErrorState errorMessage="We couldn't load the categories."
                          retry={retryCategories}
                          children="Try again"
              />

          : currentItems.length === 0
            ? <EmptyState icon={Layers}
                          title="No categories found"
                          description="We couldn't find any categories to display right now."
              />
            
          : currentItems.map((category)=> {
              const categoryImg = getCategoryImage(category);
              return(
                <div key={category} onClick={()=> (navigate(`/categories/${category}`))} className="flex flex-col md:flex-row items-center gap-2 md:justify-around p-2 bg-elements rounded-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:shadow-boxShadow">
                  <div className="size-[170px] bg-secondary/50 shadow-sm rounded-full flex items-center justify-center">
                    {categoryImg
                      ? <img src={categoryImg} 
                        className="w-[90%] h-[90%] object-contain"
                        />
                      : <ImageOff className="w-[40%] h-[40%] text-secondaryText"/>
                    }
                    
                  </div>
                  <div className="w-full md:w-[40%] text-sm ">
                    <CategoryCard category={category} clickable={false}/>
                  </div>
                </div>
              );
            })
        }

      </div>  

      <Pagination currentPage={currentPage} pagesCount={pagesCount} previousPage={previousPage} nextPage={nextPage}/>

    </div>
  );
}
