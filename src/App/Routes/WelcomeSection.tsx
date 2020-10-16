import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Store } from '../Store';
import { theme } from '../../static/theme';
import image from '../../images/sailing.jpg';
import image1 from '../../images/fitness.jpg';
import image2 from '../../images/rowl.jpg';
import image3 from '../../images/run.jpg';
import image4 from '../../images/surf.jpg';
import image5 from '../../images/tenis.jpg';


const Main = styled.main`
    min-height: 100vh;
    width: 100%;
    position: relative;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    transition: 1s all linear;
`;
const H1 = styled.h1`
    font-size: 4.5rem;
    font-family: 'Lobster', cursive;
    @media(max-width: 780px){
        font-size: 2.9rem;
    }
`;
const H2 = styled.h2`
    font-size: 3rem;
    font-family: 'Poppins';
    font-weight: 100;
    @media(max-width: 780px){
        font-size: 2rem;
    }
`;
const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    background-color: ${props => props.theme.isDarkMode ? theme.dark : theme.lightBlue};
    border: 2px solid ${props => props.theme.isDarkMode ? theme.lightBlue : theme.dark};
    box-shadow: 0px 0px 10px ${theme.dark};
    width: 1500px;
    height: 1250px;
    border-radius: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    transition: all .5s linear;
    &:hover{
        width: 1550px;
        height: 1300px;
        box-shadow: 5px 5px 50px ${theme.dark};
    }
    @media(max-width: 780px){
        left: 50%;
        transform: translate(-50%, -70%);
        background-color: ${props => props.theme.isDarkMode ? theme.darkA : theme.lightBlueA};
    }
`;
const Copy =styled.h4`
    position: absolute;
    bottom: 2px;
    left: 2px;
    font-family: 'Poppins';
    font-weight: 100;
    color: gray;
    font-size: .8rem;
    font-style: italic;
`;
const Button = styled.button`
    padding: 5px 10px;
    font-size: 1rem;
    font-family: 'Poppins';
    font-weight: 100;
    border: none;
    outline: none;
    color: ${theme.lightBlue};
    background-color: black;
    border-radius: 5px;
    transition: all .3s linear;
    &:hover{
        cursor:pointer;
        box-shadow: 0px 0px 10px ${props => props.theme.isDarkMode ? theme.lightBlue : theme.dark};
    }
    @media(max-width: 780px){
        margin-top: 20px;
    }
`;
const ContentContainer = styled.div`
    position: absolute;
    top: 120px;
    width: 600px;
    z-index: 999;
    text-align: center;
    color: ${props => props.theme.isDarkMode ? theme.lightBlue : theme.dark};
    &:hover ~ #booble{
        width: 1550px;
        height: 1300px;
        box-shadow: 5px 5px 50px ${theme.dark};

    }
    @media(max-width: 780px){
        left: 50%;
        top: 50px;
        transform: translate(-50%, 0);
    }
`;

const backgroundArray = [image, image1, image2, image3, image4, image5];


const WelcomeSection = () => {
    const {store} = React.useContext(Store);
    const background: any = React.createRef();

    React.useEffect(()=> {
            background.current.style.backgroundImage = `url(${backgroundArray[Math.floor(Math.random() * (+6 - 0)) + 0]})`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



    return ( 
        <Main theme={store} ref={background}>
            <ContentContainer theme={store}>
                <H1>Training Presence</H1>
                <H2>Regularity is the <br/> key  to success!</H2>
                <Link to="/login" >
                    <Button theme={store} >Try our App</Button>
                </Link>
            </ContentContainer>
            <WelcomeContainer id="booble"  theme={store}/>
            <Copy>©Copyrights: Jakub Olejnik 2020</Copy>
        </Main>
     );
}
 
export default WelcomeSection;