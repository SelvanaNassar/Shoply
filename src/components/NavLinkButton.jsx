import { NavLink } from "react-router-dom";

export default function NavLinkButton ({children, to}){
    return (
        <NavLink to={to} 
                 className={({isActive})=> 
                    isActive ? "text-button border-t border-button text-sm px-3 md:px-6 pt-2 transition-all duration-200 hover:text-buttonHover"
                    : "text-sm px-3 md:px-6 pt-2 transition-colors duration-200 hover:text-buttonHover"
                 }
                >{children}
        </NavLink>
    );
}

