import React from 'react';

import kaushik from '../../../assets/images/kaushik-roy.jpg';
import ritesh from '../../../assets/images/Ritesh-Sir.jpg';
import vishal from '../../../assets/images/VishalJindal.png';


function Team() {
    return ( 
        <div className="container about-hero">
            <div className="row p-5 mt-5 border-top">
                <h1 className=" text-center">
                    Team
                </h1>
            </div>
  
            <div
            className="row p-3 text-muted my-5"
            style={{ lineHeight: "1.8", fontSize: "1.2em" }}
            >
                <div className="col-6 p-3 text-center">
                    <img src={kaushik} style={{borderRadius:"100%", width:"50%"}}/>
                    <h4 className='mt-5'>Kaushik Roy</h4>
                    <h6>Founder & CEO</h6>
                </div>
        
                <div className="col-6 p-3">
                    <p>
                        Ex-Group COO at Zooropa Foods, the investment arm of VC firm SAIF Partner focused on QSR (quick service restaurants) investments has an experience of over two decades in F&B industry and operating over 200 restaurants so far. He has a passion for photography & music.
know more about Kaushik Roy
                    </p>
                    
                </div>
    
            </div>


            <div
            className="row p-3 text-muted my-5"
            style={{ lineHeight: "1.8", fontSize: "1.2em" }}
            >
        
                <div className="col-6 p-3">
                    <p>
                        A diehard foodie with vast entrepreneurial/Private Equity and scaling up expertise, across different businesses & geographies. He previously founded an India-focused private equity fund Carpediem Capital Partners, based in Gurgaon. He is a frequent speaker on start-ups/entrepreneurship and a passionate reader/traveller.
know more about Vishal Jindal
                    </p>
                    
                </div>

                <div className="col-6 p-3 text-center">
                    <img src={vishal} style={{borderRadius:"100%", width:"50%"}}/>
                    <h4 className='mt-5'>Vishal Jindal</h4>
                    <h6>Founder & co CEO</h6>
                </div>
    
            </div>


            <div
            className="row p-3 text-muted my-5"
            style={{ lineHeight: "1.8", fontSize: "1.2em" }}
            >
                <div className="col-6 p-3 text-center">
                    <img src={ritesh} style={{borderRadius:"100%", width:"50%"}}/>
                    <h4 className='mt-5'>Ritesh Shinha</h4>
                    <h6>Cheif Operating Officer</h6>
                </div>
        
                <div className="col-6 p-3">
                    <p>
                        Hotel Management Graduate from IHM Kolkata and PGDBM from ICFAI with over 17 years of experience in the F & B Industry. He has worked with Brands like TGIF, Dominos, Pizza Hut, The Great Kebab Factory, Olive, Sky Gourmet, Barista, and DCK.
know more about Ritesh Sinha
                    </p>
                    
                </div>
    
            </div>

      </div>
     );
}

export default Team;