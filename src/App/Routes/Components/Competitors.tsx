import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
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

    const [state, setState] = React.useState({
        name: '',
        surname: '',
        group: '',
        date: ''
    })
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const chaneHandler = (e:any) => {
        if (e.target.name === "name")
            setState({ ...state, name: e.target.value })
        if (e.target.name === "surname")
            setState({ ...state, surname: e.target.value })
        if (e.target.name === "group")
            setState({ ...state, group: e.target.value })
        if (e.target.name === "date")
            setState({ ...state, date: e.target.value })
    }
    //TODO: make adding competitor function
    const AddHandler = (name: string, surname: string, group: string, date: string ) => {
        console.log({name, surname, group, date});
        setState({name: '',
            surname: '',
            group: '',
            date: ''});
        setShow(false);
    }

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
                    <Button variant="primary" onClick={handleShow}>
                        Add New One
                    </Button>
                </div>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Competitor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <Form.Label>Name</Form.Label>
                    <Form.Control className="mb-2" type='text' name="name" value={state.name} onChange={chaneHandler}/>
                     <Form.Label>Surname</Form.Label>
                    <Form.Control className="mb-2" type='text' name="surname" value={state.surname} onChange={chaneHandler}/>
                     <Form.Label>Group</Form.Label>
                    <Form.Control className="mb-2" type='text' name="group" value={state.group} onChange={chaneHandler}/>
                    <Form.Label>Ability date</Form.Label>
                    <Form.Control className="mb-2" type='date' name="date" value={state.date} onChange={chaneHandler}/>
                 </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancel
                     </Button>
                    <Button variant="success" onClick={() => AddHandler(state.name, state.surname, state.group, state.date)}>Add</Button>
                </Modal.Footer>
            </Modal>

        </NavTemplate>
    )
}

export default Competitors;