import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

import CartContext from "../Contexts/CartContext";

import {Trash2, ShieldCheck,ArrowLeft, ImageOff} from "lucide-react"

export default function Cart() {

  const {cart, addToCart, minusFromCart, deleteFromCart
         ,subtotal, shipping, discount, total} = useContext (CartContext);

  const navigate = useNavigate();

  return (
    <div className="m-3 lg:m-7 min-h-screen">

      <p className="my-7 text-sm text-secondaryText">Home / Cart</p>

      <button onClick={()=> navigate(-1)} 
              className="p-3 hover:text-button rounded-lg hover:bg-elements active:scale-90"
              title="Go back"
      >
        <ArrowLeft />
      </button>

      <h1 className="mb-5">My Cart</h1>

      {cart.length !==0 ?
      <div className="flex flex-col lg:flex-row gap-7">

        <div className="grid grid-cols-2 md:grid-cols-1 w-full lg:w-[75%] bg-secondary md:rounded-lg">
        {cart.map((product)=>(    

          <div key={product.id} className={`p-2 lg:p-5 w-full flex flex-col md:grid md:grid-cols-7 gap-3 items-center ${product.id === cart[cart.length-1].id ? "border-[1px] md:border-none" : "border-[1px] md:border-t-0 md:border-l-0 md:border-r-0 md:border-b-[1px] border-border"}`}>

            <div className="bg-elements w-full md:w-auto flex items-center justify-center rounded-lg">
              {product.images[0]
                ? <img src={product.images[0]} alt={product.title} className="size-[100px] md:size-[125px] lg:size-[150px] aspect-square object-contain p-3"/>
                :  <ImageOff className="w-[40%] h-[40%] text-secondaryText"/>
              }
            </div>

            <div className="md:col-span-2">
              <h3 className="text-base lg:text-xl line-clamp-1">{product.title}</h3>
              <p>{product.category}</p>
            </div>
            

            <div className="flex items-center justify-around md:justify-center w-full md:w-auto md:gap-4 lg:gap-6 py-2 px-3 lg:px-5 text-lg font-semibold border-border border-2 rounded-lg">

              <button onClick={(e)=> {e.stopPropagation(); minusFromCart(product)}}>-</button>
              <p>{product.quantity}</p>
              <button onClick={(e)=> {e.stopPropagation(); addToCart(product)}}>+</button>
            
            </div>

            {product.discountPercentage >= 12 
              ? <div className="md:col-span-2 flex flex-row gap-3 items-center justify-center">
                  <p className="font-bold text-lg text-button">
                    ${(product.price-((product.discountPercentage*product.price)/100)).toFixed(2)}
                  </p>
                  <p className="line-through">{product.price}</p>
              </div>

              : <p className="md:col-span-2 font-bold text-lg text-center text-button">${product.price}</p>
            }

            
            <button onClick={(e)=> {e.stopPropagation(); deleteFromCart(product)}}>
              <Trash2 />
            </button>
          </div>

        ))}
        </div>

        <div className="flex flex-col gap-7 w-full lg:w-[25%] bg-secondary rounded-lg p-12 lg:p-7">
          
          <h2>Order summary</h2>

          <div className="flex justify-between">
            <p>Subtotal({cart.reduce((productNum, product)=> productNum + product.quantity, 0)} items)</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p> 
            <p className="font-bold">{shipping === 0 ? "Free" :  `$`+shipping}</p>
          </div>

          <div className="flex justify-between">
            <p>Discount</p>
            <p className="text-success font-semibold">- ${discount.toFixed(2)}</p>
          </div>

          <p className="border-b-2"></p>

          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p className="text-lg">${total.toFixed(2)}</p>
          </div>

          <Button onClick={()=> navigate("/checkout")}>Proceed to checkout</Button>

          <p className="flex gap-1 justify-center text-secondaryText text-sm">
            <ShieldCheck className="size-5"/>
            Secure checkout
          </p>   

        </div>
      
      </div>

      :
      
      <div className="flex flex-col items-center gap-3">
        <img src="/emptyCart.png" className="size-[250px] md:size-[300px] lg:size-[350px] object-contain" />
          <h2>Your cart is empty</h2>
          <p>You haven't added any products to your cart yet.</p>
        </div>
      }

      <button onClick={()=> navigate("/shop")} 
              className="bg-secondary border-border border-2 rounded-lg px-5 py-3 mt-4 flex gap-1 items-center"
    >
              <ArrowLeft />
              Continue shopping
      </button>
    </div>

  );
}
