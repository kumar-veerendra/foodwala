import React from 'react';

import aboutLeft1 from '../../../assets/images/about-left1.jpg';


function LeftPart() {
    return ( 
        <div>
            <div className='row px-5 my-5 about-hero'>
                <div className='col px-5'>
                    <img src={aboutLeft1} alt="left"  style={{height: "400px"}}/>
                </div>
                <div className='col mt-5 px-5' style={{color: "gray"}}>
                    <h3 style={{color: "black"}}>Our Mission</h3> <br></br>
                    <p>Reviving the essence of dum cooking in organic handis with epic flavors of India- Hyderabadi, Lucknowi, Kolkata, Guntur, and Nilgiri Biryani, Melt-in-mouth Kababs, Lazeez Kormas, Dal Makhani, Phirni & much more; we embellish a royal feast experience to our guests.</p> <br></br>

                    <p>BBK delivers both authentic taste of Hyderabadi (Kutchi) and Lucknowi (Pukki) Biryani prepared in individual earthen Handis with the freshest ingredients.</p>
                </div>
            </div>
        </div>
     );
}

export default LeftPart;