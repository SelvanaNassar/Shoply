import { useParams, useNavigate } from "react-router-dom";

import { useContext, useEffect, useState, useCallback } from "react";

import CartContext from "../Contexts/CartContext"
import FavoriteContext from "../Contexts/FavoriteContext";

import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import ErrorState from "./ErrorState";

import RatingStars from "./RatingStars";

import {toast} from "react-toastify"

import {Heart, ShoppingCart, Truck, RotateCwFadingClock,
        FingerprintPattern, BadgeCheck, ArrowLeft } from 'lucide-react'



export default function ProductDetails (){

    const {id} = useParams ();

    const navigate = useNavigate ();

    const [loading, setLoading] = useState (true);

    const [error, setError] = useState ("");

    const [product, setProduct] = useState({});

    const [selectedImage, setSelectedImage] = useState("");

    const [quantity, setQuantity] = useState(1);

    const {addToCart} = useContext(CartContext);

    const {addToFavorite, isExisting} = useContext (FavoriteContext);

    const fetchProducts = useCallback(()=>{

        fetch(`https://dummyjson.com/products/${id}`)
        .then(response => {
            if(!response.ok){
                throw new Error("Failed to load product details.")
            }
            return response.json()
        })
        .then(
            (data)=> {
                setProduct(data);
                setSelectedImage(data.images[0]);
            }
        )
        .catch((error)=>{
            console.error(error)
            setError("Failed to load product details.")
        })
        .finally(()=>
            setLoading(false)
        )
    }, [id])

    useEffect(()=>{ 

        fetchProducts();

    }, [fetchProducts]);

    const retry = ()=>{

        setLoading(true);

        setError("");

        fetchProducts();
        
    }
    
    if(loading){
        return <ProductDetailsSkeleton />
    }

    if (error) {
        return (
            <ErrorState
                errorMessage="We couldn't load the product details."
                retry={retry}
                children="Try again"
            />
        );
    }
    
    function handleAddToCart (){
        addToCart(product, quantity);
        toast.success("Product added to your cart.")
    }

    function handleQuantityDecrease (){
        if(quantity > 1){
            setQuantity(quantity - 1) 
        }
    }
    function handleQuantityIncrease (){
        if(quantity < 50){
            setQuantity(quantity + 1) 
        }
    }
    
    function handleAddToFavorite (){
        const favoriteProduct = {
            id: product.id,
            title: product.title,
            rating: product.rating,
            price: product.price,
            images: product.images,
            discountPercentage: product.discountPercentage,
        };

        if(isExisting (product.id)){
            toast.warning("This product is already in your favorites.");
            return;
        }

        addToFavorite(favoriteProduct);
        toast.success("Product added to your favorites.")
    }

    return (
        <div className="min-h-screen mx-2 lg:mx-5">

            <p className="my-7 text-sm text-secondaryText">Home / Shop / {product.category} / {product.title}</p>

            <button onClick={()=> navigate(-1)} 
                    className="p-3 hover:text-button rounded-lg hover:bg-elements active:scale-90 mb-4"
                    title="Go back"
            >
                <ArrowLeft />
            </button>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">

                <div className="w-full lg:w-[10%] flex flex-row lg:flex-col justify-center lg:justify-start gap-5">
                    {product.images.map((img, index)=> (
                        <div onClick={()=>setSelectedImage(img)}
                            key={index}
                            className={`w-full md:size-1/4 lg:size-[100px] bg-border shadow-sm rounded-lg flex flex-row lg:flex-col gap-3 lg:gap-5 justify-center lg:justify-start cursor-pointer ${selectedImage === img ? "border-button border-[1px]" : "border-transparent"}`}
                        > 
                            <img src={img} alt={product.title} className="size-[100px] aspect-square object-contain"/>
                        </div>
                    ))}
                </div>
                
                <div className="w-[80%] lg:w-[40%] h-[300px] lg:h-[500px] shadow-sm bg-border rounded-lg flex items-center justify-center">
                    <img src={selectedImage} alt={product.title} className="w-[90%] h-[80%] object-contain"/>
                </div>

                <div className="w-full lg:w-[50%]">
                    <h2 className="mb-5 text-center lg:text-left">{product.title}</h2>

                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">

                        <RatingStars rating={product.rating} /> 

                        <p>{product.rating}</p>

                        <p>({product.reviews.length} reviews)</p>

                    </div>
                    
                    {product.discountPercentage >= 12 
                        ? (
                        <div className="flex items-center justify-center lg:justify-start gap-5 mb-5"> 

                            <p className="font-bold text-button text-2xl">
                                    ${(product.price-((product.discountPercentage*product.price)/100)).toFixed(2)}
                            </p>

                            <p className="line-through">${product.price}</p>

                            <p className="text-success">{Math.round(product.discountPercentage)}% OFF</p>

                        </div>
                        ) 

                        : <p className="font-bold text-button text-2xl mb-5 text-center lg:text-left">${product.price}</p>
                    }

                    <p className="mb-5 text-center lg:text-left">{product.description}</p>
                    
                    <h3 className="mb-5 hidden lg:block">Quantity:</h3>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-3 mb-5">
                    
                        <div className="w-[70%] lg:w-1/3 bg-primary font-semibold text-xl border-2 border-border rounded-lg p-4 flex items-center">
                            
                            <span className="lg:hidden text-lg">Quantity:</span>
                            
                            <button onClick={handleQuantityDecrease}
                                    className="hover:text-button w-1/3"
                            >       -
                            </button>

                            <input value={quantity} 
                                readOnly
                                className="outline-none bg-transparent text-center w-1/3"
                            />

                            <button onClick={handleQuantityIncrease}
                                    className="hover:text-button w-1/3"
                            >       +
                            </button>

                        </div>

                        <button onClick={handleAddToCart}
                                className="w-[70%] lg:w-1/3 text-lg lg:text-base bg-button py-4 px-6 text-primary rounded-lg transition-colors hover:bg-buttonHover duration-200 active:scale-95"
                        >       <ShoppingCart className="inline"/> Add to cart
                        </button>

                        <button onClick={handleAddToFavorite}
                                className="w-[70%] lg:w-1/3 text-lg lg:text-base py-4 px-6 bg-elements rounded-lg border-2 border-border font-semibold transition-colors duration-200 hover:bg-border active:scale-95"
                        >       <Heart className="inline"/> Add to favorite
                        </button>  

                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5 w-full">

                        <div className="flex items-center gap-3 bg-secondary border-[1px] border-border rounded-lg py-3 px-6">
                            <Truck />
                            <div>
                                <p className="font-semibold">Free shipping</p>     
                                <p>On orders over $50</p>  
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-secondary border-[1px] border-border rounded-lg py-3 px-6">
                            <FingerprintPattern />
                            <div>
                                <p className="font-semibold">Secure payment</p>
                                <p>100% secure</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-secondary border-[1px] border-border rounded-lg py-3 px-6">
                            <RotateCwFadingClock />
                            <div>
                                <p className="font-semibold">Return policy</p>
                                <p>{product.returnPolicy}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-secondary border-[1px] border-border rounded-lg p-3">
                            <BadgeCheck />
                            <div>
                                <p className="font-semibold">Warranty information</p>
                                <p>{product.warrantyInformation}</p>
                            </div>
                        </div>

                    </div>

                </div>
                
            </div>
        </div>
    );
}
