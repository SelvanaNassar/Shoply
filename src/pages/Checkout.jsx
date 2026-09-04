import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import CartContext from "../Contexts/CartContext";

import CreateOrder from "../serveces/CreateOrder";

import { toast } from "react-toastify";

import { ArrowLeft } from "lucide-react";

export default function Checkout() {

  const navigate = useNavigate();

  const {cart, clearCart, subtotal, shipping, discount, total} = useContext(CartContext);

  const [shippingInfo, setShippingInfo] = useState ({
    fullName: "",
    email: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
    payment: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = [
    "Syria", "Azerbaijan", "Armenia", "Spain", "Estonia", "Germany",
    "United Arab Emirates", "Ukraine", "Ireland", "Italy", "Bahrain",
    "Portugal", "Belgium", "Bulgaria", "Poland", "Tunisia", "Algeria",
    "Djibouti", "Denmark", "Russia", "Romania", "Saudi Arabia", "Sudan",
    "Jordan", "Sweden", "Switzerland", "Somalia", "Iraq", "Oman", "France",
    "Palestine", "Finland", "Cyprus", "Qatar", "Croatia", "Kuwait", "Lebanon", 
    "Libya", "Malta", "Hungary", "Egypt", "Morocco", "Mauritania", "Austria",
    "Norway", "Netherlands", "Yemen", "Greece", "United Kingdom", "Comoros"
  ];

  const [errors, setErrors] = useState ({
    fullName: "", 
    email: "", 
    address: "", 
    city: "", 
    country: "", 
    postalCode: "", 
    phoneNumber: "", 
    payment: ""
  });

  const regex = {
    nameCityRegex: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/ ,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    addressRegex: /^[A-Za-z0-9\s,.-]{5,100}$/,
    phoneRegex: /^\+?[0-9\s-]{7,15}$/,
    postalRegex: /^[0-9]{4,10}$/,
  }
  
  async function infoChecking (e){

    e.preventDefault ();
    
    const newErrors = {};

    if(!shippingInfo.fullName){
      newErrors.fullName = "Full name is required."
    } else if(!regex.nameCityRegex.test(shippingInfo.fullName)){
        newErrors.fullName = "Please enter your full name using letters only."
      }

    if(!shippingInfo.email){
      newErrors.email = "Email is required."
    } else if(!regex.emailRegex.test(shippingInfo.email)){
        newErrors.email = "Please enter a valid email address, e.g. name@example.com."
      }

    if(!shippingInfo.address){
      newErrors.address = "Address is required."
    } else if(!regex.addressRegex.test(shippingInfo.address)){
        newErrors.address = "Please enter a valid address."
      }

     if(!shippingInfo.city){
      newErrors.city = "City name is required."
    } else if(!regex.nameCityRegex.test(shippingInfo.city)){
        newErrors.city = "Please enter a valid city name using letters only."
      }

    if(!shippingInfo.country){
      newErrors.country = "Please select a country"
    }

    if(!shippingInfo.postalCode){
      newErrors.postalCode = "Postal code is required."
    } else if(!regex.postalRegex.test(shippingInfo.postalCode)){
        newErrors.postalCode = "Please enter a valid postal code."
      }

    if(!shippingInfo.phoneNumber){
      newErrors.phoneNumber = "Phone number is required."
    } else if(!regex.phoneRegex.test(shippingInfo.phoneNumber)){
        newErrors.phoneNumber = "Please enter a valid phone number (7–15 digits)."
      }

    if(!shippingInfo.payment){
      newErrors.payment = "Please select a payment method"
    }

    setErrors(newErrors);

    if(Object.keys(newErrors).length > 0){
      return;
    }

    setIsSubmitting(true);

    const order = {
      personInfo: shippingInfo,
      products: cart.map((product)=> ({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: product.quantity
      })),
      subtotal: subtotal,
      shipping: shipping,
      discount: discount,
      total: total
    }

    try{
      await CreateOrder(order);
      toast.success("Your order has been placed successfully!")
      clearCart()
      navigate("/")
    }

    catch{
      toast.error("We couldn't place your order, Please try again.")
    }

    finally{
      setIsSubmitting(false);
    }
     
  }

    function validateOnBlurFields (field){

    const value = shippingInfo[field]

    if(field === "fullName" && !regex.nameCityRegex.test(value)){
      setErrors({...errors, fullName: "Please enter your full name using letters only."})
      return;
    }
    if(field === "email" && !regex.emailRegex.test(value)){
      setErrors({...errors, email: "Please enter a valid email address, e.g. name@example.com."})
      return;
    }
    if(field === "address" && !regex.addressRegex.test(value)){
      setErrors({...errors, address: "Please enter a valid address."})
      return;
    }
    if(field === "city" && !regex.nameCityRegex.test(value)){
      setErrors({...errors, city: "Please enter a valid city name using letters only."})
      return;
    }
    if(field === "postalCode" && !regex.postalRegex.test(value)){
      setErrors({...errors, postalCode: "Please enter a valid postal code."})
      return;
    }
    if(field === "phoneNumber" && !regex.phoneRegex.test(value)){ 
      setErrors({...errors, phoneNumber: "Please enter a valid phone number (7–15 digits)."})
      return;
    }
    if(field === "country" && !value){ 
      setErrors({...errors, country: "Please select a country."})
      return;
    }
    if(field === "payment" && !value){ 
      setErrors({...errors, payment: "Please select a payment method"})
      return;
    }
    setErrors({...errors, [field]: ""})
  }
  
  function clearForm() {
    setShippingInfo({
      fullName: "", email: "", address: "", city: "",
      country: "", postalCode: "", phoneNumber: "", payment: ""
    });
    setErrors({
      fullName: "", email: "", address: "", city: "",
      country: "", postalCode: "", phoneNumber: "", payment: ""
    });
}

if(cart.length === 0){
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <div className="flex flex-col items-center gap-3">
        <img src="emptyCart.png" className="size-[250px] md:size-[300px] lg:size-[350px] object-contain" />
          <h2>Nothing to checkout yet.</h2>
          <p>Add some products to your cart before checking out.</p>
      </div>
      
      <button onClick={()=> navigate("/shop")} 
              className="bg-secondary border-border border-2 rounded-lg px-5 py-3 mt-4 flex gap-1 items-center"
      >
        <ArrowLeft />
        Continue shopping
      </button>
    </div>
  );
}

  return (
    <div className="min-h-screen mx-1 my-3 md:m-5">

      <h1 className="mb-5">Checkout</h1>

      <div className="flex flex-col lg:flex-row lg:justify-around gap-5 lg:gap-0">

        <div className="w-full lg:w-[50%] border-2 border-border rounded-lg p-3 lg:p-7">

          <h3 className="mb-5">Shipping information</h3>

          <form onSubmit={infoChecking} className="flex flex-col gap-2">

            <div className="flex flex-col gap-1">
              <label>Full name</label>
              <input type="text" 
                    value={shippingInfo.fullName} 
                    onChange={(e)=> {
                      setShippingInfo({...shippingInfo, fullName: e.target.value})
                    }}
                    className="border-2 border-border outline-none p-1 rounded-lg"
                    onBlur={()=> (validateOnBlurFields("fullName"))}
              />
              {errors.fullName ? <p className="text-red-500 text-sm">{errors.fullName}</p> : "" }
            </div>

            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input type="email" 
                    value={shippingInfo.email} 
                    onChange={(e)=> {
                      setShippingInfo({...shippingInfo, email: e.target.value})
                      }}
                    className="border-2 border-border outline-none p-1 rounded-lg"
                    onBlur={()=> (validateOnBlurFields("email"))}
              />
              {errors.email ? <p className="text-red-500 text-sm">{errors.email}</p> : ""}
            </div>

            <div className="flex flex-col gap-1">
              <label>Address</label>
              <input type="text" 
                    value={shippingInfo.address} 
                    onChange={(e)=> {
                      setShippingInfo({...shippingInfo, address: e.target.value})
                      }}
                    className="border-2 border-border outline-none p-1 rounded-lg bg-secondary"
                    onBlur={()=> (validateOnBlurFields("address"))}
              />
              {errors.address ? <p className="text-red-500 text-sm">{errors.address}</p> : ""}
            </div>

            <div className="flex flex-col gap-1">
              <label>Country</label>
              <select value={shippingInfo.country} 
                      onChange={(e)=> {
                        setShippingInfo({...shippingInfo, country: e.target.value})
                      }}
                      className="border-2 border-border outline-none p-1 rounded-lg bg-secondary"
                      onBlur={()=> (validateOnBlurFields("country"))}
              >
                <option value="">Select country</option>
                {countries.map((country)=> (
                  <option key={country} >{country}</option>
                ))} 
              </select>
              {errors.country ? <p className="text-red-500 text-sm">{errors.country}</p> : ""}
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-3 lg:gap-5">
              <div className="flex flex-col gap-1 w-full">
                <label>City</label>
                <input type="text" 
                      value={shippingInfo.city} 
                      onChange={(e)=> {
                        setShippingInfo({...shippingInfo, city: e.target.value})
                        }}
                      className="border-2 border-border outline-none p-1 rounded-lg bg-secondary"
                      onBlur={()=> (validateOnBlurFields("city"))}
                />
                {errors.city ? <p className="text-red-500 text-sm">{errors.city}</p> : ""}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label>Postal code</label>
                <input type="text" 
                      value={shippingInfo.postalCode} 
                      onChange={(e)=> {
                        setShippingInfo({...shippingInfo, postalCode: e.target.value})
                      }}
                      className="border-2 border-border outline-none p-1 rounded-lg bg-secondary"
                      onBlur={()=> (validateOnBlurFields("postalCode"))}
                />
                { errors.postalCode ? <p className="text-red-500 text-sm">{errors.postalCode}</p> : "" }
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label>Phone number</label>
              <input type="text" 
                    value={shippingInfo.phoneNumber} 
                    onChange={(e)=> {
                      setShippingInfo({...shippingInfo, phoneNumber: e.target.value})
                    }}
                    className="border-2 border-border outline-none p-1 rounded-lg bg-secondary"
                    onBlur={()=> (validateOnBlurFields("phoneNumber"))}
              />
              {errors.phoneNumber ? <p className="text-red-500 text-sm">{errors.phoneNumber}</p> : ""}
            </div>

            <div className="flex flex-col gap-2">
              <h3>Payment method</h3>
              <div className="flex flex-col gap-1" onBlur={()=> (validateOnBlurFields("payment"))}>
                <div className="flex gap-2">
                  <input type="radio" 
                        value={"creditCard"} 
                        name="payment" 
                        checked={shippingInfo.payment === "creditCard"} 
                        onChange={(e)=> {
                          setShippingInfo({...shippingInfo, payment: e.target.value})
                        }}
                        id="creditCard"
                  />
                  <label htmlFor="creditCard">Credit Card</label> 
                </div>

                <div className="flex gap-2">
                  <input type="radio" 
                        value={"payPal"} 
                        name="payment" 
                        checked={shippingInfo.payment === "payPal"} 
                        onChange={(e)=> {
                          setShippingInfo({...shippingInfo, payment: e.target.value})
                        }}
                        id="payPal"
                  />
                  <label htmlFor="payPal">PayPal</label> 
                </div>

                <div className="flex gap-2">
                <input type="radio" 
                      value="cashonDelivery" 
                      name="payment" 
                      checked={shippingInfo.payment === "cashonDelivery"} 
                      onChange={(e)=> {
                        setShippingInfo({...shippingInfo, payment: e.target.value})
                      }}
                      id="cashonDelivery"
                />
                <label htmlFor="cashonDelivery">Cash on Delivery</label>
                </div>

              </div>
              {errors.payment ? <p className="text-red-500 text-sm">{errors.payment}</p> : "" }
            </div>

            <div className="flex flex-col md:flex-row gap-5 justify-center">
              <button type="submit" 
                      disabled={isSubmitting}
                      className="w-full md:w-[50%] bg-button text-secondary font-bold rounded-lg p-3 cursor-pointer transition-colors hover:bg-buttonHover duration-200 active:scale-95"
              >       {isSubmitting ? "Placing order..." : "Confirm order"}
              </button>
              <button type="button" onClick={clearForm} className="w-full md:w-[50%] border-2 border-border p-3 font-bold bg-secondary rounded-lg cursor-pointer transition-colors hover:bg-elements duration-200 active:scale-95">Clear</button>
            </div>

          </form>

        </div>

        <div className="flex flex-col gap-5 w-full lg:w-[40%] border-2 border-border rounded-lg bg-elements p-5 lg:p-7">

          <h3>Order summary</h3>

          <div className="grid grid-cols-1">
            {cart.map((product)=> (

              <div key={product.id} className="grid grid-cols-5 gap-1 md:gap-5 items-center border-b-[1px] border-border py-3">
                <div className="w-full md:w-auto rounded-lg flex items-center justify-center">
                  <img src={product.images[0]} alt={product.title} className="aspect-square object-contain p-3"/>
                </div>

                <div className="col-span-2">
                  <p className="line-clamp-2 font-bold text-base md:text-lg">{product.title}</p>
                  <p>{product.category}</p>
                </div>

                <div className="flex flex-col md:flex-row md:gap-2 text-center">
                  <p>Qty:</p>
                  <p>{product.quantity}</p>
                </div>

                {product.discountPercentage >= 12 
                  ? <p className="font-bold text-base md:text-lg">
                      ${(product.price-((product.discountPercentage*product.price)/100)).toFixed(2)}
                    </p>

                  : <p className="font-bold text-base md:text-lg">${product.price}</p>
                }

              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 mx-5">

            <div className="flex justify-between">
              <p className="text-secondaryText">Subtotal</p>
              <p className="font-bold">${subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-secondaryText">Shipping</p>
              <p className="font-bold">{shipping === 0 ? "Free" : "$"+shipping.toFixed(2)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-secondaryText">Discount</p>
              <p className="font-bold text-success">-${discount.toFixed(2)}</p>
            </div>

          </div>

          <p className="border-[1px] border-border my-5"></p>

          <div className="flex justify-around text-2xl font-bold text-button">
            <h4>Total</h4>
            <h4>${total.toFixed(2)}</h4>
          </div>

        </div>

      </div>
      
    </div>
  );
}
