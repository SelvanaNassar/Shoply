import { useEffect, useState } from "react";


export default function useProducts (){

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState ("");

    function fetchProducts (){

        fetch('https://dummyjson.com/products?limit=0')
        
        .then(response => {
            if(!response.ok){
                throw new Error("failed to fetch products")
            }
            return response.json()
        })

        .then((data)=> setProducts(data.products) )

        .catch((error)=> {
            console.error(error)
            setError("failed to fetch products")
        })
        .finally(()=>{
            setLoading(false)
        })
    }
    
    useEffect(()=> {
        
        fetchProducts();

    }, []);

    const retry = ()=>{

        setLoading(true);

        setError("");

        fetchProducts();
        
    }
    
    return {products, loading, error, retry};
       
    
}
