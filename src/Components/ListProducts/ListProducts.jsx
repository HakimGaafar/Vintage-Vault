import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5500/api/product/',
                    {
                    },{
                        Authorization:`Bearer ${localStorage.getItem('userToken')}`
                    });
                
                setProducts(response.data);
            } catch (error) {
                toast.error('Failed to fetch products',{
                    duration:5000
                  })
            }
        };
        fetchProducts();
    }, []);

    return (
        <form className='my-5'>
            <div className='d-flex justify-content-between align-items-center'>
            <h2>Products List</h2>
            <Link to={"/admindashboard"} className={`btn text-white bg-main  end-0 mx-4 my-4 `}>Back to Dashboard</Link>
            </div>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>ID:</strong> {product._id}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        
                    </li>
                ))}
            </ul>
        </form>
    );
};

export default ProductList;