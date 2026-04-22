import React from 'react';

import './../../App.css';

function DishCard(props) {
    return ( 
        <>   
            <div className='card'>
                <img src={props.image} alt="" />
                <div className='description'>
                    <h2>{props.name}</h2>
                    <p className='price'>{props.newPrice} <span className='old-price'>{props.oldPrice}</span></p>
                    <p className='recipe'>{props.explain}</p>
                    <button className='btn' onClick={() => alert("Add Item")}>Add &nbsp;+</button>
                </div>
            </div>
        </>
                
     );
}

export default DishCard;