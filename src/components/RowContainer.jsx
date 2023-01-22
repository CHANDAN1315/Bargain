import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
// import ItemDetail from './ItemDetail'
import { Link } from 'react-router-dom'

const RowContainer = ({ flag, data, scrollValue }) => {
    // console.log(data);
    const rowContainer = useRef()

    
    const [{ cartItems }, dispatch] = useStateValue();
    const [items, setItems] = useState([...cartItems]);

    const addtocart = () => {
        dispatch({
            type: actionType.SET_CARTITEMS,
            cartItems: items
        });
        localStorage.setItem("cartItems", JSON.stringify(items)) // set the cart items to local storage.
    }


    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
        // console.log(rowContainer.current.scrollLeft);
    }, [scrollValue]);


    useEffect(() => {
        addtocart();
    }, [items]);


    return (
        <div ref={rowContainer} className={`w-full flex item-center gap-3 my-8 scroll-smooth ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'}`}>

            {data && data.map((item) => (
                <div
                    key={item.id}
                    className="w-190 min-w-[190px] md:w-225  md:min-w-[225] h-auto bg-cardOverlay rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg">

                    <div className="w-full flex items-center justify-between" >
                        <Link to={'/itemDetail'} state={item}>

                            <motion.img src={item?.imageURL}
                                whileHover={{ scale: 1.2 }} alt="img"
                                className='w-full h-250 md:h-300 rounded-lg cursor-pointer'
                            />
                        </Link >

                    </div>

                    <div className="mt-4">
                        <p className="flex items-center justify-center text-textColor font-semibold text-base md:text lg">{item?.category} Fashion</p>

                        <div className="flex mt-4">
                            <p className="text-lg text-headingColor font-semibold items-end justify-end">
                                <span className='text-sm text-red-500'>$</span>{item?.price}
                            </p>
                            <div className="flex ml-auto">
                                <motion.div whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                                    onClick={() => setItems([...cartItems, item])}
                                >
                                    <MdShoppingBasket className='text-white' />
                                </motion.div>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-start">

                    </div>
                </div>
            ))}

        </div>
    )
}

export default RowContainer
