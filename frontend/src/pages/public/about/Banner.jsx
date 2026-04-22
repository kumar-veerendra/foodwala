import React from 'react';

import aboutBanner from '../../../assets/images/about-banner.jpg';

function Banner() {
    return ( 
        <div className='scroll-container'>
            <img src={aboutBanner} alt="Banner" />
        </div>
     );
}

export default Banner;