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
const LoginForm = styled.div`
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
    font-size: 3rem;
    font-family: 'Lobster', cursive;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate( -50% , -60%);
    @media(max-width: 365px){
        font-size: 2.7rem;
    }
`;
const Label = styled.label`
    margin-right: auto;
    font-size: 1.1rem;
`;
const GoToSignUp = styled.div`
    margin-top: 7px;
`;


const Login = () => {

    const {login, store} = React.useContext(Store);
    const history = useHistory();
    const [state,  setState] = React.useState({
        email: '',
        password: '',
        error: '',
        loading: false
    })
    
    const onChangeHandler = (e: any) => {
        if(e.target.id === "email") 
            setState({...state, email: e.target.value})
        if(e.target.id === "password") 
            setState({...state, password: e.target.value})
    }
    const loginHandler = async () =>{
        const {email, password} = state;
        if(email === '') return setState({...state, error: 'Enter email'});
        if(password === '') return setState({...state, error: 'Enter password'});
        try{
            setState({...state, error: '', loading: true});
            await  login(email, password)
            history.push('/dashboard');
        }catch(e){ 
            return setState({...state, error: 'Failed to Log In'});
        }
    }
    React.useEffect(()=>{
        if(store.userData)
            history.push('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return ( 
        <Container>
            <LoginForm>
                <H1>Log In</H1>
                {state.error && <Alert variant="danger" className="w-100">{state.error}</Alert>}
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
                    <Label htmlFor="password">Password</Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="password"
                            type="password"
                            value={state.password}
                            onChange={onChangeHandler}
                            aria-label="password"
                            aria-describedby="password email"
                        />
                    </InputGroup>
                    <Button 
                        className="mt-1 mb-1 w-50"
                        onClick={loginHandler}
                    >Log In</Button>
                    <Link to="/forgot-password" className="mt-4">Forgot Password?</Link>
            </LoginForm>
            <GoToSignUp>
                Need an account? <Link to="/register">Sign Up</Link>
            </GoToSignUp>
        </Container>
      );
}
 
export default Login; 