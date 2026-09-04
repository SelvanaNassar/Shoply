import { createContext, useEffect, useState } from "react";

const CartContext = createContext ();

export function CartProvider ({children}){
    
    const [cart, setCart] = useState (()=> {

        const savedCart = localStorage.getItem("cart")

        if(!savedCart){
            return []
        }

        try{
            return JSON.parse(savedCart)
        }
        
        catch {
            return []
        }
        
    });
    useEffect(()=> {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = (cartProduct, quantity = 1)=> {

        setCart (prevCart => { 

            const exsistingProduct = prevCart.find((product)=> (
                product.id === cartProduct.id
            ))

            if(!exsistingProduct){
                return [...prevCart, {...cartProduct, quantity: quantity}]    
            }

            return prevCart.map((product)=>(
                        product.id === cartProduct.id 
                        ? {...product, quantity: product.quantity + quantity}
                        : product
                    ))
        })
    }

    const minusFromCart = (cartProduct)=> {
        
        setCart (prevCart => { 
            const exsistingProduct = prevCart.find((product)=> (
                product.id === cartProduct.id
            ))

            if(!exsistingProduct){
                return prevCart
            }

            if(exsistingProduct.quantity === 1){
                return prevCart.filter((producct)=> (
                    producct.id !== cartProduct.id
                ))
            }

            return prevCart.map((product)=>(
                product.id === cartProduct.id
                ? {...product, quantity: product.quantity - 1}
                : product
            ))         
        })
    }

    const deleteFromCart = (cartProduct)=> {

        const newCart = cart.filter((deleteProduct)=> (
            deleteProduct.id !== cartProduct.id
        ))
        setCart(newCart)
    }

    const clearCart = ()=> {
        setCart([])
    }

    const subtotal = cart.reduce((total, product)=> total + product.price * product.quantity, 0);
    
    const shipping = cart.length !== 0 && subtotal < 50 ? 5 : 0
    
    const discount = cart.reduce(
        (totalDiscount, product)=> 
            product.discountPercentage >= 12
            ? totalDiscount + (product.price * product.discountPercentage * product.quantity)/100
            : totalDiscount,
        0
    )

    const total = subtotal + shipping - discount
    
    return (

        <CartContext.Provider value={{cart, addToCart, minusFromCart, deleteFromCart, clearCart
                                      ,subtotal, shipping, discount, total}} >
            {children}
        
        </CartContext.Provider>
        
    );

}
export default CartContext;

