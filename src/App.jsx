import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Layout from './Components/Layout/Layout'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import CounterContextProvider from './Context/CounterContext.js';
import { useContext, useEffect } from 'react';
import { UserContext } from './Context/UserContext.js';
import {Toaster} from 'react-hot-toast'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import ContactUs from './Components/ContactUs/ContactUs.jsx';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard.jsx';
import CheckoutSuccess from './Components/CheckoutSuccess/CheckoutSuccess.jsx';
import AddProduct from './Components/AddProduct/AddProduct.jsx';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct.jsx';
import DeleteProduct from './Components/DeleteProduct/DeleteProduct.jsx';
import ListProducts from './Components/ListProducts/ListProducts.jsx';

export default function App() {
  let routes = createHashRouter([
    { path: '/', element: <Layout />, children: [
      {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'contactus' , element:<ProtectedRoute><ContactUs/></ProtectedRoute>},
      {path:'allorders' , element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
      {path:'add-product' , element:<ProtectedRoute><AddProduct/></ProtectedRoute>},
      {path:'update-product' , element:<ProtectedRoute><UpdateProduct/></ProtectedRoute>},
      {path:'delete-product' , element:<ProtectedRoute><DeleteProduct/></ProtectedRoute>},
      {path:'list-products' , element:<ProtectedRoute><ListProducts/></ProtectedRoute>},
      {path:'admindashboard' , element:<ProtectedRoute><AdminDashboard/></ProtectedRoute>},
      {path:'stripe/complete' , element:<ProtectedRoute><CheckoutSuccess/></ProtectedRoute>},
      {path:'stripe/cancel' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'shippingaddress/:cartId' , element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'shippingaddress' , element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'checkout' , element:<ProtectedRoute><ShippingAddress/></ProtectedRoute>},
      {path:'login' , element:<Login/>},
      {path:'register' , element:<Register/>},
      {path:'/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'*',element:<NotFound/>}

    ] }
  ])

  let {setUserToken} =useContext(UserContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken')){
      setUserToken(localStorage.getItem('userToken'))
      
    }
  },[])
  return <>
  <CounterContextProvider>
    <RouterProvider router={routes}></RouterProvider>
    <Toaster/>
  </CounterContextProvider>
  </>
}


