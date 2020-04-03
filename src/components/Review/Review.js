import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/UseAuth';
const Review = () => {
const [cart, setCart] = useState([]);
const auth = useAuth();

const RemoveProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey)
    setCart(newCart);
    removeFromDatabaseCart(productKey)
}
useEffect(()=>{
//cart's data
const savedCart = getDatabaseCart();
const productKeys = Object.keys(savedCart);
fetch('http://localhost:3200/getProductsByKey',{
    method:'POST',
    headers: {
        "Content-type": "application/json"
 },
   body:JSON.stringify(productKeys)
})
.then(res => res.json())
.then(data => {
    console.log(data);
    const cartProducts = productKeys.map(key => {
        const product = data.find(pd => pd.key === key)
        product.quantity = savedCart[key];
        return product;
    });
    setCart(cartProducts);  
})
 }, [])

    
    return (
        <div className='twin-container'>
        <div className='product-container'>
                <h2>cart items: {cart.length}</h2>
                {cart.map(pd => <ReviewItem key = {pd.key} RemoveProduct = {RemoveProduct} product={pd}></ReviewItem>)}
                
        
                {
                    !cart.length && <h1>Your cart is empty!!! <a href="/shop">keep shoppi</a></h1>
                }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <Link to='ship'>
           {     
            auth.user ?
           <button className="main-btn">Proceed Checkout</button>
           :<button className="main-btn">Login to Proceed </button>
           
           }
                </Link>
            </Cart>
        </div>
        </div>
    );
};

export default Review;