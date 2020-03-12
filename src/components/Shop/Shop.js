import React from 'react';
import fakeDate from '../../fakeData';
import {useState} from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';


const Shop = () => {
    const first10 = fakeDate.slice(0,10)
    const [products, setProducts] = useState(first10)
    const [cart,setCart] = useState([]);
    


    const handleProductAdd = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
           <div className="product-container">
           <h3></h3>
    
        {
            products.map(pt => <Product 
            handleProductAdd = {handleProductAdd}
            product={pt}>

            </Product>)
        }
        
           </div>
           <div className="cart-container">

            <Cart cart={cart}></Cart>
              
           </div>
        </div>
    );
};

export default Shop;