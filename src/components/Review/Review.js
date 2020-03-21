import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
const Review = () => {
const [cart, setCart] = useState([]);
const [orderPlaced, setOrderPlaced] = useState(false);

const handlePlaceOrder = () => {
   
    setCart([]);
    setOrderPlaced(true);
    processOrder();
}

const RemoveProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey)
    setCart(newCart);
    removeFromDatabaseCart(productKey)
}
useEffect(()=>{
//cart's data
const savedCart = getDatabaseCart();
const productKey = Object.keys(savedCart);
const cartProducts = productKey.map(key => {
    const product = fakeData.find(pd => pd.key === key)
    product.quantity = savedCart[key];
    return product;
});
//console.log(cartProducts);
setCart(cartProducts);
 }, [])

 let thankYou;
 if(orderPlaced){
     thankYou =  <img src={happyImage} alt=""/>
 }

    
    return (
        <div className='twin-container'>
        <div className='product-container'>
                <h2>cart items: {cart.length}</h2>
                {cart.map(pd => <ReviewItem key = {pd.key} RemoveProduct = {RemoveProduct} product={pd}></ReviewItem>)}
                {
                    thankYou
                }
        </div>
        <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handlePlaceOrder} className="main-btn" >place Order</button>
            </Cart>
        </div>
        </div>
    );
};

export default Review;