import * as React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import firebase from '../../../static/firebase';
import { theme } from '../../../static/theme';
import { Store } from '../../Store';
import logo from '../../../images/yes.svg'
import image from '../../../images/sailing.jpg';
import image1 from '../../../images/fitness.jpg';
import image2 from '../../../images/rowl.jpg';
import image3 from '../../../images/run.jpg';
import image4 from '../../../images/surf.jpg';
import image5 from '../../../images/tenis.jpg';

const backgroundArray = [image, image1, image2, image3, image4, image5];
const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
    background-color: ${theme.dark};
`;
const Imageback = styled.div`
    filter: blur(5px);
    position:absolute;
    width: 100%;
    height: 100%;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    box-shadow: inset 0 0 100px #000;
`;

const NavTemplate = ({children}) => {
    const { store, logout, setStore } = React.useContext(Store)
    const [state, setState] = React.useState({
        error: '',
    });
    const history = useHistory();
    const background = React.createRef();

    React.useEffect(() => {
        background.current.style.backgroundImage = `url(${backgroundArray[Math.floor(Math.random() * (+6 - 0)) + 0]})`;
        const GetData  = async () => {
            const response = await firebase.firestore().collection('users').get();
            let flag = false;
            response.forEach(doc => {
                if(doc.data().uid === store.userData.uid) {
                    flag = true;
                    setStore({...store, arrays: {
                        competitors: doc.data().competitors,
                        trainings: doc.data().trainings,
                        docId: doc.id
                    }})
                }
            });
            !flag && firebase.firestore().collection('users').add({
                uid: store.userData.uid,
                competitors: [],
                trainings: []
            })

        }
        !store.arrays.docId && GetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogOut = async () => {
        setState({ ...state, error: '' })
        try {
            await logout();
            history.push('/login')
        } catch {
            setState({ ...state, error: 'Failed to logout' })
        }
    };
    return (
        <Container className="d-flex flex-column position-relative">
            <Navbar variant="dark" expand="lg" className="border-bottom border-primary p-fixed" style={{ backgroundColor: `${theme.dark}`, zIndex: 999 }}>
                <Navbar.Brand href="/dashboard">
                    <img
                        alt="logo"
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-center"
                    />{' '}
             Training Attendance
            </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav.Link as={Link} to="/dashboard" id="nav-dropdown" className="link ml-auto text-center text-white">
                        Dashboard
                </Nav.Link>
                    <Nav.Link as={Link} to="/competitors" id="nav-dropdown" className="link ml-1 text-center text-white">
                        My competitors
                </Nav.Link>
                    <Nav.Link as={Link} to="/calendar" id="nav-dropdown" className="link ml-1 text-center text-white">
                        Calendar
                </Nav.Link>
                    <Nav.Link as={Link} to="/trainings" id="nav-dropdown" className="link ml-1 text-center text-white">
                        Trainings
                </Nav.Link>
                    <Navbar.Text className="mr-3 ml-5 d-none d-lg-block">
                        Logged in as: <i>{store.userData.email}</i>
                    </Navbar.Text>
                    <div className="w-100 d-flex d-md-none justify-content-end">
                        <Button variant="danger" onClick={handleLogOut}>Log Out</Button>
                    </div>
                    <Button variant="danger" className="d-none d-md-block mr-2" onClick={handleLogOut}>Log Out</Button>
                </Navbar.Collapse>
            </Navbar>
            {children}
            <Imageback ref={background}></Imageback>
        </Container>
     );
}

export default NavTemplate;