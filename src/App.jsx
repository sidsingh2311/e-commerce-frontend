// making the e commerece shopsee 
import React from "react";
import { useState,useEffect } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import  Cart from "./pages/Cart"
import axios from "axios";


const App = () => { 

    // in the navbar we need to pass the location and boolean value
    // dropdown which will be used in determiing location 
    const [location,setLocation] = useState();
    const [openDropdown,setOpenDropdown] = useState(false);

    // making function to get the current location 
    const geoLocation =  async () => {
        navigator.geolocation.getCurrentPosition(async pos => {
          // pos coords is used to get the browser location 
          const {latitude,longitude} = pos.coords;
           const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
           try{
             const location = await axios.get(url);
             const exactLocation = location.data.address;
             setLocation(exactLocation);
             setOpenDropdown(false);
             // after the location is fetched close the open drop down 

           }
           catch(error) {
             console.log(error);
           }
        })
    }
 
    useEffect(() => {
        geoLocation();
    },[])

    return (
      <BrowserRouter>
      <Navbar location={location} geoLocation={geoLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/products" element={<Products/>} ></Route>
            <Route path="/cart" element={<Cart/>}></Route>
          </Routes>
          <Footer/>
      </BrowserRouter>
    )
} 

export default App;