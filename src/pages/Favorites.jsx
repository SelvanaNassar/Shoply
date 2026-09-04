import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import FavoriteContext from "../Contexts/FavoriteContext";

import ProductCard from "../components/ProductCard";
import Button from "../components/Button";

import {ArrowLeft, Heart} from "lucide-react"

export default function Favorites() {

  const navigate = useNavigate();

  const {favorite} = useContext(FavoriteContext);

  return(

    <div className="min-h-screen m-3">

      <p className="my-7 text-sm text-secondaryText">Home / Favorites</p>

      <button onClick={()=> navigate(-1)} 
              className="p-3 hover:text-button rounded-lg hover:bg-elements active:scale-90 mb-4"
              title="Go back"
      >
        <ArrowLeft />
      </button>

      <h1 className="mb-5">My Favorites</h1>
      {favorite.length !== 0 &&
        <p> ({favorite.length} {favorite.length === 1 ? "item" : "items"} saved)</p>
      }

      { favorite.length === 0 

        ? <div className="flex flex-col items-center gap-3">

            <Heart className="size-[128px] fill-danger text-danger"/>

            <h3>Love something?</h3>

            <div className="text-center">
              <p>Add items you love to your favorites and find them here.</p>

              <p>Tap the heart on any item to make it a favorite.</p>
            </div>

            <Button onClick={()=> navigate("/shop")}>Browse products</Button>

          </div>

        : <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {favorite.map((favoriteProduct)=> (

              <ProductCard key={favoriteProduct.id} product={favoriteProduct}/>

            ))}

          </div>
      } 

    </div>
  

  );
}
