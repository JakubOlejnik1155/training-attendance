import * as React from 'react';
import styled from 'styled-components';

import { theme } from '../../static/theme';
import NavTemplate from './Components/NavTemplate';
import firebase from '../../static/firebase';
import { Store } from '../Store';


const Container = styled.div`
    width: 80%;
    max-width: 600px;
    padding: 20px;
    border-radius: 5px;
    height: 20%;
    background-color: ${theme.darkTrans};
    color: white;
    z-index: 999;
    border: 1px solid ${theme.blue};
    box-shadow: 0 0 10px ${theme.blue};
`;



const Dashboard = () => {

    const {store, setStore} = React.useContext(Store)

    React.useEffect(()=>{

        const GetData  = async () => {
            const response = await firebase.firestore().collection('users').get();
            let flag = false;
            response.forEach(doc => {
                if(doc.data().uid === store.userData.uid) {
                    flag = true;
                    setStore({...store, arrays: {
                        competitors: doc.data().competitors,
                        trainings: doc.data().trainings
                    }})
                }
            });
            !flag && firebase.firestore().collection('users').add({
                uid: store.userData.uid,
                competitors: [],
                trainings: []
            })

        }
        GetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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