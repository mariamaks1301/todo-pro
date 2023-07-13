import { createContext, useState } from "react";

export const CustomContext = createContext();

export const Context = (props) => {

    const [user, setUser] = useState({
        email: ''
    })

    const logOutUser = () => {
        localStorage.removeItem('user')
        setUser({
            email: ''
        })
    }

    const [status, setStatus] = useState('all');
    

    const value = {
        user: user,
        setUser: setUser,
        logOutUser,
        status, 
        setStatus,
    }

    return  <CustomContext.Provider value={value}>
                {props.children}
            </CustomContext.Provider>
}