import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Store } from './Store';


 
const PrivateRoute = ({component: Component, ...rest}) => {
    const {store} = React.useContext(Store)
    return ( 
        <Route
            {...rest}
            render={props => store.userData ? <Component {...props} /> : <Redirect to="/login" />}
        >

        </Route> 
    );
}
 
export default PrivateRoute;