import { useState } from "react";

import { useSearchParams } from "react-router-dom";

import useProducts from "../hooks/useProducts";
import useSort from "../hooks/useSort.jsx";
import useCategories from "../hooks/useCategories.jsx";

import ProductCard from "../components/ProductCard.jsx";
import PaginatedList from "../components/PaginatedList.jsx";

import FormatCategory from "../components/FormatCategory.jsx";

import ProductCardSkeleton from "../components/ProductCardSkeleton.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";

import { Layers, PackageOpen } from "lucide-react";

export default function Shop() {

  const {products, loading, error, retry: retryProducts} = useProducts ();

  const [searchParams] = useSearchParams ();

  const search = searchParams.get("search") || "";

  const [sortByOption, setSortByOption] = useState("Default");

  const [sortByCategory, setSortByCategory] = useState("");

  const filteredProducts = products.filter((product)=> (
    product.title.toLowerCase().includes(search.toLowerCase())
  ))

  const {sortedItems} = useSort(filteredProducts, sortByOption)

  const filteredSortByCategory = 
    sortByCategory !== "" && !search
      ? sortedItems.filter((item)=>
        item.category === sortByCategory
    )
    : sortedItems

  const {categories, loading: categoriesLoading, error: categoriesError, retry: retryCategories} = useCategories ();

  const sixCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen mb-5">

      <div className="flex flex-col items-center">
        <h1>Shop</h1>
        <p className="text-center border-b-[1px] border-button w-16 my-4 rounded-full"></p>
        <p>Discover products you'll love.</p>
        <p>Find exactly what you need from our collection.</p>
      </div>
      
      <div className="flex gap-3">

        <div className="w-1/3 lg:w-1/5 items-start hidden md:flex flex-col gap-7 py-14 my-16 ml-3 border-border border-[2px] rounded-lg bg-secondary">

          <h3 className="mx-6 md:mx-8 font-bold">Categories</h3>

          <p className="border-t-border border-[1px] w-[80%] my-3 mx-auto"></p>

          <p className={`mx-8 md:mx-10 cursor-pointer transition-colors hover:text-buttonHover duration-200 active:scale-95 ${sortByCategory === "" ? "font-bold text-button" : ""}`}
             onClick={()=> {setSortByCategory("")}}
          >  All products
          </p>

          {categoriesLoading 
            ? Array(6).fill(0).map((_,index)=>
                <div key={index} className="flex justify-center items-center">
                  <div className="mx-8 md:mx-10 h-6 w-32 bg-elements rounded-lg animate-pulse">
                  </div>
                </div>
              )

            : categoriesError               
              ? <ErrorState errorMessage="We couldn't load the categories."
                            retry={retryCategories}
                            children="Try again"
                />
              
            : sixCategories.length === 0
              ? <div className="grid grid-cols-1 m-2">
                  <EmptyState icon={Layers}
                              title="No categories found"
                              description="We couldn't find any categories to display right now."
                  />
                </div>

            : sixCategories.map((category)=> (
                <p key={category} 
                  className={`mx-8 md:mx-10 cursor-pointer transition-colors duration-200 hover:text-buttonHover active:scale-95 ${sortByCategory === category ? "font-bold text-button" : ""}`}
                  onClick={()=> {setSortByCategory(category)}}
                >  {FormatCategory (category)}
                </p>
              ))
          }

          <p className="border-t-border border-[1px] w-full mt-3"></p>

          <img src="/letsShop.png" className="size-[400px] object-contain"/>
          
        </div>

        <div className="w-full md:w-2/3 lg:w-4/5">
          
          <div className="flex flex-col my-3 md:flex-row md:justify-between items-start md:items-center gap-2 md:gap-0 m-3">
            <h2>All products</h2>
            <div className="flex items-center gap-2">

              <p className="font-bold">Sort by:</p>

              <select value={sortByOption} 
                      onChange={(e)=> {setSortByOption(e.target.value)}}
                      className="bg-secondary rounded-lg p-3 text-sm font-bold border-[1px] border-border outline-none"
              >

                <option value="Default">Default</option>

                <optgroup label="Price:">
                  <option value="PriceLowtoHigh">Low to High</option>
                  <option value="PriceHightoLow">High to Low</option>
                </optgroup>

                <optgroup label="Rating:">
                  <option value="RatingHightoLow">High to Low</option>
                </optgroup>

                <optgroup label="Discount:">
                  <option value="DiscountHighestFirst">Highest First</option>
                </optgroup>

              </select>

            </div>

          </div>

            {loading
              ? <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-5 mx-3">
                  {Array(9).fill(0).map((_, index)=>
                    <ProductCardSkeleton key={index}/>
                  )}
                </div>

              : error  
                ? <ErrorState errorMessage="We couldn't load the products."
                              retry={retryProducts}
                              children="Try again"
                  />

              : filteredSortByCategory.length === 0 && search
                ? <EmptyState icon={PackageOpen}
                            title="No products match your search."
                            description="Try searching with different keywords."
                  />

              : filteredSortByCategory.length === 0 && !search
                ? <EmptyState icon={PackageOpen}
                            title="No products found"
                            description="We couldn't find any products to display right now."
                  />

              : <PaginatedList key={`${search}-${sortByOption}-${sortByCategory}`}
                               items={filteredSortByCategory}
                               renderItem={(product) => <ProductCard key={product.id} product={product} />}
                />
            }

        </div>
  
      </div>

    </div>

  );
}
