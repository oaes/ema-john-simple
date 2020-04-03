import React from 'react';
import { useForm} from 'react-hook-form';
import './Ship.css';
import { useAuth } from '../Login/UseAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Ship = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const auth = useAuth();
  const onSubmit = data => {
       console.log(data) }
 //TODO; akash move this to payment
    const savedCart = getDatabaseCart();
    const orderDetails = {email:auth.user.email, cart:savedCart}
    fetch('http://localhost:3200/placeOrder', {
      method:'POST',
      headers: {
          "Content-type": "application/json"
   },
     body:JSON.stringify(orderDetails)
  })
  .then(res => res.json())
  .then(data => {
    alert('successfully ordered with order id:' , + data._id)
    processOrder();
  })

  return (
    
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

      <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="name" />
      {errors.name && <span className='error'>Name is required</span>} <br/>
      <input defaultValue={auth.user.email} name="email" ref={register({ required: true })} placeholder="email" />
      {errors.email && <span className='error'>email is required</span>} <br/>
      <input name="address" ref={register({ required: true })} placeholder="address"/>
      {errors.address && <span className='error'>Address is required</span>} <br/>
      <input name="city" ref={register({ required: true })} placeholder="city" />
      {errors.city && <span className='error'>city is required</span>} <br/>
      <input name="country" ref={register({ required: true })} placeholder="country"/>
      {errors.country && <span className='error'>country is required</span>} <br/>
      <input name="zip" ref={register({ required: true })} placeholder='zip-code'/>
      {errors.zip && <span className='error'>zip-code is required</span>} <br/>
      
      <input type="submit" />
    </form>
  )
};

export default Ship;