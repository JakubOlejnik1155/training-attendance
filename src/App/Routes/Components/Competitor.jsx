import * as React from 'react';
import styled from 'styled-components';
import deleteIcon from '../../../images/delete.svg';

const Container = styled.div`
    width: 100%;
    background-color: white;
    color: black;
    border-radius: 5px;
    margin: 10px 0;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const Button = styled.button`
    padding: 5px;
    height: 100%;
    border: none;
    outline: none;
    border-radius: 0 4px 4px 0;
    background-color: rgb(212,58,47);
    transition: .3s all linear;
    &:hover{
        background-color: tomato;
    }
`;
const Attendance = styled.span`
    color: ${props => {
        if(props.at >= 60) return 'green'
        if(props.at > 40) return 'orange'
        return 'red'
    }};
    margin-left: auto;
    margin-right: 30px;
`;




const Competitor= ({ name, surname, attendance}) => {
    return (
        <Container>
            <span>
                <strong>{name + ' '}</strong>
                <i>{surname}</i>
            </span>
            <Attendance at={attendance}>
                {attendance}%
            </Attendance>
            <Button>
                <img src={deleteIcon} alt="bin" width="30" height="30"/>
            </Button>
        </Container>
     );
}

export default Competitor;