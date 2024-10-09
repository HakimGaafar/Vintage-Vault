import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'

const DeleteProduct = () => {
    const [productId, setProductId] = useState('');

    const handleDelete = async () => {
        try {
            if (productId) {
                const response = await axios.delete(`http://localhost:5500/api/product/${productId}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`
                    }
                });
                toast.error('Product deleted successfully',{
                    duration:5000
                  })
                setProductId(''); // Clear the input after deletion
            } else {
                toast.error('Please enter a product ID',{
                    duration:5000
                  })
            }
        } catch (error) {
            
            toast.error('Failed to delete product. Please check the ID and try again.',{
                duration:5000
              })
        }
    };
    
    return (
        <div className="delete-product-container">
            
            <form onSubmit={handleDelete} className='my-5'>
            <div className='d-flex justify-content-between align-items-center'>
            <h2>Delete Product</h2>
            <Link to={"/admindashboard"} className={`btn text-white bg-main  end-0 mx-4 my-4 `}>Back to Dashboard</Link>
            </div>
            <input
            className='form-control  mb-4'
                type="text"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
            />
            <button className='btn text-white bg-main d-block mt-3' type='submit'>Delete</button>
            </form>
        </div>
    );
};

export default DeleteProduct;