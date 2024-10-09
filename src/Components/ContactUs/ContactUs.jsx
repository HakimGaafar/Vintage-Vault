import React, {  useContext, useEffect, useState  } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import styles from './ContactUs.module.css'
import {UserContext } from '../../Context/UserContext.js'
import axios from 'axios';
import toast from 'react-hot-toast'

export default function ContactUs() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    let headers ={
      _id: localStorage.getItem('userID'),
      Authorization:`Bearer ${localStorage.getItem('userToken')}`
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const contact =  {name,email,message};
      try {
          const response = await axios.post('http://localhost:5500/api/contacts',contact,
              {
                withCredentials: true,
                headers
              });
  
          if (response.status == 201) {
              toast.success('Message sent!',{
                duration:5000
              })
              setName('');
              setEmail('');
              setMessage('');
          } else {
              toast.error('Failed to send message',{
                duration:5000
              })
              
          }
      } catch (error) {
          toast.error('Failed to send message. Please try again later.',{
            duration:5000
          })
      }
  };
  

    return <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Contact Us</title>
      </Helmet>
      
      
        <section id="contact" className="py-3">
      <div className="container p-3">
        <div className={styles.contacthead }>
          <h2 className="mb-3 fw-bolder fs-1 d-flex justify-content-center">Contact Us.</h2>
        </div>
        <div className={styles.contactbody}  >
          <div className="container">
            <div className="row">
              <div className={`col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 ${styles.hover} d-flex flex-column justify-content-around align-items-center`}>
                <span><i className="fa-solid fa-location-arrow fa-xl"></i></span>
                <h3 className="fw-bold mt-2 mb-2">Address</h3>
                <p>Cairo University - Giza - Egypt</p>

              </div>
              <div className={`col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 ${styles.hover} d-flex flex-column justify-content-around align-items-center`}>
                <span><i className="fa-solid fa-envelope fa-xl"></i></span>
                <h3 className="fw-bold mt-2 mb-2">Email</h3>
                <p>vintagevault00@outlook.com</p>

              </div>
              <div className={`col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 ${styles.hover} d-flex flex-column justify-content-around align-items-center`}>
                <span><i className="fa-solid fa-phone fa-xl"></i></span>
                <h3 className="fw-bold mt-2 mb-2">Phone</h3>
                <p>+20 10 2517 8918</p>

              </div>
            </div>
            <form onSubmit={handleSubmit}>
  <div className={`${styles.form} mt-4`}>
    <div className="d-flex justify-content-around align-items-start" >
      <div className="name w-50 ">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Name" className={`${styles.nooutline} rounded-2`}/>
      </div>
      <div className="email w-50">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className={`${styles.nooutline} rounded-2`}/>
      </div>
    </div>
    <div className="textarea d-flex flex-column justify-content-around align-items-start mt-3">
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} required  placeholder="Message" className={`${styles.nooutline} rounded-2`} cols="30" rows="10"></textarea>
      <button type='submit' className={`${styles.button} mt-3`}>Submit</button>
    </div>
    </div>
  </form>
          </div>
        </div>
      </div>

    </section>
</>


}

