import * as React from 'react';
import styled from  'styled-components';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button } from 'react-bootstrap';

import NavTemplate from './Components/NavTemplate';
import {theme} from '../../static/theme';
import firebase from '../../static/firebase';
import { Store } from '../Store';


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

interface StateProps {
    train: any,
    events: any,
    obj: any
}

const Calendar = () => {
    return (
        <NavTemplate>
            <CalendarObject />
        </NavTemplate>
    )
}

export const CalendarObject = () =>{

    const { store } = React.useContext(Store);
    const [show, setShow] = React.useState(false);
    const [state, setState] = React.useState<StateProps>({
        train: [],
        events: [],
        obj: null
    });
    const handleClose = () => setShow(false);
    const eventClickHandler = (info: any) => {
        const date = new Date(info.event._instance.range.start).toLocaleDateString();
        const object = state.train.find((t: { title: any; date: any; }) => {
            return t.title === info.event.title && new Date(t.date.seconds * 1000).toLocaleDateString() === date;
        });
        setState({ ...state, obj: object });
        setShow(true);
    }

    React.useEffect(() => {
        const getTrainings = async () => {
            const response = await firebase.firestore().collection('users').get();
            let array: { title: any; date: string; competitors: any; }[] = [];
            response.forEach(doc => {
                if (doc.data().uid === store.userData.uid) {
                    doc.data().trainings.forEach((element: { date: { seconds: number; }; title: any; competitors: any; }) => {
                        const dateArray = new Date(element.date.seconds * 1000).toLocaleDateString("en-US").split('/');
                        array.push({
                            title: element.title,
                            date: dateArray[2] + '-' + dateArray[0] + '-' + dateArray[1],
                            competitors: element.competitors
                        })
                    });
                    setState({ ...state, train: doc.data().trainings, events: array })
                }
            });
        }
        getTrainings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return(
        <>
            <Container>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={state.events}
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
                    <Modal.Title>
                        group: <span style={{ color: 'orangered' }}>{state.obj && state.obj.title}</span> {", "}
                        date: <span style={{ color: 'orangered' }}>{state.obj && new Date(state.obj.date.seconds * 1000).toLocaleDateString()}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 style={{ fontStyle: 'italic', color: `${theme.blue}` }}>Attendance List:</h4>
                    {state.obj && state.obj.competitors.map((comp: { name: string; surname: string; }) => (
                        <p style={{ textAlign: `center` }} key={comp.name + comp.surname}><strong>{comp.name + " "}</strong> <i>{comp.surname}</i></p>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Calendar;