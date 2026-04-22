import React from 'react';

import DishCard from '../../../components/dish/DishCard'
import '../../../App.css'

import dessert1 from '../../../assets/images/dessert1.jpg';
import dessert2 from '../../../assets/images/dessert2.jpg';
import dessert3 from '../../../assets/images/dessert3.jpeg';
import dessert4 from '../../../assets/images/dessert4.jpeg';


function Dessert() {
    return ( 
        <>
            <div className='main-container border-top mb-5 p-5'>
                <h1>Dessert</h1>
                <div className='product'>
                    <DishCard 
                        image={dessert1}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                    <DishCard 
                        image={dessert2}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                    <DishCard 
                        image={dessert3}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                    <DishCard 
                        image={dessert4}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                </div>
            </div>
        </>
     );
}

export default Dessert;