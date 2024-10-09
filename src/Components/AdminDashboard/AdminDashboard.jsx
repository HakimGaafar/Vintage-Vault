import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminDashboard.module.css';
import { Navigate,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        recentContacts: [],
        recentOrders: [],
        recentUsers: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
        });
        setDashboardData(response.data);
        setLoading(false);
      } catch(error) {
        toast.error('Error fetching dashboard data',{
            duration:5000
          })
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const { recentContacts, recentOrders, recentUsers } = dashboardData;

    return (
        <div className={`${styles.admin_dashboard} position-relative`}>
            <h1>Admin Dashboard</h1>
            <div className='d-flex justify-content-evenly align-items-center'>
            <Link to={"/add-product"} className={`btn text-white bg-main  `}>Add Product</Link>
            <Link to={"/update-product"} className={`btn text-white bg-main  `}>Update Product</Link>
            <Link to={"/delete-product"} className={`btn text-white bg-main  `}>Delete Product</Link>
            <Link to={"/list-products"} className={`btn text-white bg-main  `}>List Products</Link>
            </div>
            

            <section>
                <br />
                <h2>Recent Contacts</h2>
                {recentContacts.map(contact => (
                    <div key={contact._id}>
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <p><strong>Date:</strong> {new Date(contact.date).toLocaleString()}</p>
                        <p><strong>Message:</strong> {contact.message}</p>
                        <hr />
                    </div>
                ))}
            </section>

            <section>
                <h2>Recent Orders</h2>
                {recentOrders.map(order => (
                    <div key={order._id}>
                        <p><strong>ID:</strong> {order._id}</p>
                        <p><strong>Status:</strong> {order.orderStatus}</p>
                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <hr />
                    </div>
                ))}
            </section>

            <section>
                <h2>Recent Users</h2>
                {recentUsers.map(user => (
                    <div key={user._id}>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Date Joined:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                        <hr />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default AdminDashboard;
