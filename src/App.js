import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { Header, MainContainer, CreateContainer,ItemDetail } from "./components";
import { useStateValue } from './context/StateProvider';
import { getAllFashionItems } from './utils/firebaseFunction';
import { actionType } from './context/reducer';

const App = () => {

  const [{ fashionItems }, dispatch] = useStateValue();
  
  const fetchData = async () => {
    await getAllFashionItems().then((data) => {
      // console.log(data);
      dispatch({
        type : actionType.SET_FASHION_ITEMS,
        fashionItems : data,
      });
    });
  };

  // console.log(fashionItem)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    /* exitBeforeEnter :- used to avioid the unwanted bugs. if there are multiple animation is 
      triggering this will avoid the collision between the animation effect
    */
    <AnimatePresence  >
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-16 md:mt-20 px-4 md:px-16 py-4 w-full">

          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path='/itemDetail' element={<ItemDetail/>}/>
          </Routes>

        </main>
      </div>
    </AnimatePresence>
  )
}

export default App