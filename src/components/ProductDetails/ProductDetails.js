import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {productKey}= useParams();
    const [product, setProduct] = useState(null);
    
    useEffect(()=> {
        fetch('https://still-taiga-80617.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    },[])


    return (
        <div>
            <h2>product details: {productKey}</h2>
           { 
              product && <Product showAddToCart={false} product={product}></Product>
           }
        </div>
    );
};

export default ProductDetails;