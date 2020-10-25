import * as React from 'react';
import NavTemplate from './Components/NavTemplate';
import styled from  'styled-components';
import {theme} from '../../static/theme';


const Container = styled.div`
    width: 95%;
    max-width: 600px;
    padding: 20px;
    border-radius: 5px;
    background-color: ${theme.darkTrans};
    color: white;
    z-index: 900;
    border: 1px solid ${theme.blue};
    box-shadow: 0 0 10px ${theme.blue};
    margin: 50px auto;;
`;



const Calendar = () => {
    return (
        <NavTemplate>
            <Container>
                Here will be your calendar
            </Container>
        </NavTemplate>
    )
}

export default Calendar;