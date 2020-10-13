import * as React from 'react';


export const Store = React.createContext();


export const StoreProvider = ({children}) => {
    const [store, setStore] = React.useState({
        isUserLogged: false,
        userData: null,
        isDarkMode: false, 
    });
    return (
        <Store.Provider value={{store, setStore}}>
            {children}
        </Store.Provider>
    )
} 
