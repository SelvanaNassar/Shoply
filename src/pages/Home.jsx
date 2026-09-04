import { useNavigate } from "react-router-dom";

import useProducts  from "../hooks/useProducts.jsx";
import useCategories from "../hooks/useCategories.jsx";

import Button from "../components/Button.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryCard from "../components/CategoryCard.jsx";

import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";

import ProductCardSkeleton from "../components/ProductCardSkeleton.jsx";
import CategoryCardSkeleton from "../components/CategoryCardSkeleton.jsx";

import { ArrowRight, PackageOpen,  Layers } from "lucide-react"

export default function Home() {

  const navigate = useNavigate ();

  const {products, loading: productsLoading, error: productsError, retry: retryProducts} = useProducts ();
  const sixProducts = products.slice(0, 6);

  const {categories, loading: categoriesLoading, error: categoriesError, retry: retryCategories} = useCategories ();
  const sixCategories = categories.slice(0, 6);

  return (

    <div className="m-2 min-h-screen">

      <div className="flex flex-col gap-4 items-start md:flex-row md:gap-0 justify-around md:items-center mb-5 mx-3">

        <div className="w-full md:w-[40%]">

            <h1 className="mb-2 md:mb-5">Discover <br/> amazing products <br/> just for you</h1>
          
          <div className="flex gap-2 flex-col md:gap-0">
            <p className="mb-2 md:mb-5">Find the best products with great prices <br/> and excellent quality.</p>
          
            <Button onClick={()=> {navigate ("/shop")}}
            > Shop now
              <ArrowRight className="size-6 inline pl-1"/>      
            </Button>
          </div>
        </div>

        <div className="relative w-full md:w-[55%] lg:w-[45%]">

          <img src="/shopping.png" 
               alt="Summer sale up to 50% off"
               className="rounded-lg object-contain w-full max-h-[550px]"
          />

          <div className="absolute left-[5%] top-[15%] text-center">

            <h2 className="mb-5 text-xl md:text-2xl lg:text-3xl">Summer sale <br/> up to 50% off</h2>

            <Button onClick={()=> { navigate ("/deals")}}>Explore deals</Button>

          </div>

        </div>

      </div>

      <div className="flex justify-between mb-2 mx-3">

        <h3>Explore categories</h3>

        <button 
          onClick={()=> {navigate("/categories")}} 
          className="text-button text-sm transition-colors duration-200 hover:underline hover:text-buttonHover"
        > View all
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5 mx-3">

        {categoriesLoading
        
          ? Array(6).fill(0).map((_, index)=>(
              <CategoryCardSkeleton key={index} />
            ))

          : categoriesError ?
            <ErrorState errorMessage="We couldn't load the categories."
                        retry={retryCategories}
                        children="Try again"
            />

          : sixCategories.length === 0 ?
            <EmptyState title="No categories found"
                        description="We couldn't find any categories to display right now."
                        icon={Layers}
            />

          : sixCategories.map((category)=> (
              <CategoryCard key={category} category={category}/>
            ))

        }

      </div>

      <div>

        <div className="flex justify-between mb-2 mx-3">
          
          <h3>Popular products</h3>

          <button 
            onClick={()=> {navigate("/shop")}} 
            className="text-button text-sm transition-colors duration-200 hover:underline hover:text-buttonHover"
          > View all
          </button>
        
        </div>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5 mx-3">

        {productsLoading 

          ? Array(6).fill(0).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))

          : productsError ?
            <ErrorState errorMessage="We couldn't load the products."
                        retry={retryProducts}
                        children="Try again"
            />

          : sixProducts.length === 0 ?
            <EmptyState title="No products found"
                        description="We couldn't find any products to display right now."
                        icon={PackageOpen}
            />

          : sixProducts.map((product)=>(
              <ProductCard key={product.id} product={product}/>
            ))

        }
        
      </div>
     

    </div>
  );
}
