import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext.js';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';


export default function Cart() {
  let {getCartItems , deleteCartItems , clearCartItems, updateCartItems,createOrders} = useContext(CartContext);
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  async function getItems(){
    let {data} = await getCartItems()
    setCart(data)
    setLoading(false)

  }

  async function deleteItem(id){
    setLoading(true)
    let {data} = await deleteCartItems(id)
    if(data){
      toast.error("The item has been removed.",{
        duration:5000
      })
      let{dataa}=getItems()
      setCart(dataa)
    }else{
      setCart(null)
      clearItems()}
      setLoading(false)
  }
  async function createOrder(){
    setLoading(true)
    let {data} = await createOrders()
    setCart(data)
    setLoading(false)

  }
  async function clearItems(){
    setLoading(true)
    let {data} = await clearCartItems()
    if(data._id){
      toast.error("The Cart has been cleared.",{
        duration:5000
      })
    }
    setCart(null)
    setLoading(false)

  }

  useEffect(()=>{
    getItems()
  },[])

  return <>
  <div className="bg-main-light p-5 mt-5 mb-5 position-relative">
   <h1>Shop Cart:</h1>
   <Helmet>
        <meta charSet="utf-8" />
        <title>Cart</title>
      </Helmet>
    {loading? <div className='loading'>
    <BallTriangle
         height={100}
         width={100}
         radius={5}

         ariaLabel='ball-triangle-loading'
         wrapperStyle={{}}
         wrapperClass="d-flex justify-content-center mt-5"
         visible={true}
      />
    </div>:cart? <>
    
    <p className='text-main'><span className='fw-bolder'>Total Price :</span> {cart?.cartTotal} $</p>
    <button onClick={()=> clearItems()} className='btn btn-danger position-clear'>Clear</button>
    <Link onClick={()=>createOrder()} to={`/shippingaddress/${cart?._id}`} className='btn text-white bg-main position-pay'>Pay Now</Link>

    {cart?.products.map((product,index) => <div key={index} className="row align-items-center p-2 border-1 border-bottom  mb-5 mt-4">
      <div className="col-md-3">
        <div className="img">
          <img src={product.product.image} className='w-100' alt={product.product.name} />
        </div>
      </div>
      <div className="col-md-9">
        <div className="item">
          <h3 className='h5 fw-bold'>{product.product.name}</h3>
          <p className='text-main '><span className='fw-bolder'>Price :</span> {product.price} $</p>
          <button onClick={() => deleteItem(product.product._id)} className='btn bg-danger'><i className='fas fa-trash-can text-white'></i> <span className='text-white'>Remove</span></button>
        </div>
      </div>
      
    </div>)}
    </>:<h2>Your cart is empty....</h2>
    }
  </div>
   
  </>
}
