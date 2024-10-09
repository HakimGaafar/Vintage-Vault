import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserContextProvider from './Context/UserContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext.js';


let queyClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <CartContextProvider>
    <UserContextProvider>
        <QueryClientProvider client={queyClient}>
          <App />
        </QueryClientProvider>
        
    </UserContextProvider>
    </CartContextProvider>
    
    
);
