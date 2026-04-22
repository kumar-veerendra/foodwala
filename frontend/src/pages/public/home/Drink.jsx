import React from 'react';

import DishCard from '../../../components/dish/DishCard'
import '../../../App.css'

import drink1 from '../../../assets/images/drink1.jpg';
import drink2 from '../../../assets/images/drink2.jpg';
import drink3 from '../../../assets/images/drink3.jpg';
import drink4 from '../../../assets/images/drink4.jpg';
import drink5 from '../../../assets/images/drink5.jpg';
import drink6 from '../../../assets/images/drink6.jpg';


function Drink() {
    return ( 
        <>
            <div className='main-container border-top mt-5'>
                <h1 className='mt-5 '>Drink</h1>
                <div className='product'>
                    <DishCard 
                        image={drink1}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                    <DishCard 
                        image={drink2}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                    <DishCard 
                        image={drink3}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                    <DishCard 
                        image={drink4}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                    <DishCard 
                        image={drink5}
                        name="Paneer Tikka Roll"
                        newPrice="₹99"
                        oldPrice="₹100"
                        explain="Juicy paneer tikka wrapped in soft flaky paratha with crunchy laccha pyaaz and tangy chutney."
                    />
                    <DishCard 
                        image={drink6}
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

export default Drink;