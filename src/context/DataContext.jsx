
import React from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";

// creating data context
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // store products
  const [data, setData] = useState([]);

  // fetch products from DummyJSON API
  const fetchAllProducts = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=100");

      const productsData = res.data.products; // important for DummyJSON
      console.log(productsData);

      setData(productsData);
    } catch (error) {
      console.log(error);
    }
  };

  // function to get unique values (category / brand)
  const getUniqueCategory = (data, property) => {
    let newVal = data?.map((curElem) => {
      return curElem[property];
    });

    newVal = ["All", ...new Set(newVal)];
    return newVal;
  };

  const categoryOnlyData = getUniqueCategory(data, "category");
  const brandOnlyData = getUniqueCategory(data, "brand");

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        fetchAllProducts,
        categoryOnlyData,
        brandOnlyData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// custom hook
export const getData = () => useContext(DataContext);

