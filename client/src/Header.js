import React from 'react';
import logo from './imgs/PlantWaterer.png'; // Tell webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return (
    
  <img src={logo} style={{ maxHeight: "100%", maxWidth: "100%" }}  alt="Logo" />
  )
}

export default Header;