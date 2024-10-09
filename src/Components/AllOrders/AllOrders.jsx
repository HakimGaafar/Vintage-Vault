import React , { useContext, useEffect, useState }from 'react';
import styles from './AllOrders.module.css';
import { CartContext } from '../../Context/CartContext.js';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom';

export default function AllOrders() {
  let {getOrders} = useContext(CartContext);
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState(null)
  async function getOrder(){
  try{let {data} = await getOrders()
  setOrders(data)
  setLoading(false)}
  catch(error){
    toast.error('Error fetching orders data',{
      duration:5000
    })
  setLoading(false);
  }  
    
  }

  useEffect(()=>{
    getOrder()
  },[])
  return <>
  <div className="bg-main-light p-5 mt-5 mb-5 position-relative">
   <h1>All Orders:</h1>
   <Helmet>
        <meta charSet="utf-8" />
        <title>Orders</title>
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
    </div>:orders? <>
    
    <p className='text-main'><span className='fw-bolder'>Total Orders :</span> {orders?.length}</p>
    {orders?.map((product,index) => <div key={product._id} className="row align-items-center p-2 border-1 border-bottom  mb-5 mt-4">
      <div className="col-md-2 d-flex justify-content-center align-items-center">
        <p className='fw-bolder'>{index+1}</p>
      </div>
      <div className="col-md-4">
        <span className='fw-bolder'>Number of items:</span> {product.products.length}
      </div>
      <div className="col-md-6">
        <div className="item">
          <h3 className='h5'><span className='fw-bolder'>Order Status:</span> {product.paymentIntent.status}</h3>
          <p className='text-main '><span className='fw-bolder'>Total :</span> {product.paymentIntent.amount} $</p>
        </div>
      </div>
      
    </div>)}
    </>:<h2>You Don't Have Any Orders Yet....</h2>
    }
  </div>
   
  </>
}
