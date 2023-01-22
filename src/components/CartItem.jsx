import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
let items = [{name: 'chandan'}];

const CartItem = ({ item, setFlag, flag }) => {

  const [qty, setQty] = useState(item.qty);
  const [{ cartItems }, dispatch] = useStateValue()  // it is a  custom useReducer hook: a hook which has object of intialstate of various thing and a dispatch method for changes. 
  // in useStateValue cartItem is intial state and dispatch method for reducer func

  const cartDispatch = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS, // action type 
      cartItems: items,               // new state updated both are send to reducer func and reducer fun is used by usereducer hook to set the stateProvider value
    });
  }


  const updateQty = (action, id) => {
    if (action === "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag +1)
        }
      });
      cartDispatch();
    }
    else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty === 1) {
        items = (cartItems.filter((item) => item.id !== id));
        setFlag(flag +1)
        cartDispatch();
      }
      else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag +1)
          }
          return 0;
        });
        cartDispatch();
      }
    }
  };


  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (

    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex item-center gap-2">
      <img src={item?.imageURL}
        alt="img"
        className='w-20 h-20 max-w-[60px] rounded-lg object-contain' />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.category}</p>
        <p className="text-sm block text-gray-300 font-semibold">${parseFloat(item?.price) * qty}</p>
      </div>

      {/* button section */}
      <div className="group flex item-center gap-2 ml-auto cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty("remove", item?.id)}>
          <BiMinus className="text-gray-50" />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQty("add", item?.id)}>
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  )
}

export default CartItem