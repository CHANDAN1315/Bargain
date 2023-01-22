// it the main context provider and main supply chain
import React, {createContext, useContext, useReducer} from "react";

// creation of context api. // in my openion no need to export statecontext
export const stateContext = createContext()

export const StateProvider = ({reducer, initialState, children}) => (
    <stateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </stateContext.Provider>
)
// we create our custom hook to update our state values becz every time youdont need to import
// usecontext that particular context name so you dont need to use it like that you can directly
// use our use state value to dispatch and use all the child parameter inside it thats why exporting here over
export const useStateValue = () => useContext(stateContext)
