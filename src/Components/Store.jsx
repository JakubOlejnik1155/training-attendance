import * as React from 'react';
import {auth} from '../static/firebase';

export const Store = React.createContext();


export const StoreProvider = ({children}) => {
    const [store, setStore] = React.useState({
        isUserLogged: false,
        userData: null,
        isDarkMode: false, 
        loading: true,
    });
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email,password)
    }
    React.useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setStore({...store, isUserLogged: true, userData: user,loading: false })
        })
        return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Store.Provider value={{store, setStore, signup}}>
            {!store.loading && children}
        </Store.Provider>
    )
} 
