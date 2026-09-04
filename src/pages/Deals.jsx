import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../components/Button"
import ProductCard from "../components/ProductCard";
import FormatCategory from "../components/FormatCategory";

import ProductCardSkeleton from "../components/ProductCardSkeleton.jsx";
import CategoryCardSkeleton from "../components/CategoryCardSkeleton.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";

import PaginatedList from "../components/PaginatedList.jsx";
import useCategories from "../hooks/useCategories.jsx";
import useProducts from "../hooks/useProducts";
import useSort from "../hooks/useSort.jsx";

import { ArrowRight, Flame, PackageOpen, Layers } from "lucide-react"

export default function Deals() {

  const {products, loading, error, retry: retryProducts} = useProducts ();

  const dealsProducts = 
    products.filter((product)=> (
      product.discountPercentage >= 12
  ))

  const [sortByOption, setSortByOption] = useState ("Default");

  const [discountRange, setDiscountRange] = useState("");

  const [sortByCategory, setSortByCategory] = useState("");

  const {sortedItems} = useSort (dealsProducts, sortByOption);

  const filteredSortItems = 
    discountRange === "12%AndMore"
      ? sortedItems.filter((item)=> 
        item.discountPercentage >= 12
      )
    
    : discountRange === "15%AndMore"
      ? sortedItems.filter((item)=> 
        item.discountPercentage >= 15
      )
    
    : discountRange === "18%AndMore"
      ? sortedItems.filter((item)=> 
        item.discountPercentage >= 18
      )
    
    : discountRange === "HighestDiscounts"
      ? sortedItems.filter((item)=> 
        item.discountPercentage > 19.5
      )
    
    : sortedItems;

  const filteredSortByCategory = 
    sortByCategory !== ""
      ? filteredSortItems.filter((item)=>
        item.category === sortByCategory
    )
    : filteredSortItems

  const navigate = useNavigate ();

  const {categories, loading: categoriesLoading, error: categoriesError, retry: retryCategories} = useCategories ();
  
  const sixCategories = categories.slice(0, 6);
  
  return (
    <div className="min-h-screen my-5">

      <div className="flex flex-col md:flex-row md:justify-between lg:justify-around md:items-center rounded-lg lg:w-[95%] p-4 lg:p-0 mx-3 lg:mx-auto mb-5 bg-elements">
        <div>
          <div className="flex items-center text-danger bg-dangerLight rounded-2xl w-fit px-4 py-1 mb-2 md:mb-5">
            <Flame className="fill-danger"/>
            <p>Hot deals</p>
          </div>
          
          <h1>Big deals,</h1>
          <h1 className="text-button">Better prices</h1>
          <p className="my-2 md:my-5">Discover amazing products with <br/> exclusive discounts.</p>
          <Button onClick={()=> navigate("/shop")}>
            Shop all products 
            <ArrowRight className="inline"/>
          </Button>
        </div>
        <img src="/deals.png" alt="Special deals and discounts" className="size-[300px] md:size-[350px] lg:size-[400px] object-contain"/>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mx-2 lg:mx-0">

        <div className="w-full lg:w-1/4">

        <h3 className="pl-2 lg:hidden font-bold">Deal categories</h3>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-1 lg:gap-2 items-center p-2 lg:p-5 lg:ml-3 mb-5 border-border border-[2px] rounded-lg bg-secondary">
            
            <h3 className="p-3 hidden lg:inline font-bold">Deal categories</h3>
            
            <p className={`p-3 cursor-pointer transition-colors duration-200 hover:text-buttonHover active:scale-95 ${sortByCategory === "" ? "text-button font-bold bg-elements rounded-lg" : ""}`}
               onClick={()=> (setSortByCategory(""))}
            >  All Deals
            </p>

            {categoriesLoading 
              ? Array(6).fill(0).map((_, index)=>(
                  <CategoryCardSkeleton key={index}/>
                ))

              : categoriesError 
                ? <ErrorState errorMessage="We couldn't load the categories."
                              retry={retryCategories}
                              children="Try again"
                  />

              : sixCategories.length === 0
                ? <EmptyState icon={Layers}
                              title="No categories found"
                              description="We couldn't find any categories to display right now."
                  />

              : sixCategories.map((category)=> (
                  <p key={category} 
                     className={`p-3 cursor-pointer transition-colors duration-200 hover:text-buttonHover active:scale-95 ${sortByCategory === category ? "text-button font-bold bg-elements rounded-lg" : ""}`}
                     onClick={()=> (setSortByCategory(category))}
                  >  {FormatCategory (category)}
                  </p>
                ))
            }
                      
          </div>

          <h3 className="font-bold p-2 lg:hidden">Discount range</h3>

          <div className="flex flex-col lg:gap-5 p-5 lg:ml-3 mb-5 border-border border-[2px] rounded-lg bg-secondary">
            
            <h3 className="font-bold p-3 hidden lg:inline">Discount range</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-1 text-sm lg:text-base gap-5 ml-3 lg:mb-3">

              <div>
                <input type="radio" 
                      name="discountRange"
                      id="12%AndMore"
                      value={"12%AndMore"} 
                      onChange={(e)=> setDiscountRange(e.target.value)} 
                      className="cursor-pointer"
                /> 
                <label htmlFor="12%AndMore" className="p-3 cursor-pointer">12% and more</label>
              </div>

              <div>
                <input type="radio" 
                      name="discountRange"
                      id="15%AndMore" 
                      value={"15%AndMore"} 
                      onChange={(e)=> setDiscountRange(e.target.value)} 
                      className="cursor-pointer"
                />
                <label htmlFor="15%AndMore" className="p-3 cursor-pointer">15% and more</label>
              </div>

              <div>
                <input type="radio" 
                      name="discountRange"
                      id="18%AndMore" 
                      value={"18%AndMore"}
                      onChange={(e)=> setDiscountRange(e.target.value)} 
                      className="cursor-pointer"
                />
                <label htmlFor="18%AndMore" className="p-3 cursor-pointer">18% and more</label>
              </div>

              <div>
                <input type="radio"
                      name="discountRange" 
                      id="HighestDiscounts" 
                      value={"HighestDiscounts"}
                      onChange={(e)=> setDiscountRange(e.target.value)}
                      className="cursor-pointer"
                />
                <label htmlFor="HighestDiscounts" className="p-3 cursor-pointer">Highest discounts</label>  
              </div>

            </div>

          </div>

        </div>

        <div className="w-full lg:w-3/4">

          <div className="flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between md:items-center mx-2 md:mx-4 mb-3">

            <div>
              <h2>Best Deals</h2>
              <p>Handpicked deals with the biggest discounts</p>
            </div>

            <div className="flex items-center gap-3">
              <p>Sort by:</p>
              <select onChange={(e)=> setSortByOption(e.target.value)}
                      value={sortByOption}
                      className="outline-none border-2 border-border rounded-lg bg-secondary p-2"
              >
                <option value="Default">Default</option>
                <option value="DiscountHighestFirst">Highest discount</option>
                <option value="DiscountLowestFirst">Lowest discount</option>
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

              : filteredSortByCategory.length === 0
                ? <EmptyState icon={PackageOpen}
                              title="No deals available"
                              description="We couldn't find any discounted products right now."
                  />

              : <PaginatedList key={`${sortByOption}-${sortByCategory}-${discountRange}`}
                               items={filteredSortByCategory}
                               renderItem={(dealsProduct) => <ProductCard key={dealsProduct.id} product={dealsProduct}/>}
                /> 

            }
            
        </div>

      </div>

    </div>
  );
}
