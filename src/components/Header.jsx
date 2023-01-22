import React, { useState } from 'react'
import Logo from '../images/logo.png'
import Avatar from '../images/avatar.png'
import { motion } from 'framer-motion'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md"
import { Link } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
    
    // integration firebase
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [isMenu, setIsMenu] = useState(false)

    // custom hook  user- object dispatch - func
    const [{ user, cartShow, cartItems }, dispatch] = useStateValue()

    // getting the user email credential
    const login = async () => {
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            })
            // storing the user data to local sotorage so that if we reload the page our data won't get clear.
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        }
        else {
            setIsMenu(!isMenu);
        }
    }
    const logout = () => {
        setIsMenu(false)
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null,
        })
    }

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    }

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-4 md:px-10 bg-primary">
            {/* desktop & tablet */}
            <div className="hidden md:flex w-full h-full item-center justify-between">
                <Link to={'/'} className="flex items-center gap-2">
                    <img src={Logo} className="w-28 object-cover" alt="logo" />
                </Link>

                <div className="flex items-center gap-8 ">
                    <motion.ul initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-8 ml-auto">
                        <Link to={'/'}><li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer " >Home</li></Link>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Deals</li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">Trends</li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">About</li>

                    </motion.ul>

                    <div className="relative flex items-center justify-center" onClick={showCart}>
                        <MdShoppingBasket className="text-textColor text-2xl" />
                        {cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar} alt="userProfile"
                            className='w-10 min-w-[40px] h-10 min-h-[40px] object-cover drop-shadow-xl cursor-pointer rounded-full '
                            onClick={login}
                        />
                        { // if there if isMenu then only render the menu component
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className="w-40 bg-gray-50 shadow-xl rounded-lg felx felx-col absolute top-12 
                                        right-0">
                                    {
                                        user && user.email === "chandanroy1315@gmail.com" && (
                                            <Link to={"./createItem"}>
                                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 
                                                transition-all duration-100 ease-in-out text-textColor text-base" onClick={() => setIsMenu(false)}>New Item <MdAdd /> </p>
                                            </Link>
                                        )
                                    }

                                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 
                                        transition-all duration-100 ease-in-out text-textColor text-base"
                                        onClick={logout}>Logout <MdLogout /> </p>
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>


            {/* mobile */}
            <div className="flex items-center justify-between md:hidden w-full h-full">

                <div className="relative flex items-center justify-center" onClick={showCart}>
                    <MdShoppingBasket className="text-textColor text-2xl" />
                    
                    {cartItems && cartItems.length > 0 && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                        </div>
                    )}
                </div>

                <Link to={'/'} className="flex items-center gap-2">
                    <img src={Logo} className="w-28 object-cover" alt="logo" />
                </Link>
                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar} alt="userProfile"
                        className='w-10 min-w-[40px] h-10 min-h-[40px] object-cover drop-shadow-xl cursor-pointer rounded-full '
                        onClick={login}
                    />
                    { // if there if isMenu then only render the menu component
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg felx felx-col absolute top-12 
                                        right-0">
                                {
                                    user && user.email === "chandanroy1315@gmail.com" && (
                                        <Link to={"./createItem"}>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 
                                                transition-all duration-100 ease-in-out text-textColor text-base" onClick={() => setIsMenu(false)}>New Item <MdAdd /> </p>
                                        </Link>
                                    )
                                }
                                <ul
                                    className="flex flex-col ">
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">Home</li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">Deals</li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">Trends</li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2">About</li>

                                </ul>

                                <p className="m-2 p-2 rounded-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-300 
                                        transition-all duration-100 ease-in-out text-textColor text-base"
                                    onClick={logout}>Logout <MdLogout /> </p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}
//  bg-slate-300 p-6 px-16
export default Header