import { useNavigate, useLocation } from "react-router-dom";

import { useContext, useState } from "react";

import NavLinkButton from "./NavLinkButton";

import CartContext from "../Contexts/CartContext";

import {Heart, ShoppingCart, UserRound, Search} from 'lucide-react'

export default function NavBar() {

  const [search, setSearch] = useState("");

  const navigate = useNavigate ();

  const location = useLocation();

  const isProductDetails = location.pathname.startsWith("/shop/")
  const isCategoriesDetails = location.pathname.startsWith("/categories/")
  const isFavorite = location.pathname.startsWith("/favorites")
  const isCart = location.pathname.startsWith("/cart") 
  const isCheckout = location.pathname.startsWith("/checkout")
  const isSignin = location.pathname.startsWith("/signin");

  const {cart} = useContext(CartContext);
  
  function handleSearch (e){
    e.preventDefault();
    !search.trim() 
      ? navigate("/shop") 
      : navigate(`/shop?search=${encodeURIComponent(search.trim())}`)
  }
  
  return (

    <div className="m-2">

      <div className="flex flex-wrap justify-between items-center gap-3 p-3 md:p-5 bg-secondary rounded-lg">
        <div className="flex gap-2">
          <span className="material-symbols-outlined text-navbarText">
            shopping_bag
          </span>
          <h3 className="text-navbarText font-bold">Shoply</h3>
        </div>
        <form onSubmit={handleSearch} className="w-full md:w-1/2 lg:w-1/3 order-last md:order-none">
          <div className="flex justify-between border border-border rounded-xl px-5 py-2 bg-primary">
            <input type="search" 
                    placeholder="Search for products..." 
                    value={search}
                    onChange={(e)=> {setSearch(e.target.value); }}
                    className="outline-none w-full text-xs bg-primary"
            />
            <Search className="w-5 opacity-50"/>
          </div>

        </form>

        <div className="flex gap-4 md:gap-10">
          <button onClick={()=> {navigate("/favorites")}}>
            <Heart className="text-navbarText transition-colors duration-200 hover:text-buttonHover"/>
          </button>

          <div className="relative cursor-pointer">
          <button onClick={()=> {navigate("/cart")}}>
            <ShoppingCart className="text-navbarText mr-1 mt-1 transition-colors duration-200 hover:text-buttonHover"/>       
            <p className="absolute top-0 right-0 bg-danger rounded-full size-4 text-center text-xs text-secondary">{cart.reduce((productNum, product)=> productNum + product.quantity, 0)}</p>
          </button>
          </div>

          <button onClick={()=> {navigate("/signin")}}>
            <UserRound className="text-navbarText transition-colors duration-200 hover:text-buttonHover"/>
          </button>
        </div>
      </div>

      {!isProductDetails && !isCategoriesDetails && !isFavorite && !isCart && !isCheckout && !isSignin
        ? <div className="flex justify-around w-full md:w-1/2 mx-auto mb-2 md:mb-5">
            <NavLinkButton to="/">Home</NavLinkButton>
            <NavLinkButton to="/shop">Shop</NavLinkButton>
            <NavLinkButton to="/categories">Categories</NavLinkButton>
            <NavLinkButton to="/deals">Deals</NavLinkButton>     
          </div>

        : ""    
      }

    </div>

  );
}

