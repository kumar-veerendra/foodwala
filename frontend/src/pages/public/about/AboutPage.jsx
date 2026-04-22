import React from 'react';

import Banner from './Banner';
import Footer from '../../../components/layout/Footer';
import About from './About';
import LeftPart from './LeftPart';
import RightPart from './RightPart';
import Team from './Team';

function AboutPage() {
    return ( 
        <div>
            <Banner />
            <About />
            <LeftPart />
            <RightPart />
            <Team />
        </div>
     );
}

export default AboutPage;