import React from 'react'
import {useEffect,useState} from "react"
import { DataContext } from '../context/DataContext'
import MidBanner from "../components/MidBanner"
import Carousel from "../components/Carousel";
import Features from "../components/Features"


const Home = () => {
  return (
    <div className="overflow-x-hidden">
          <Carousel />
          <MidBanner />
          <Features />
    </div>
  )
}

export default Home