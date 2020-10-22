import * as React from 'react';
import {auth} from '../static/firebase';

export const Store = React.createContext();


export const StoreProvider = ({children}) => {
    const [store, setStore] = React.useState({
        isUserLogged: false,
        userData: null,
        isDarkMode: false,
        loading: true,
        arrays: {
            trainings: [],
            competitors: [],
            docId: ''
        }
    });
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email,password)
    }
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const logout = () => {
        return auth.signOut();
    }
    const resetPass = (email) => {
        return auth.sendPasswordResetEmail(email);
    }
    React.useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setStore({...store, isUserLogged: true, userData: user,loading: false })
        })
        return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <Store.Provider value={{
            store,
            setStore,
            signup,
            login,
            logout,
            resetPass
        }}>
            {!store.loading && children}
        </Store.Provider>
    )
}
