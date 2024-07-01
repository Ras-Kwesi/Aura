import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    // const [theme, setTheme] = useState("light");
    // const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user,setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((user) => {
                if(user) {
                    setIsLoggedIn(true);
                    setUser(user);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }            
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false);
        })
    }, [])    // dependency array is empty - Dependency array is what the hook looks at to see if it needs to re-run. 
              // Here there is nothing, so it only runs once at the bengining of componenets lifecycle
    return (
        <GlobalContext.Provider
            value = {{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >

            {children}

        </GlobalContext.Provider>
    )
}