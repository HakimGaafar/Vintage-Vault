import React from 'react';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import img from '../../Assets/images/error.svg'

export default function NotFound() {
  return <>
  <div className="d-flex flex-column justify-justify-content-evenly align-items-center mt-3">
  <img src={img} alt="Error 404 Page Not Found" />
  <p className='fw-bold fs-1'>Oops!</p>
  <p className='fw-bold fs-3'>The page that you're looking for doesn't exist....</p>
  <Link to={'/'} className='bg-main btn text-white'>Back to homepage</Link>

  </div>
    
  </>
}
