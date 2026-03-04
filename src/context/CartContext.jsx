import React from "react";
import {createContext,useContext,useState} from "react";
import {toast} from "react-toastify";

// create a context fot cart items and give it value null at the starting 
export const CartContext = createContext(null);
// lets make a cart provider
export const CartProvider = ({children})=>{ 
    const [cartItem,setCartItem] = useState([]);
    // making function to add to cart
    const addToCart = (product) => {
      // lets check if the item is already inside the cart
      const itemInCart = cartItem.find((item) => item.id===product.id);
      if(itemInCart) {
         // item is already presetn just update the cart item 
         const updatedCart = cartItem.map((item) =>  
          item.id===product.id ? {...item,quantity:item.quantity+1} :item
        );
         setCartItem(updatedCart);
         toast.success("product quantiy increased");
      }
      else {
          setCartItem([...cartItem,{...product,quantity: 1}])
          toast.success("product is added to the cart");
      }
    }  

    // making function to update the cart items 
    const updateQuantity = (cartItem,productId,action) => {
      setCartItem(cartItem.map(item => {
          if(item.id === productId) {
            let newunit  = item.quantity;
            if(action === "increase") {
               newunit=newunit+1;
               toast.success("Quantity is increased");
            }
            else if (action === "decrease") {
              newunit=newunit-1;
              toast.success("Quantity is decrased");
            } 
            return newunit >0 ? {...item,quantity: newunit} : null;
          } 
          return item;
      }).filter((item) => item!=null));
    }
     
    // function to delete the product 
    const deleteItem = (productId) => {
      setCartItem(cartItem.filter(item => item.id!==productId));
      toast.success("product is deleted from the cart ");
    }

    return <CartContext.Provider value={{cartItem,setCartItem,addToCart,updateQuantity,deleteItem}}>
      {children}
    </CartContext.Provider>
}
// making a custom hook for the cart contextg 
export const useCart = () => useContext(CartContext);