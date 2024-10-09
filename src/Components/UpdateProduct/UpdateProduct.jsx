import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import toast from 'react-hot-toast'

const UpdateProduct = () => {
    
    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        id: '',
    });
    const [id, setId] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5500/api/product/${id}`,
                    {
                    },{
                        Authorization:`Bearer ${localStorage.getItem('userToken')}`
                    });
                setProduct(response.data);
            } catch (error) {
                toast.error('Failed to fetch product',{
                    duration:5000
                  })
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5500/api/product/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            
            toast.success('Product updated',{
                duration:5000
              })
            setProduct({
                name: '',
                price: '',
                description: '',
                
                
            });
            setId('')
        } catch (error) {
            
            toast.error('Failed to update product',{
                duration:5000
              })
        }
    };
    

    return (
        <form id='formId' onSubmit={handleUpdate}>
            <div className='d-flex justify-content-between align-items-center'>
            <h2>Update Product</h2>
            <Link to={"/admindashboard"} className={`btn text-white bg-main  end-0 mx-4 my-4 `}>Back to Dashboard</Link>
            </div>
            <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="ID"
                />
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    placeholder="Name"
                />
                <input
                    type="number"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    placeholder="Price"
                />
            <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
            />
            <button className='btn text-white bg-main' type="submit">Update Product</button>
        </form>
    );
};

export default UpdateProduct;