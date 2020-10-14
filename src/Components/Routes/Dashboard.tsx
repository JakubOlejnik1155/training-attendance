import * as React from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Store } from '../Store';

const Dashboard = () => {
    const {store, logout} = React.useContext(Store)
    const [state, setState] = React.useState({
        error: '',
    });
    const history = useHistory()

    const handleLogOut = async () => {
        setState({...state, error: ''})
        try{
            await logout();
            history.push('/login')
        }catch{
            setState({...state, error: 'Failed to logout'})
        }
    };

    return ( 
        <div className=" w-100 vh-100 d-flex justify-content-center align-items-center">
            <div>
                <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {state.error &&  <Alert variant="danger" className="w-100">{state.error}</Alert>}
                    <strong>Email:</strong> {store.userData.email}
                </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    <Button variant="link" onClick={handleLogOut}> Log Out </Button>
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;