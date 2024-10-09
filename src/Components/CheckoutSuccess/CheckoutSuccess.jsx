import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation,Link } from 'react-router-dom';
import toast from 'react-hot-toast'

const CheckoutSuccess = () => {
    const location = useLocation();
    function extractStripeSessionId(url) {
        const regex = /session_id=([^&]*)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    
  
    
    const handleSuccess = async () => {
        const currentUrl = window.location.href;
        const sessionId = extractStripeSessionId(currentUrl);
    
        if (sessionId) {
            try {
                const userToken = localStorage.getItem('userToken');
                const userID = localStorage.getItem('userID');
    
                const response = await axios.get(
                    'http://localhost:5500/api/user/stripe/complete',
                    {
                        withCredentials: true,
                        headers: {
                            'stripe-session-id': sessionId,
                            Authorization: `Bearer ${userToken}`,
                            '_id': userID
                        }
                    }
                );
    
                toast.success("Payment was successful and order is completed.", {
                    duration: 5000
                });
            } catch (error) {
                console.error("Error completing order:", error);
                toast.error("Failed to complete the order. Please contact support.", {
                    duration: 5000
                });
            }
        } else {
            toast.error("No session ID found. Please contact support.", {
                duration: 5000
            });
        }
    };
    
    

    

    return <>
<div className='d-flex justify-content-center align-items-center my-5 bg-main rounded-2 mx-auto w-50 text-white h2 p-5'>Your order is being processed.</div>
<Link to={"/"} className='btn d-flex justify-content-center align-items-center my-5 bg-main rounded-2 mx-auto w-25 text-white h2 ' onClick={handleSuccess}>Please Press to Continue</Link>
    </>
};

export default CheckoutSuccess;