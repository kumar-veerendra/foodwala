import React from 'react';

function Footer() {
    return ( 
        <>
            <footer style={{backgroundColor:"#9a0606", color: "#fff"}}>
            <div className='container border-top pt-5 mb-5'>
                <div className='row'>
                <div className='col footer-upper-links'>
                    <img src="icon.png" alt="icon" style={{height: "100px", width: "100px", borderRadius: "5px"}}/>
                </div>
                <div className='col footer-upper-links mb-5'>
                    <h5>QUICK LINKS</h5>
                    <a href=''>About</a>
                    <a href=''>Bulk Order</a>
                    <a href=''>Media</a>
                    <a href=''>Menu</a>
                    <a href=''>My Orders</a>
                </div>
                <div className='col footer-upper-links'>
                    <h5>SUPPORT</h5>
                    <a href=''>Contact Us</a>
                    <a href=''>FAQs</a>
                    <a href=''>Terms & Conditions</a>
                    <a href=''>About</a>
                    <a href=''>About</a>
                </div>
                <div className='col footer-upper-links'>
                    <h5>FOLLOW US</h5>
                    <a href=''>Facebook</a>
                    <a href=''>Instagram</a>
                    <a href=''>LinkedIn</a>
                    <a href=''>Twitter</a>
                    <a href=''>Facebook</a>
                </div>
                </div>
            </div>

            <div className='footer-upper-links footer-lower-links text-center border-top py-3'>
                <p className="m-0">Copyright &copy; 2025 FoodWala India Pvt Ltd</p>
            </div>
            </footer>

        </>
     );
}

export default Footer;