import * as React from 'react';
import styled from 'styled-components';

import NavTemplate from './Components/NavTemplate';
import {theme} from '../../static/theme';
import { Button, Form, FormControl } from 'react-bootstrap';
import { Store } from '../Store';
import firebase from '../../static/firebase';
import { useHistory } from 'react-router-dom';


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
const Label = styled.p`
    font-size: 1.2rem;
    margin-top: 20px;
`;

interface StateProps{
    group: string,
    groups: any,
    competitors: any,
    success: string
}

const Trainings = () => {
 return(
     <NavTemplate>
         <FormTraining />
     </NavTemplate>
 )
}
export const FormTraining = () =>{
    const history = useHistory();
    const { store, setStore } = React.useContext(Store);
    const [state, setState] = React.useState<StateProps>({
        group: '',
        groups: [],
        competitors: [],
        success: ''
    });
    const onChangeHandler = (event: { target: { id: string; value: any; }; }) => {
        if (event.target.id === 'group')
            setState({ ...state, group: event.target.value })
    }
    const AddTrainingHanler = async () => {
        const arrayOfInputs = document.querySelectorAll('input:checked');
        let array: any[] = [];
        arrayOfInputs.forEach(el => {
            const a = el.id.split(' ');
            const user = state.competitors.find((comp: { name: string; surname: string; }) => comp.name === a[0] && comp.surname === a[1])
            user && array.push(user)
        })
        const training = {
            competitors: array,
            date: new Date(),
            title: state.group
        }
        const newArray = store.arrays.trainings;
        newArray.push(training);

        let newCompetitorsArray: { name: any; surname: any; precent: number; }[] = [];
        state.competitors.filter((e: { group: string; }) => e.group === state.group).forEach((comp: { startDate: number; group: string; name: any; surname: any; }) => {
            let afterStartArray = [];
            let counter = 0;
            newArray.forEach((training: { date: number; title: string; competitors: any[]; }) => {
                if (training.date > comp.startDate && training.title === comp.group)
                    afterStartArray.push(training);
                if (training.competitors.find((c: { name: any; surname: any; }) => c.name === comp.name && c.surname === comp.surname))
                    counter++;
            });
            const percentage = counter / afterStartArray.length * 100;
            newCompetitorsArray.push({
                name: comp.name,
                surname: comp.surname,
                precent: percentage
            })
        })
        let newAttendancesCompetitorsArray: { name: any; surname: any; attendance: number; }[] = [];
        state.competitors.forEach((comp: { name: any; surname: any; attendance: number; }) => {
            newCompetitorsArray.forEach(newAtt => {
                if (newAtt.name === comp.name && newAtt.surname === comp.surname)
                    comp.attendance = newAtt.precent;
            })
            newAttendancesCompetitorsArray.push(comp);
        })


        await firebase.firestore().collection('users').doc(store.arrays.docId).set({
            uid: store.userData.uid,
            trainings: newArray,
            competitors: newAttendancesCompetitorsArray
        })
        setStore({ ...store, arrays: { ...store.arrays, trainings: newArray, competitors: newAttendancesCompetitorsArray } })
        setState({ ...state, success: 'Trainig have been added' })
        setTimeout(() => {
            history.push('/dashboard')
        }, 3000)
    }

    React.useEffect(() => {
        const getUser = async () => {
            const response = await firebase.firestore().collection('users').get();
            let user: any;
            response.forEach(doc => {
                if (doc.data().uid === store.userData.uid) {
                    user = doc.data()
                }
            });
            return user;
        }
        getUser().then(user => {
            let array: any[] = [];
            user.competitors.forEach((element: { group: any; }) => {
                const flag = array.find(e => e === element.group)
                !flag && array.push(element.group);
            })
            setState({ ...state, groups: array, competitors: user.competitors, group: array[0] })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Container>
            <H1>New Training:</H1>
            <Label>
                Date:
                <strong style={{ color: `orangered`, marginLeft: '5px' }}>{new Date().toLocaleDateString()}</strong>
            </Label>
            <Label>
                Group:
                    <FormControl
                    id="group"
                    as="select"
                    value={state.group}
                    onChange={onChangeHandler}
                    aria-label="title"
                    aria-describedby="title"
                    className="w-50 d-inline ml-3"
                >
                    {state.groups.map((group: {} | null | undefined) => <option key={`"${group}"`}>{group}</option>)}
                </FormControl>
            </Label>
            <Label>
                Competitors:</Label>
            <Form>
                {state.competitors.filter((e: { group: string; }) => e.group === state.group).map((element: { name: string; surname: string; }) => (
                    <div className="checkboxContainer" key={element.name + ' ' + element.surname} >
                        <Form.Check id={element.name + ' ' + element.surname} type="checkbox" className="checkbox" />
                        <label className="labelForCompetitor" htmlFor={element.name + ' ' + element.surname}>{element.name + ' ' + element.surname}</label>
                    </div>
                ))}
            </Form>

            {state.success && (
                <p style={{ color: 'greenyellow', fontSize: '18px', textAlign: 'center' }}>{state.success}</p>
            )}
            <div className="w-100 d-flex justify-content-center align-items-center mt-4">
                <Button variant="primary" onClick={AddTrainingHanler} disabled={state.success ? true : false}>
                    Start New Trening
                </Button>
            </div>
        </Container>
    )
}


export default Trainings;