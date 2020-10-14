import * as React from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../static/theme';


const Container = styled.main`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${theme.lightBlue}
`;
const LoginForm = styled.div`
    padding: 70px 50px 35px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    max-width: 500px;
    border: 2px solid ${theme.dark};
    border-radius: 5px;
    position: relative;
    @media(max-width: 700px){
        width: 85%;
    }
`;
const H1 = styled.div`
    background-color: ${theme.lightBlue};
    padding: 5px 20px;
    font-size: 3rem;
    font-family: 'Lobster', cursive;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate( -50% , -60%);
`;
const Label = styled.label`
    margin-right: auto;
    font-size: 1.1rem;
`;
const GoToSignUp = styled.div`
    margin-top: 7px;
`;


const Login = () => {
    const [state,  setState] = React.useState({
        email: '',
        password: ''
    })
    const onChangeHandler = (e: any) => {
        if(e.target.id === "email") 
            setState({...state, email: e.target.value})
        if(e.target.id === "password") 
            setState({...state, password: e.target.value})
    }
    return ( 
        <Container>
            <LoginForm>
                <H1>Log In</H1>
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
                    <Button className="mt-1 mb-1 w-50">Log In</Button>
                    <Link to="/forgot-password" className="mt-4">Forgot Password?</Link>
            </LoginForm>
            <GoToSignUp>
                Need an account? <Link to="/register">Sign Up</Link>
            </GoToSignUp>
        </Container>
      );
}
 
export default Login; 