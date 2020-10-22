import * as React from 'react';
import styled from 'styled-components';

import { theme } from '../../static/theme';
import NavTemplate from './Components/NavTemplate';


const Container = styled.div`
    width: 80%;
    max-width: 600px;
    padding: 20px;
    border-radius: 5px;
    height: 20%;
    background-color: ${theme.darkTrans};
    color: white;
    z-index: 999;
    border: 1px solid ${theme.blue};
    box-shadow: 0 0 10px ${theme.blue};
`;



const Dashboard = () => {

    return (
        <NavTemplate>
            <Container>
                siema siema
                saxaxsax
                asxasx
            </Container>

        </NavTemplate>
     );
}

export default Dashboard; 