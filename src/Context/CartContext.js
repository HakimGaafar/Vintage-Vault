import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext()
export default function CartContextProvider(props){

    let headers ={
        'Content-Type': 'application/json',
        _id: localStorage.getItem('userID'),
        Authorization:`Bearer ${localStorage.getItem('userToken')}` 
    }
    function addToCart(productId){
        return axios.post(`http://localhost:5500/api/user/add-to-cart`,
        {
           "cart":[
            {
                "_id":productId,
                "count":1
            }
           ] 
        },{
            withCredentials: true,
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)

    }
    function createOrders(){
        return axios.post(`http://localhost:5500/api/user/cart/cash-order`,
            {
                "ONLINE":true
            },{
                withCredentials: true,
                headers
            })
            .then((response)=>response)
        .catch((err)=>err)
    }
    function extractStripeSessionId(url) {
        const regex = /session_id=([^&]*)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    function checkOutSession(){
        return axios.post(`http://localhost:5500/api/user/stripe/checkout`,
        {},{
            withCredentials: true,
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)

    }
    function orderCompleted(id){
        return axios.get(`http://localhost:5500/api/user/stripe/complete?stripe-session-id=${id}`,
        {},{
            withCredentials: true,
            headers,
            "stripe-session-id":id
        })
        .then((response)=>response)
        .catch((err)=>err)

    }
    function getCartItems(){
        return axios.get(`http://localhost:5500/api/user/cart`,
        {
            withCredentials: true,
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)

    }
    function getOrders(){
        return axios.get(`http://localhost:5500/api/user/get-orders`,
        {
            withCredentials: true,headers
            })
        .then((response)=>response)
        .catch((err)=>err)

    }
    function deleteCartItems(productId){
        return axios.put(`http://localhost:5500/api/user/remove-product`,
        {
            "productId":productId
           },
            {
                withCredentials: true,
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)
    }
    function clearCartItems(){
        return axios.delete(`http://localhost:5500/api/user/empty-cart`,
        {
            withCredentials: true,
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)

    }
    function updateCartItems(productId,count){
        return axios.put(`http://localhost:5500/api/carts/${productId}`,{
           count
        },
        {
            withCredentials: true,
            headers
        })
        .then((response)=>response)
        .catch((err)=>err)

    }

    return <CartContext.Provider value={{addToCart,getCartItems, deleteCartItems , clearCartItems ,updateCartItems, checkOutSession,createOrders,getOrders,orderCompleted,extractStripeSessionId}}>
        {props.children}
    </CartContext.Provider>


}