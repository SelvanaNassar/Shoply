import './App.css'

import { Route, Routes } from 'react-router-dom'

import Layout from './layout/Layout.jsx';

import {CartProvider} from './Contexts/CartContext.jsx'
import { FavoriteProvider } from './Contexts/FavoriteContext.jsx';

import {Home, Shop, Categories, Deals, Favorites, 
        Cart, Checkout,} from "./pages";
        import Signin from "./pages/Signin.jsx";

import ProductDetails from './components/ProductDetails.jsx'
import CategoryDetails from './components/CategoryDetails'

import { ToastContainer } from 'react-toastify';

function App() {

  return (

    <div>

    <CartProvider>
    <FavoriteProvider>

      <Routes>

        <Route element={ <Layout /> }>

          <Route path='/' element={ <Home/> } />
          <Route path='/shop' element={ <Shop/> } />
          <Route path='/shop/:id' element={ <ProductDetails /> } />
          <Route path='/categories' element={ <Categories/> } />
          <Route path='/categories/:category' element={ <CategoryDetails/> } />
          <Route path='/deals' element={ <Deals/> } />
          <Route path='/favorites' element={ <Favorites/> } />
          <Route path='/cart' element={ <Cart/> } />
          <Route path='/checkout' element={ <Checkout/> } />
          <Route path='/signin' element={ <Signin/> } />
          
        </Route>

      </Routes>

    </FavoriteProvider>
    </CartProvider>

    <ToastContainer autoClose={3000} closeOnClick />
    
    </div>
    
  )
}

export default App
