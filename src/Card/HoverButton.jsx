import React from 'react';
import { gsap } from 'gsap';

const HoverButton = ({ label }) => {
    const handleMouseEnter = (e) => {
        gsap.to(e.currentTarget, {
            letterSpacing: "0.2em",
            duration: 0.4,
            ease: "expo.out"
        });
    };

    const handleMouseLeave = (e) => {
        gsap.to(e.currentTarget, {
            x: 0,
            scale: 1,
            letterSpacing: "0em",
            // color: "#ffffffff ",
            // textShadow: "0px 0px px #ffffffff",
            duration: 0.3,
            ease: 'power2.inOut',
        });
    };

    return (
        <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className=' transition-colors duration-300 cursor-pointer hover:font-bold'
        >
            {label}
        </button>
    );
};


export default HoverButton;