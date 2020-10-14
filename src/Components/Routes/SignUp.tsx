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
const RegisterForm = styled.div`
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
    background-color: ${theme.dark};
    padding: 5px 20px;
    font-size: 3rem;
    font-family: 'Lobster', cursive;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate( -50% , -60%);
    width: 200px;
    text-align: center;
    @media(max-width: 365px){
        width: 200px;
        text-align: center;
        font-size: 2.7rem;
    }
`;
const Label = styled.label`
    margin-right: auto;
    font-size: 1.1rem;
`;
const GoToLogIn = styled.div`
    margin-top: 7px;
`;
const Info = styled.span`
    font-weight: 100;
    color: #dc3545;
    font-size: 12px;
    font-style: italic;
    margin-left: 5px;
`;

const Register = () => {
    const emailRef = React.useRef<HTMLInputElement | null>(null);
    const {signup, store} = React.useContext(Store);
    const history = useHistory();
    const [state,  setState] = React.useState({
        email: '',
        password: '',
        password2: '',
        passwordMessage: '',
        password2Message: '',
        error: '',
        loading: false,
    })
    const onChangeHandler = (e: any) => {
        if(e.target.id === "email") {
            setState({...state, email: e.target.value})
            if(state.email.length > 6 && state.email.includes('@') && state.email.includes('.')){
               e.target.style.border = '2px solid limegreen';
            }else if(state.email.length === 1){
                e.target.style.border = '1px solid #ced4da'
            }
            else{
                e.target.style.border = '2px solid #dc3545';
            }
        }
        if(e.target.id === "password") {
            if(state.password.length > 5 ){
                e.target.style.border = '2px solid limegreen';
                setState({...state, password: e.target.value, passwordMessage: ''})
            }else if(state.password.length === 1){
                e.target.style.border = '1px solid #ced4da';
                setState({...state, password: e.target.value})
            }
            else if(state.password.length > 1){
                e.target.style.border = '2px solid #dc3545';
                setState({...state, passwordMessage: 'minimum 6 charakters long', password: e.target.value})
            }else{
                setState({...state, password: e.target.value})
            }
        }
        if(e.target.id === "password2") {
            if(state.password2.length > 5 && e.target.value === state.password){
                e.target.style.border = '2px solid limegreen';
                setState({...state, password2: e.target.value, password2Message: ''})
            }else if(e.target.value.length === 0){
                e.target.style.border = '1px solid #ced4da';
                setState({...state, password2: e.target.value})
            }else if(state.password2.length > 1 || e.target.value !== state.password){
                e.target.style.border = '2px solid #dc3545';
                setState({...state, password2Message: 'passwords do not match', password2: e.target.value})
            }else{
                setState({...state, password2: e.target.value})
            }
        }
    }
    const signUpHandler = async () =>{
        const {email, password, password2} = state;
        if(password !== password2 && password !== '') return setState({...state, error: 'passwords do not match'});
        if(email === '') return setState({...state, error: 'Enter email'});
        try{
            setState({...state, error: '', loading: true});
            await  signup(state.email, state.password)
            history.push('/dashboard');
        }catch{
            return setState({...state, error: 'Failed to create an account'});
        }
    }
    React.useEffect(()=>{
        if(store.userData)
            history.push('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return ( 
        <Container>
            <RegisterForm>
                <H1>Sign Up</H1>
                    {state.error && <Alert variant="danger" className="w-100">{state.error}</Alert>}
                    <Label htmlFor="email">Email</Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="email"
                            ref={emailRef}
                            value={state.email}
                            onChange={onChangeHandler}
                            aria-label="email"
                            aria-describedby="login email"
                        />
                    </InputGroup>
                    <Label htmlFor="password">Password <Info>{state.passwordMessage && state.passwordMessage}</Info></Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="password"
                            type="password"
                            value={state.password}
                            onChange={onChangeHandler}
                            aria-label="password"
                            aria-describedby="password"
                        />
                    </InputGroup>
                    <Label htmlFor="password2">Password Confirmation <Info>{state.password2Message && state.password2Message}</Info></Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            id="password2"
                            type="password"
                            value={state.password2}
                            onChange={onChangeHandler}
                            aria-label="password2"
                            aria-describedby="password"
                        />
                    </InputGroup>
                    <Button 
                        disabled={state.loading}
                        className="mt-1 mb-1 w-50"
                        onClick={signUpHandler}
                    >Sign Up</Button>
            </RegisterForm>
            <GoToLogIn>
               Already have an account? <Link to="/login">Log In</Link>
            </GoToLogIn>
        </Container>
      );
}
 
export default Register; 