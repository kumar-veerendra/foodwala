import React from 'react';

import aboutRight1 from '../../../assets/images/about-right1.jpg';


function RightPart() {
    return ( 
        <div>
            <div className='row px-5 my-5 about-hero'>
                
                <div className='col mt-5 px-5' style={{color: "gray"}}>
                    <h3 style={{color: "black"}}>Our Promise</h3> <br></br>
                    <p>We strictly use premium ingredients like basmati rice specially aged around 2 years, pure spices handpicked from Kerala, and most stringently selected meats & vegetables for the Biryanis & Kebabs..</p> <br></br>
                    <p>BBK Biryanis Specially cooked on dum, inside the same dough-sealed earthen pot you get delivered, to retain its natural quintessence.</p> <br></br>

                    <p>BBK uses world-class technologies, processes & systems to ensure the best quality, standardization & hygiene.</p> <br></br>
                </div>
                <div className='col px-5'>
                    <img src={aboutRight1} alt="left"  style={{height: "400px"}}/>
                </div>
            </div>
        </div>
     );
}

export default RightPart;