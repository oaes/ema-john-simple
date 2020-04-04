import React from 'react';

const Cart = (props) => {
    const cart = props.cart;

    // const total = cart.reduce((total,product) => total + product.price * product.quantity);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;

    }
    let deliver = 0;

    if (total > 35) {
        deliver = 0
    }
    else if (total > 15) {
        deliver = 4.50;
    }
    else if (total > 0) {
        deliver = 11.99;
    }

    const tax = (total / 10).toFixed(2);
    const finalTotal = (total + deliver + Number(tax)).toFixed(2)

    const formateNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length} </p>
            <p>Product Price:{formateNumber(total)}</p>
            <p><small>Shipping Charge: {deliver}</small></p>
            <p><small>Tax + VAT : {tax}</small></p>
            <h3>Total Price : {finalTotal} </h3>
            {
                props.children
            }


        </div>
    );
};


export default Cart;