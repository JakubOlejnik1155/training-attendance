import * as React from 'react';
import styled from  'styled-components';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import NavTemplate from './Components/NavTemplate';
import {theme} from '../../static/theme';
import { Modal, Button } from 'react-bootstrap';


const Container = styled.div`
    width: 95%;
    max-width: 900px;
    height: 75vh;
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

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    //TODO: check what to do with it
    const handleDateClick = (arg: { dateStr: any; }) => {
        
    }
    const eventClickHandler = (event: any) => {
        setShow(true);
    }

    return (
        <NavTemplate>
            <Container>
                <FullCalendar
                    plugins={[ dayGridPlugin, interactionPlugin  ]}
                    initialView="dayGridMonth"
                    events={[
                        // tmp events 
                        //TODO: change events to fetched events from db or store
                        { title: 'event 1', date: '2020-10-28' },
                        { title: 'event 2', date: '2020-11-01' }
                    ]}
                    dateClick={handleDateClick}
                    height="100%"
                    eventColor="orangered"
                    eventClassNames="event"
                    firstDay={1}
                    eventClick={eventClickHandler}
                />
            </Container>
            

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Attendance list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    tutaj będzie lista obecności
                 </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>


        </NavTemplate>
    )
}

export default Calendar;