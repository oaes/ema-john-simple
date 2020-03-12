import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    // console.log(props.product);
    const {img,name,seller,price,stock} = props.product;
    return (
        <div className="product">
            <div>
            <img src={img} alt=""/>
            </div>
            <div>
                <h3 className="product-name">{name}</h3>
                <br/>
                <p><small>By:{seller}</small></p>
                <p>Price:${price}</p>
                <br/>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <br/>
                <button 
                onClick={() => props.handleProductAdd(props.product)}
                className="main-btn"
                ><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>    
        </div>
    );
};

export default Product;