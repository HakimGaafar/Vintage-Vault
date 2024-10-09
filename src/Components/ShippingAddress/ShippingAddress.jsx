import React, { useContext, useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShippingAddress.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext.js';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';

export default function ShippingAddress() {
  const navigate = useNavigate();
  const { checkOutSession, orderCompleted, extractStripeSessionId, getCartItems } = useContext(CartContext)
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  async function checkOut(values) {
    const saveAddressResult = await save_address(values);
    if (!saveAddressResult.success) {
        return;
    }
    try {
        
        let { data } = await checkOutSession();

        if (data?.url) {
            window.location.href = data.url;
            const stripe_session_id = extractStripeSessionId(data.url);
            orderComplete(stripe_session_id);
        } else {
            toast.error("There's an error with the server.", { duration: 5000 });
        }
    } catch (err) {
        toast.error("Checkout session creation failed.", { duration: 5000 });
    }
}
  async function orderComplete(stripe_session_id){
    let {data}=await orderCompleted(stripe_session_id)
    if(data?.message){
      navigate("/stripe/complete")
      toast.success(data.message,{
        duration:5000
      })
    }
  }

async function save_address(values) {
  setLoading(true);
  try {
      const { data: responseData } = await axios.put('http://localhost:5500/api/user/save-address', values, {
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json',
              _id: localStorage.getItem('userID'),
              Authorization: `Bearer ${localStorage.getItem('userToken')}`
          }
      });


      if (responseData._id) {
          setLoading(false);
          return { success: true };
      } else {

          setLoading(false);
          return { success: false, message: 'Unexpected response format' };
      }
  } catch (err) {

      if (err.response && err.response.status === 400) {
        setLoading(false);
          toast.error('Invalid input detected.', { duration: 5000 });
          return { success: false, message: 'Invalid input detected.' };
      } else {
          setApiError(err.response.data);
          setLoading(false);
          return { success: false, message: 'An error occurred' };
      }
  }
}


  let formik = useFormik({
    initialValues: {
      address: '',
      phone: ''
    },
    validationSchema: Yup.object({
      address: Yup.string()
       .required('Address is required')
       .min(5, 'Address must be at least 5 characters'),
      phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/,'Enter an egyptian number'),
      
    }),
    onSubmit: checkOut
  })
  return <>
  <Helmet>
        <meta charSet="utf-8" />
        <title>Shipping Address</title>
      </Helmet>
    
    <div className="w-75 mx-auto mt-4">
    <form onSubmit={formik.handleSubmit}>
    {apiError? <div className="alert alert-danger">{apiError}</div> : null}
  <label htmlFor="address">Address</label>
  <input type="text" id='address' name='address' className='form-control mb-3' onChange={formik.handleChange} required/>
  <label htmlFor="phone">Phone</label>
  <input type="tel" id='phone' name='phone' className='form-control mb-3' onChange={formik.handleChange} required/>
  {loading? (
          <button type='button' className='btn bg-main text-light mb-1 mt-4 w-100 d-flex justify-content-center align-items-center'>
            <BallTriangle className='d-flex justify-content-center' height={25} width={25} color='#fff'  ariaLabel='ball-triangle-loading' visible={true} />
          </button>
        ) : (
          <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-light mb-1 mt-4 w-100'  type='submit'>Checkout</button>
        )}
  
</form>
    </div>
  </>
}