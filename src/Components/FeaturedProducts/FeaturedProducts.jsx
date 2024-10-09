import React, { useContext, useEffect, useState } from 'react';
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast'

import img2 from '../../Assets/images/mt-1291-gallery-img02-bg.jpg'

export default function FeaturedProducts() {
  function getProducts(){
    return axios.get(`http://localhost:5500/api/product`)
  }
  let {data , isLoading , isError , isFetching} = useQuery('featuredProducts', getProducts)
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

 


  return <>
    
    {isLoading?<div className='loading'>
    <div >
      <BallTriangle
         height={100}
         width={100}
         radius={5}

         ariaLabel='ball-triangle-loading'
         wrapperStyle={{}}
         wrapperClass="d-flex justify-content-center mt-5"
         visible={true}
      />
    </div>
    </div>
  :<>
      <div
        className={`${styles.homelayer} `}
      >
        <div
          className=" text-center d-flex flex-column justify-content-evenly align-items-center "
        >
          <div className="container">
            <h3 className="py-3 fs-5 fw-light">ANTIQUE SERVICES</h3>
            <h1
              className="d-flex flex-row justify-content-start align-self-center fw-bolder mb-5 py-3"
            >
              Specializing in Antiques & Collectibles
            </h1>
            <ul className="d-flex justify-content-center align-items-center">
              <a href="#home" className="text-decoration-none">
                <span className="m-2">
                  <i className="fa-brands fa-facebook fa-xl"></i>
                </span>
              </a>
              <a href="#home" className="text-decoration-none">
                <span className="m-2">
                  <i className="fa-brands fa-twitter fa-xl"></i>
                </span>
              </a>
              <a href="#home" className="text-decoration-none">
                <span className="m-2">
                  <i className="fa-brands fa-linkedin fa-xl"></i>
                </span>
              </a>
              <a href="#home" className="text-decoration-none">
                <span className="m-2">
                  <i className="fa-brands fa-instagram fa-xl"></i>
                </span>
              </a>
            </ul>
          </div>
        </div>
      </div>


    <section id="about" className="p-1 h-75">
      <div className="container my-5 p-2">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="about-img mx-auto">
              <img
                src={img2}
                className="w-100 p-4 rounded-5"
              />
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="about-text">
              <h2 className="fw-bolder fs-2 my-4">About Us.</h2>
              <span className="my-3 fw-bold">Welcome to AntiqueStore!</span>
              <p className="my-3 d-flex flex-column justify-content-evenly">
                <span className="my-2">
                  At AntiqueStore, we are passionate about connecting
                  antique enthusiasts with unique and extraordinary pieces of
                  history. With a deep appreciation for the craftsmanship and
                  stories behind every item, we strive to create an online
                  platform that celebrates the beauty and value of antiques.
                </span>
                
                <span className="my-2">
                  Our user-friendly website provides a seamless browsing and
                  shopping experience. You can explore our extensive collection,
                  filter and search for specific items, and read detailed
                  descriptions and historical context for each treasure. We also
                  offer personalized assistance from our knowledgeable customer
                  support team, who are always ready to answer your questions
                  and provide guidance throughout your antique shopping journey.
                </span>
                <span className="my-2">
                  Thank you for choosing AntiqueStore. We look forward to
                  serving you and being a part of your antique collecting
                  experience.
                </span >
                <span className="my-2"> Happy antiquing! </span>
                <span className="my-2"> The AntiqueStore Team </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  <h2 className='fs-1 fw-bolder d-flex justify-content-center align-items-center m-3'>Products.</h2>
  <div className="row gy-4">
  {data?.data.map(product => 
    
    <div key={product._id} className="col-lg-4 p-2">
      
    <div className="product p-2 position-relative">
    <Link to={`/${product._id}`} >
     <img src={product.image} className='w-100' alt={product.name} /> 
      <h3 className='h5 text-black mt-3'>{product.name.split(' ').splice(0,4).join(' ')}</h3>
      <div className="d-flex py-3 justify-content-between align-items-center">
        <span className='font-sm text-black'><span className='fw-bolder'>Price:</span> {product.price} $</span>
        <span className='font-sm text-black'><span className='fw-bolder'>Date:</span> {product.date}</span>
      </div>
      </Link>
      
   <button onClick={()=>postToCart(product._id)} className='btn bg-main text-main-light w-100 btn-sm'><i className="fa-solid fa-plus"></i> Add to cart</button>
    </div>
   
    </div>
    
  )}
  </div>
  </>
  }

  </>
}
