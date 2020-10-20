import * as React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import { theme } from '../../../static/theme';
import Competitor from './Competitor';
import NavTemplate from './NavTemplate';


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
const H1 = styled.h1`
    text-align: center;
    font-family: 'Lobster', cursive;
    margin-bottom: 20px;
`;

//TODO: chnge this data to data fetched from firebase
//!temporrary data
const data = [
    {
        name: 'Wiktor',
        surname: 'Chmielewski',
        sportsAbilityDate: '11.02.2020',
        group: 'C1',
        attendance: 98
    },
    {
        name: 'Maks',
        surname: 'Olejniczak',
        sportsAbilityDate: '05.09.2020',
        group: 'C1',
        attendance: 58
    },
    {
        name: 'Michał',
        surname: 'Śliwka',
        sportsAbilityDate: '05.09.2020',
        group: 'C2',
        attendance: 33
    }
]




const Competitors = () => {
    return(
        <NavTemplate>
            <Container>
                <H1>Competitors:</H1>
                {data.map( competitor => (
                    <Competitor
                        key={competitor.name+competitor.surname}
                        name={competitor.name}
                        surname={competitor.surname}
                        attendance={competitor.attendance}
                    />
                ))}
                <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                    <Button variant="primary">
                        Add New One
                    </Button>
                </div>
            </Container>

        </NavTemplate>
    )
}

export default Competitors;