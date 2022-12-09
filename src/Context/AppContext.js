import { useContext } from "react";
import { createContext, useState } from "react";




export const AppContext = createContext()


export const AppProvider = ({children})=>{
    const [cartCount, setCartCount] = useState(0)


    return <AppContext.Provider
    value={{
        cartCount, setCartCount
    }}
    >
        {children}
    </AppContext.Provider>
}


export const useAppContext = ()=>useContext(AppContext)
