import React from 'react'
import {useEffect} from "react";
import { getData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const Category = () => { 
    
    // making the use of usenavigate
    const navigate = useNavigate();
    // getting the data from the data context api
    const {data} = getData();
     // making function to get the unqiue value 
      const getUniqueCategory = (data,property) => {
          let newvalue  = data?.map((curelem) => {
            return curelem[property];
          }) 
          newvalue = [...new Set(newvalue)];
          return newvalue;
      }
     const getcategoryOnlyData = getUniqueCategory(data,"category");

  return (
       <div className='bg-[#101829]'>
       <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4'>
        {
            getcategoryOnlyData?.map((item, index)=>{
                return <div key={index}>
                    <button onClick={()=>navigate(`/category/${item}`)} className='uppercase bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer'>{item}</button>
                </div>
            })
        }
       </div>
    </div>
  )
}

export default Category