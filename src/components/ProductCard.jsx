import RatingStars from "./RatingStars"

import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import FavoriteContext from "../Contexts/FavoriteContext";

import { Heart } from "lucide-react";

export default function ProductCard ( {product} ){

    const navigate = useNavigate ();

    const {handleHeartIcon, isExisting} = useContext(FavoriteContext);

    return (
        <div 
            onClick={()=> (navigate(`/shop/${product.id}`))} 
            className="group bg-secondary border border-border rounded-lg text-center shadow-sm shadow-boxShadow relative cursor-pointer transition-all duration-200 hover:translate-y-1 hover:shadow-md hover:border-button"
        >

            <img src={product.images[0]} 
                alt={product.title} 
                className="bg-elements/60 rounded-lg px-4 py-5 w-full aspect-square lg:aspect-[4/3] object-contain transition-transform duration-200 group-hover:scale-95"
            />

            <p className="font-semibold h-6 line-clamp-1 my-3">{product.title}</p>

            <RatingStars rating={product.rating}/>

            {product.discountPercentage >= 12 
                ? (
                <div className="my-3">

                    <p className="bg-danger text-secondary text-xs rounded-lg p-2 absolute top-[5%] left-[5%]">
                        {Math.round(product.discountPercentage)}% OFF
                    </p>

                    <div className="flex gap-2 items-center justify-center">

                        <p className="font-semibold text-lg text-black">
                            ${(product.price-((product.discountPercentage*product.price)/100)).toFixed(2)}
                        </p>

                        <p className="line-through">${product.price}</p>

                    </div>

                </div>
                ) 

                : <p className="font-semibold text-lg text-black my-3">${product.price}</p>
            }  

            <button onClick={(e)=> {e.stopPropagation(); handleHeartIcon(product)}}
                    className="absolute top-[5%] right-[5%] bg-secondary rounded-full p-1 transition-colors duration-200 hover:bg-dangerLight "
            > <Heart className={`transition-all duration-200 ${isExisting(product.id) ? "text-danger fill-danger" : "text-navbarText fill-transparent"}`}/>
            </button>          

        </div>
    );

}

