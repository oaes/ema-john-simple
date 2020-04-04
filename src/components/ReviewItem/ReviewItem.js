import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    const itemStyle = {
        borderBottom:'1px solid lightgray',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px'
    }
    
    return (
        <div style={itemStyle} className='p-item'>
                <h4 className='p-name'>{name}</h4> 
                <p>quantity: {quantity}</p>
                <p><small>${price}</small></p>
                <br/>
                <button onClick = {() => props.removeProduct(key)} 
                className='main-btn'>Remove</button>
        </div>
    );
};

export default ReviewItem;