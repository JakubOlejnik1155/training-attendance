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
const RestorePasswordForm = styled.div`
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
    const [state,  setState] = React.useState('')
    const onChangeHandler = (e: any) => {
            setState(e.target.value)
    }
    return ( 
        <Container>
            <RestorePasswordForm>
                <H1>Reset Password</H1>
                    <Label htmlFor="email">Email</Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="email"
                            value={state}
                            onChange={onChangeHandler}
                            aria-label="email"
                            aria-describedby="login email"
                        />
                    </InputGroup>
                    <Button className="mt-1 mb-1 w-80">Reset Password</Button>
                    <Link to="/login" className="mt-4" >Log In</Link>
            </RestorePasswordForm>
            <GoToLogIn>
                Need an account? <Link to="/register">Sign Up</Link>
            </GoToLogIn>
        </Container>
      );
}
 
export default Register; 