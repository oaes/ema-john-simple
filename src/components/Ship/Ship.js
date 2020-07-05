import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Ship.css';
import { useAuth } from '../Login/UseAuth';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { getDatabaseCart, clearLocalShoppingCart } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Ship = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [shipInfo, setShipInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const auth = useAuth();

  const stripePromise = loadStripe('pk_test_HniRmjYllCu1o9Z67nLp00l600TON0Goy4');

  const onSubmit = data => {
    setShipInfo(data); 
  }

  const handlePlaceOrder = (paymentMethod)=> {
    //TODO; akash move this to payment
    const savedCart = getDatabaseCart();
    const orderDetails = {
      email: auth.user.email,
      cart: savedCart,
      ship: shipInfo,
      paymentMethod: paymentMethod
    };

    fetch('https://still-taiga-80617.herokuapp.com/placeOrder', {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(order => {
        setOrderId(order._id)
        // alert('successfully ordered with order id:', + order._id)
        // processOrder();
        clearLocalShoppingCart();
      })
  }
  return (
    <div className="container">
      <div className="row">
        <div style={{display: shipInfo&& 'none'}} className="col-md-6">
          <h3>Shipment Information</h3>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="name" />
            {errors.name && <span className='error'>Name is required</span>} <br />
            <input defaultValue={auth.user.email} name="email" ref={register({ required: true })} placeholder="email" />
            {errors.email && <span className='error'>email is required</span>} <br />
            <input name="address" ref={register({ required: true })} placeholder="address" />
            {errors.address && <span className='error'>Address is required</span>} <br />
            <input name="city" ref={register({ required: true })} placeholder="city" />
            {errors.city && <span className='error'>city is required</span>} <br />
            <input name="country" ref={register({ required: true })} placeholder="country" />
            {errors.country && <span className='error'>country is required</span>} <br />
            <input name="zip" ref={register({ required: true })} placeholder='zip-code' />
            {errors.zip && <span className='error'>zip-code is required</span>} <br />

            <input type="submit" />
          </form>
        </div>
        <div style={{'margin-top': '200px',display: shipInfo? 'block' : 'none'}} className="col-md-6">
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
               <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
          </Elements>
          <br/>
          {
            orderId &&
            <div>
            <h3 style={{color:'purple'}}>Thank you for shopping with us</h3>
            <p>your order id is: {orderId}</p>
            </div>
            }
        </div>
      </div>
    </div>

  )
};

export default Ship;