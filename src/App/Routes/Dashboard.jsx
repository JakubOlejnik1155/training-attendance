import * as React from 'react';
import styled from 'styled-components';

import NavTemplate from './Components/NavTemplate';
import {FormTraining} from './Trainings';
import {CalendarObject} from './Calendar';

const Container = styled.div`
    width: 100%;
    min-height: calc(100vh - 60px);
    padding: 20px;
    z-index: 999;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media(max-width: 990px){
        flex-direction: column;
    }
`;

const CalendarContainer = styled.div`
    height: calc(100vh - 100px);
    @media(max-width: 990px){
        height: auto;
        display: none;
    }
    flex-grow: 1;
    margin-right: 20px;
`;
const TrainingContainer = styled.div`
    height: calc(100vh - 100px);
    flex-grow: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: scroll;
    @media(max-width: 990px){
        height: auto;
        margin-left: 0px;
        width: 100vw;
    }
`;

const Dashboard = () => {

    return (
        <NavTemplate>
            <Container>
               <CalendarContainer>
                    <CalendarObject />
               </CalendarContainer>
               <TrainingContainer>
                    <FormTraining  />
               </TrainingContainer>
            </Container>

        </NavTemplate>
     );
}

export default Dashboard;