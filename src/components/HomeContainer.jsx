import React from 'react'
import banner from '../images/banner2.png'

const HomeContainer = () => {
  return (
    
    <section className="grid grid-cols-1 md:grid-cols-2 bg-primary content-end lg:px-20 rounded-2xl" id='home'>
      <div className="py-2 flex-1 flex flex-col items-start mt-20 gap-6 ">

        <p className="text-[2.5rem] lg:text-[3.5rem] font-bold tracking-wide text-amber-600 ">WELCOME TO{" "}<span className='text-stone-800 text-[3.5rem] lg:text-[4.5rem]'>FASHION{" "}</span>STORE</p>
        
        <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque corporis tempore
          omnis cupiditate, consequuntur dicta nisi! Aperiam minus soluta eligendi libero nam rerum,
          necessitatibus ex, atque, accusantium nulla eius nobis.
        </p>
        <button type='button' className='bg-gradient-to-br from-amber-400 to-amber-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg 
                    transition-all ease-in-out duration-100'>Shop Now</button>
      </div>
      <img src={banner} alt="banner" className="ml-auto w-300 h-400 lg:w-400 lg:h-600 " />

    </section>
  )
}

export default HomeContainer