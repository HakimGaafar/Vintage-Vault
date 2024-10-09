import React, { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/Designer-removebg.png'
import { UserContext } from '../../Context/UserContext.js';
import { CartContext } from '../../Context/CartContext.js';

export default function Navbar() {
  let {userToken , setUserToken } = useContext(UserContext)
  let {getCartItems } = useContext(CartContext);
  const [cart, setCart] = useState(null)
  let navigate = useNavigate()
  async function getItems(){
    let {data} = await getCartItems()
    setCart(data)
  }
  useEffect(()=>{
    getItems()
  },[])
  function logOut(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userID');
    setUserToken(null);
    navigate('/login')
  }
  return <>
    <nav className="navbar navbar-expand-lg   sticky-top ">
      <div className="container">
       <div className="collapse navbar-collapse  " id="navbarSupportedContent"> 
          <Link className="navbar-brand " to={'/'}>
          <img src={logo} alt="fresh cart logo" /><span className='fw-bolder text-white fs-3'>Vintage Vault</span></Link>
        </div>
        <div className={`collapse navbar-collapse ${styles.nav}`} id="navbarSupportedContent">
          <ul className="navbar-nav d-flex justify-justify-content-between align-items-center mb-2 mb-lg-0 ">
            
            {userToken != null?<>
              <li className="nav-item ">
              <Link className="nav-link text-white " to={'/'}>Home</Link>
            </li>
              <li className="nav-item ">
              <Link className="nav-link text-white " to={'allorders'}>Orders</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-white " to={'contactus'}>Contact Us</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link text-white " to={'cart'}><span><i className="fa-solid fa-cart-shopping  "></i>{cart?.numOfCartItems?<div className="cart position-relative">{cart?.numOfCartItems}</div>:''}</span></Link>
            </li>
            </>:null}
            

          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
            
            {userToken != null?<>
              <li className="nav-item">
              <span onClick={logOut} className="nav-link cursor-pointer text-white " >Logout</span>
            </li>
            </>:<>
            <li className="nav-item">
              <Link className="nav-link text-white " to={'register'}>Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white " to={'login'}>Login</Link>
            </li>
            </>}
          </ul>

        </div>
      </div>
    </nav>
  </>
}
