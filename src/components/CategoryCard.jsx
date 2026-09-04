import { useNavigate } from "react-router-dom";

import FormatCategory from "../components/FormatCategory.jsx";

export default function CategoryCard ( {category, clickable = true} ){

    const navigate = useNavigate ();
    return (

        <div 
            onClick={()=> (clickable ? navigate(`/categories/${category}`) : "")} 
            className="bg-secondary border border-border rounded-xl p-5 text-center shadow-sm shadow-boxShadow cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:bg-buttonHover hover:text-primary hover:shadow-md active:scale-95"
        > 
        
            <p className="font-semibold">{FormatCategory(category)}</p>

        </div>
        
    );
}
