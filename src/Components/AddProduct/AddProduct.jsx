import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        owner: '',
        condition:'',
        date:'',
        
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5500/api/product/', product, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            toast.success('Product added',{
                duration:5000
              })
            setProduct({
                name: '',
                price: '',
                description: '',
                image: '',
                owner: '',
                condition:'',
                date:'',
                
            });
            
        } catch (error) {
            toast.error('Failed to add product',{
                duration:5000
              })
        }
        
    };

    return (
        <form  id='formId' onSubmit={handleSubmit}>
            <div className='d-flex justify-content-between align-items-center'>
            <h2>Add Product</h2>
            <Link to={"/admindashboard"} className={`btn text-white bg-main  end-0 mx-4 my-4 `}>Back to Dashboard</Link>
            </div>
            
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={product.name}
                onChange={handleChange}
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
            />
            <input
                type="text"
                name="image"
                placeholder="Image"
                value={product.image}
                onChange={handleChange}
            />
            <input
                type="text"
                name="condition"
                placeholder="Condition"
                value={product.condition}
                onChange={handleChange}
            />
            <input
                type="text"
                name="owner"
                placeholder="Owner"
                value={product.owner}
                onChange={handleChange}
            />
            <input
                type="text"
                name="date"
                placeholder="Date"
                value={product.date}
                onChange={handleChange}
            />
            <button className='btn text-white bg-main' type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;