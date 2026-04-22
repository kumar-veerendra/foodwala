import React from 'react';

import Map from './Map';

function Office() {
    return ( 
        <div className='about-hero my-5'>
            <div className='row'>
                <div className='col mt-5'>
                    <h1>Head Office</h1> <br></br>
                    <h3>Sky Gate Hospitality Pvt. Ltd.</h3>
                    <p style={{color: "gray"}}>Unit 205&206, 2nd floor,
                        Vatika Professional Point, Golf Course Ext Rd,
                        Sector 66, Gurugram,
                        Haryana: 122002
                    </p>
                    <h4>Phone: +91 9555-212-212</h4>
                </div>

                <div className='col mb-5'>
                    <Map />
                </div>
            </div>
        </div>
     );
}

export default Office;