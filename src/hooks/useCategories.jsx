import { useEffect, useState } from "react";

export default function useCategories() {

    const[categories, setCategories] = useState([]);

    const [loading, setLoading] = useState (true);

    const [error, setError] = useState ("");

    function fetchCategories (){
        fetch('https://dummyjson.com/products/category-list')

        .then(response =>{
            if (!response.ok){
                throw new Error("Failed to fetch categories");    
            }
            return response.json()
            })
        .then((data)=> setCategories(data))
        .catch( error=> {
            console.error(error);
            setError("Failed to fetch categories")
        })
        .finally(()=> {
            setLoading(false)
        })
    }

    useEffect(()=> {

        fetchCategories ();
        
    }, [])

    const retry = ()=>{

        setLoading(true);

        setError("");

        fetchCategories();

    }

    return {categories, loading, error, retry};
    
}
