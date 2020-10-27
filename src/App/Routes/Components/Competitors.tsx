import * as React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import styled from 'styled-components';

import { theme } from '../../../static/theme';
import Competitor from './Competitor';
import NavTemplate from './NavTemplate';
import firebase from '../../../static/firebase';
import { Store } from '../../Store';


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
const Error = styled.p`
    margin: 0 auto;
    color: red;
`;

const Competitors = () => {

    const {store, setStore} = React.useContext(Store);
    const nameRef = React.useRef<HTMLInputElement>(document.createElement("input"));
    const surnameRef = React.useRef<HTMLInputElement>(document.createElement("input"));
    const groupRef = React.useRef<HTMLInputElement>(document.createElement("input"));
    const [state, setState] = React.useState({
        name: '',
        surname: '',
        group: '',
        date: '',
        error: ''
    })
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const changeHandler = (e:any) => {
        if (e.target.name === "name")
            setState({ ...state, name: e.target.value })
        if (e.target.name === "surname")
            setState({ ...state, surname: e.target.value })
        if (e.target.name === "group")
            setState({ ...state, group: e.target.value })
        if (e.target.name === "date")
            setState({ ...state, date: e.target.value })
    }
    const AddHandler = async (name: string, surname: string, group: string, date: string ) => {
        nameRef.current.style.boxShadow = '';
        surnameRef.current.style.boxShadow = '';
        groupRef.current.style.boxShadow = '';
        // is similar user allready registered in competitors
        const flag  = store.arrays.competitors.find((_element: any) => _element.name === name );
        if(flag) return setState({...state, error: 'this competitor already exists'})
        if (!name){ 
            nameRef.current.style.boxShadow = '0 0 5px red';
            return setState({...state, error: 'enter name'});
        }
        if (!surname) {
            surnameRef.current.style.boxShadow = '0 0 5px red';
            return setState({...state, error: 'enter surname'});
        }
        if (!group) {
            groupRef.current.style.boxShadow = '0 0 5px red';
            return setState({...state, error: 'enter group'});
        }
        const array = [...store.arrays.competitors,{name, surname, group, date, attendance: 0, startDate: new Date(), phoneDad:'', phoneMom:'', email: ''}]
        await firebase.firestore().collection('users').doc(store.arrays.docId).set({
            uid: store.userData.uid,
            trainings: store.arrays.trainings,
            competitors: array
        })
        setStore({
            ...store,
            arrays: {
                trainings: store.arrays.trainings,
                docId: store.arrays.docId,
                competitors: array
            }
        })
        setState({name: '',
            surname: '',
            group: '',
            date: '',
            error: ''
        });
        setShow(false);
    }

    return(
        <NavTemplate>
            <Container>
                <H1>Competitors:</H1>
                {store.arrays.competitors.map( (competitor: { name: any; surname: any; attendance: any; }) => (
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
                    <Form.Control ref={nameRef} className="mb-2" type='text' name="name" value={state.name} onChange={changeHandler}/>
                     <Form.Label>Surname</Form.Label>
                    <Form.Control ref={surnameRef} className="mb-2" type='text' name="surname" value={state.surname} onChange={changeHandler}/>
                     <Form.Label>Group</Form.Label>
                    <Form.Control ref={groupRef} className="mb-2" type='text' name="group" value={state.group} onChange={changeHandler}/>
                    <Form.Label>Ability date</Form.Label>
                    <Form.Control  className="mb-2" type='date' name="date" value={state.date} onChange={changeHandler}/>
                 </Modal.Body>
                <Modal.Footer>
                    {state.error && <Error>{state.error}</Error>}
                    <Button variant="warning" onClick={handleClose}>
                        Cancel
                     </Button>
                    <Button variant="success" onClick={() => AddHandler(state.name.trim(), state.surname.trim(), state.group.trim(), state.date)}>Add</Button>
                </Modal.Footer>
            </Modal>

        </NavTemplate>
    )
}

export default Competitors;