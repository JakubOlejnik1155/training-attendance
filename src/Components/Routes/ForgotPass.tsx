import * as React from 'react';
import { InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../static/theme';
import { Store } from '../Store';


const Container = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${theme.dark};
    color: white;
`;
const RestorePasswordForm = styled.div`
    padding: 70px 50px 35px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    max-width: 500px;
    border: 2px solid ${theme.blue};
    box-shadow: 0px 0px 10px ${theme.blue};
    border-radius: 5px;
    position: relative;
    @media(max-width: 700px){
        width: 85%;
    }
`;
const H1 = styled.div`
    background-color:${theme.dark};
    padding: 5px 20px;
    font-size: 2.1rem;
    font-family: 'Lobster', cursive;
    position: absolute;
    top: 0;
    left: 50%;
    text-align: center;
    transform: translate( -50% , -60%);
`;
const Label = styled.label`
    margin-right: auto;
    font-size: 1.1rem;
`;
const GoToLogIn = styled.div`
    margin-top: 7px;
`;


const Register = () => {
    const {resetPass, store} = React.useContext(Store);
    const history = useHistory();
    const [state,  setState] = React.useState({
        email: '',
        error: '',
        success: '',
        loading: false,
    })
    const onChangeHandler = (e: any) => {
            setState({...state, email: e.target.value})
    }
    const handleResetPassword = async () => {
        const {email} = state;
        if(email === '') return setState({...state, error: 'Enter email'});
        try{
            setState({...state, error: '', loading: true});
            await  resetPass(email)
            return setState({...state, success: 'Check your inbox for further instructions'});
        }catch(e){
            return setState({...state, error: 'Failed to Reset Pass'});
        }
    }
    React.useEffect(()=>{
        if(store.userData)
            history.push('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return ( 
        <Container>
            <RestorePasswordForm>
                <H1>Reset Password</H1>
                {state.error && <Alert variant="danger" className="w-100">{state.error}</Alert>}
                {state.success && <Alert variant="success" className="w-100">{state.success}</Alert>}
                    <Label htmlFor="email">Email</Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="email"
                            value={state.email}
                            onChange={onChangeHandler}
                            aria-label="email"
                            aria-describedby="login email"
                        />
                    </InputGroup>
                    <Button 
                        className="mt-1 mb-1 w-80"
                        onClick={handleResetPassword}
                    >
                        Reset Password
                    </Button>
                    <Link to="/login" className="mt-4" >Log In</Link>
            </RestorePasswordForm>
            <GoToLogIn>
                Need an account? <Link to="/register">Sign Up</Link>
            </GoToLogIn>
        </Container>
      );
}
 
export default Register; 