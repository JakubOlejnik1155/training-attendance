import * as React from 'react';
import firebase from '../../static/firebase';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../static/theme';
import { Store } from '../Store';
import NavTemplate from './Components/NavTemplate';
import { Button, FormControl, ProgressBar } from 'react-bootstrap';

const Container = styled.div`
    width: 95%;
    max-width: 600px;
    padding: 40px;
    border-radius: 5px;
    background-color: ${theme.darkTrans};
    color: white;
    z-index: 900;
    border: 1px solid ${theme.blue};
    box-shadow: 0 0 10px ${theme.blue};
    margin: 50px auto;
    position: relative;
`;
const Header = styled.h1`
    font-size: 2rem;
    display: block;
    text-align: center;
    margin-bottom: 40px;
`;
const Label = styled.p`
    font-size: 1.2rem;
    margin-top: 20px;
`;
const Contact = styled.h2`
    font-size: 1.8rem;
    display: block;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
`;
interface ParamTypes {
    comp: string
  }
interface StateTypes{
    user: {
        name: string,
        surname: string,
        date: string,
        startDate: {
            nanoseconds: number | null,
            seconds: number | null
        },
        group: string,
        email: string,
        phoneDad: string,
        phoneMom: string,
        attendance: number
    },
    isEditionEnabled: boolean
}
const CompetitorData = () => {

    const {store} = React.useContext(Store);
    const [state, setState] = React.useState<StateTypes>({
        user: {
            name: '',
            surname: '',
            date: '',
            startDate: {
                nanoseconds: null,
                seconds: null
            },
            group: '',
            email: '',
            phoneDad: '',
            phoneMom: '',
            attendance: 0
        },
        isEditionEnabled: false
    });
    const {comp} = useParams<ParamTypes>();

    React.useEffect(()=>{
        const getUser = async() => {
            const userArray = comp.split('-');
            const response = await firebase.firestore().collection('users').get();
            response.forEach(doc => {
                if(doc.data().uid === store.userData.uid) {
                  const competitor = doc.data().competitors.find((competitor: { name: string; surname: string; }) => competitor.name === userArray[0] && competitor.surname === userArray[1])
                  setState({...state, user: competitor})
                }
            });
        }
       getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const EditHandler = () => setState({...state, isEditionEnabled: true})
    const onChangeHandler = (e: any) => {
        if(e.target.id === "email")
            setState({...state, user:{...state.user, email: e.target.value}})
        if(e.target.id === "date")
            setState({...state, user:{...state.user, date: e.target.value}})
        if(e.target.id === "group")
            setState({...state, user:{...state.user, group: e.target.value}})
        if(e.target.id === "phone")
            setState({...state, user:{...state.user, phoneDad: e.target.value}})
        if(e.target.id === "phone2")
            setState({...state, user:{...state.user, phoneMom: e.target.value}})
    }
    const confirmEditHalder = async () => {
        let array = store.arrays.competitors;
        const index = array.findIndex((element: { name: string; surname: string; }) => element.name === state.user.name && element.surname === state.user.surname)
        array[index] = state.user;
        await firebase.firestore().collection('users').doc(store.arrays.docId).set({
            uid: store.userData.uid,
            trainings: store.arrays.trainings,
            competitors: array
        })
        setState({...state, isEditionEnabled: false});
    }
    return (
        <NavTemplate>
            <Container>
                <Header>{state.user.name + " " + state.user.surname}</Header>
                {!state.isEditionEnabled && <Button variant='primary' size="sm" className='position-absolute' style={{top: 10, right: 10}} onClick={EditHandler}>edit</Button> }

                <Label>
                    Group:
                    {!state.isEditionEnabled ?  <strong style={{color: `orangered`, marginLeft: '5px'}}>{state.user.group}</strong> : (
                          <FormControl
                            id="group"
                            type="text"
                            value={state.user.group}
                            onChange={onChangeHandler}
                            aria-label="group"
                            aria-describedby="group"
                      />
                    )}
                </Label>
                <Label>
                    Ability date:
                    {!state.isEditionEnabled ?  <strong style={{color: `orangered`, marginLeft: '5px'}}>{state.user.date ? new Date(state.user.date).toLocaleString().split(',')[0] : ""}</strong> : (
                        <FormControl
                            id="date"
                            type="date"
                            value={state.user.date}
                            onChange={onChangeHandler}
                            aria-label="date"
                            aria-describedby="date"
                         />
                    )}
                </Label>
                <Label>
                    Attendance:
                    <strong style={{color: `orangered`, marginLeft: '5px'}}>{Math.floor(state.user.attendance) + "%"}</strong>
                </Label>
                <ProgressBar animated now={Math.floor(state.user.attendance)} label={Math.floor(state.user.attendance) + "%"}/>
                <Contact>Contact</Contact>
                <Label>
                    Email:
                    {!state.isEditionEnabled ? <strong style={{color: `orangered`, marginLeft: '5px'}}>{state.user.email}</strong> : (
                        <FormControl
                            id="email"
                            type="email"
                            value={state.user.email}
                            onChange={onChangeHandler}
                            aria-label="email"
                            aria-describedby="email"
                     />
                    )}
                </Label>
                <Label>
                    Phone:
                    {!state.isEditionEnabled ? <strong style={{color: `orangered`, marginLeft: '5px'}}>{state.user.phoneDad}</strong> : (
                        <FormControl
                            id="phone"
                            type="phone"
                            value={state.user.phoneDad}
                            onChange={onChangeHandler}
                            aria-label="phone"
                            aria-describedby="phone"
                         />
                    )}
                </Label>
                <Label>
                    Second Phone:
                    {!state.isEditionEnabled ? <strong style={{color: `orangered`, marginLeft: '5px'}}>{state.user.phoneMom}</strong> : (
                        <FormControl
                        id="phone2"
                        type="phone"
                        value={state.user.phoneMom}
                        onChange={onChangeHandler}
                        aria-label="phone2"
                        aria-describedby="phone2"
                        />
                    )}
                </Label>

               {state.isEditionEnabled && <Button variant='success' className='mr-auto ml-auto d-block mt-3' onClick={confirmEditHalder}> Confirm </Button>}

            </Container>
        </NavTemplate>
    )
}

export default CompetitorData;