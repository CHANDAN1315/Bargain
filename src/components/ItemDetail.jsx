import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MdAddShoppingCart } from 'react-icons/md'
import { motion } from 'framer-motion'
import CartContainer from "./CartContainer";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';


const ItemDetail = () => {
  // console.log(item);
  const location = useLocation()
  // console.log(location);
  const [{cartItems,cartShow }, dispatch] = useStateValue();
  
  const [items, setItems] = useState([...cartItems]);

  const url = location.state?.imageURL;
  const category = location.state.category.toUpperCase()


  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items
    });
    localStorage.setItem("cartItems", JSON.stringify(items)) // set the cart items to local storage.
  }


  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <>
      <div className='grid grid-cols lg:grid-cols-2'>

        <div className="h-auto md:ml-10 md:mr-10">
          <img src={url} alt="img" className='rounded-xl  w-[600px]' />
        </div>

        <div className="flex flex-col gap-10 mt-10">
          <div className="flex flex-col mt-4px gap-1">
            <p className='font-mono text-stone-600'>Best Fashion in Market</p>
            <p className='text-4xl text-gray-600 '>{category} FASHION</p>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
          <div className='flex flex-row gap-6'>
            <p className='text-3xl text-textColor font-medium'><span className='text-red-600'>$</span> {location.state.price} USD</p>
            <p>qut : 1</p>
          </div>

          <div className="font-mono text-stone-700 ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam dolores obcaecati officiis porro!
            Fugiat vel vitae quaerat laudantium quo, iusto libero ipsum eligendi voluptatibus pariatur quia harum
            voluptate minima quibusdam!
          </div>

          <motion.button whileTap={{ scale: 0.85 }} type='button' className='bg-gradient-to-br from-amber-400 to-amber-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-xl 
                  transition-all ease-in-out flex flex-row item-center justify-center gap-2' onClick={() => setItems([...cartItems, location.state])}>
            <MdAddShoppingCart className='text-2xl' /><span className='font-semibold'>ADD TO CART</span>
          </motion.button>
        </div>
      </div>

      {cartShow && (
        <CartContainer />
      )};
    </>
  )
}

export default ItemDetail