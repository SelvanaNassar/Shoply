import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FavoriteContext = createContext ();

export function FavoriteProvider ({children}) {

    const [favorite, setFavorite] = useState (()=> {
        const savedFavorite = localStorage.getItem("favorite")
        if(!savedFavorite){
            return [];
        }
        try{
            return JSON.parse(savedFavorite)
        }
        catch {
            return []
        }
    });
    useEffect(()=> {
        localStorage.setItem("favorite", JSON.stringify(favorite))
    }, [favorite])

    const isExisting = (id)=> {
        return favorite.some(product=> product.id === id)
    }

    const addToFavorite = (favoriteProduct) => {
        setFavorite(prevFavorite=> {
            const existingProduct = prevFavorite.find((product)=> (
                favoriteProduct.id === product.id
            ))
            if(!existingProduct){
                return [...prevFavorite, favoriteProduct]
            }
            return prevFavorite
        }) 
    }

    const deleteFromFavorite = (favoriteProduct)=>{
        const newFavorite = favorite.filter(
            (product)=> (product.id !== favoriteProduct.id)
        )
        setFavorite(newFavorite)
    }

    const handleHeartIcon = (product)=> {
        if(isExisting(product.id)){
        deleteFromFavorite(product)
        toast.success("Product removed from your favorites.")
        return;
        }
        toast.success("Product added to your favorites.");
        addToFavorite(product)
    }
    return (
        <FavoriteContext.Provider value={{favorite, addToFavorite, isExisting, 
                                          deleteFromFavorite, handleHeartIcon}}>
            {children}
        </FavoriteContext.Provider>
    );
}
export default FavoriteContext ;
