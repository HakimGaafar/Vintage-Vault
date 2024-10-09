import React, { useContext, useEffect , useState } from 'react';
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast'

export default function ProductDetails() {

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true)
  let {id} = useParams()
  async function getProductDetails(id){
  try{  let {data} = await axios.get(`http://localhost:5500/api/product/${id}`)
    setDetails(data)
    setLoading(false)}
    catch(error){
      toast.error("Error fetch product details.",{
        duration:5000
      })
      setLoading(false)
    }
  }
  let {addToCart} = useContext(CartContext)
  async function postToCart(id){
    let {data} = await addToCart(id);
    if(data?._id){
      toast.success("Item has been added.",{
        duration:5000
      })
    }else{
      toast.error("Item has been already added.",{
        duration:5000
      })
    }

  }
  useEffect(()=>
  {
    getProductDetails(id)
  },[])
  return <>
    <h2 className=' mt-5'>Product Details</h2>
    {loading?<>
    <div >
      <BallTriangle
         height={100}
         width={100}
         radius={5}

         ariaLabel='ball-triangle-loading'
         wrapperStyle={{}}
         wrapperClass="d-flex justify-content-center"
         visible={true}
      />
    </div></>
  :<>
  <div className="row align-items-center">
    <div className="col-md-4">
    
      <img src={details.image} key={details._id} className='w-100 h-75 mt-3' alt={details.name}/> 
    
    </div>
    <div className="col-md-8">
      <div className="details">
      <h3 className='h5'>{details.name}</h3>
      <p className='py-3'>{details.description}</p>
      <span className='font-sm text-main'><span className='fw-bolder'>Date:</span> {details.date}</span><br />
      <span className='font-sm text-main'><span className='fw-bolder'>Category:</span> {details.category}</span><br />
      <span className='font-sm text-main'><span className='fw-bolder'>Condition:</span> {details.condition}</span>
      <div className="d-flex py-3 justify-content-between align-items-center">
    
        <span className='font-sm'><span className='fw-bolder'>Price:</span> {details.price} $</span>
      </div>
      <button onClick={()=>postToCart(details._id)} className='btn bg-main text-main-light w-100 btn-sm text-white'><i className="fa-solid fa-plus"></i> Add to cart</button>
      </div>
    </div>
  </div>

  </>
  }

  </>
}
