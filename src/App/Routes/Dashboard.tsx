import * as React from 'react';
import styled from 'styled-components';

import { theme } from '../../static/theme';
import NavTemplate from './Components/NavTemplate';


const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 600px;
    height: 20%;
    background-color: ${theme.dark};
    color: red;
    z-index: 999;
    box-shadow: 0 0 10px ${theme.dark};
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