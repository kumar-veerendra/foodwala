import React from 'react';

import aboutHero from '../../../assets/images/about-hero.jpg';


function About() {
    return ( 
        <div className='about-hero'> 
            <div className='p-5' style={{color: "gray"}}>
                <h1 style={{color: "black"}}>Delivering a royal feast to your doorsteps</h1><br></br>
                <p>BBK – India’s most loved Biryani & Kebab delivery chain since 2015.</p><br></br>
                <p>Being the Pioneers of delivering Fresh Dum-Cooked Handi Biryanis across the country, Biryani By Kilo takes customer experience up a notch with unique and authentic shaahi andaaz of serving handis of melting flavors. The first ones to introduce ‘handi biryani’ concept and deliver freshly prepared biryani for individual orders.</p>
                <br></br>
                <p>With the presence of 70+ royal dine-in outlets pan India, we have spread arms across 29+ cities - Delhi NCR, Mumbai, Pune, Lucknow, Kolkata, Punjab, Jaipur, Bhubaneswar, Patna, Ranchi,Guwahati, Jamshedpur, Goa & Bangalore, reviving the royal traditions in the hearts of India. Also, we deliver to your doorstep online in 70-90 minutes, after cooking it with time, effort and elegance.</p>
                <br></br>
                <img src={aboutHero} alt="about Hero" />
            </div>

            
        </div>
     );
}

export default About;