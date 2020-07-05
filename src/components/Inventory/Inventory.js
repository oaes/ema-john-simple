import React from 'react';
import fakeData from '../../fakeData';
const Inventory = () => {
    const handleAddInventory = () =>{
        const product = fakeData[0];
        console.log(fakeData.length);
        fetch('https://still-taiga-80617.herokuapp.com/addProduct', {
                method: 'POST',
                body: JSON.stringify(fakeData),
                headers:{
                    "Content-type": "application/json; charset=UTF-8"
                }
        })
        .then(res => res.json())
        .then(data => {
            console.log('post successful', data);
        })
    }
    return (
        <div>
            <h1>Add Inventory to Sell more...</h1>
            <button onClick={handleAddInventory} >Add Inventor</button>
        </div>
    );
};

export default Inventory;