import * as React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../static/theme';
import { Store } from '../Store';
import logo from '../../images/yes.svg'
import image from '../../images/sailing.jpg';
import image1 from '../../images/fitness.jpg';
import image2 from '../../images/rowl.jpg';
import image3 from '../../images/run.jpg';
import image4 from '../../images/surf.jpg';
import image5 from '../../images/tenis.jpg';

const backgroundArray = [image, image1, image2, image3, image4, image5];
const Container = styled.div`
    width: 100%;
    max-height: 100vh;
    height: 100vh;
    background-color: ${theme.dark};
`;
const Imageback = styled.div`
    filter: blur(5px);
    width: 100%;
    height: 100%;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    box-shadow: inset 0 0 100px #000;
`;


const Dashboard = () => {
    const {store, logout} = React.useContext(Store)
    const [state, setState] = React.useState({
        error: '',
    });
    const history = useHistory();
    const background: any = React.createRef();

    React.useEffect(()=> {
            background.current.style.backgroundImage = `url(${backgroundArray[Math.floor(Math.random() * (+6 - 0)) + 0]})`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const handleLogOut = async () => {
        setState({...state, error: ''})
        try{
            await logout();
            history.push('/login')
        }catch{
            setState({...state, error: 'Failed to logout'})
        }
    };

    return ( 
        <Container className="d-flex flex-column">
            <Navbar variant="dark" expand="lg" className="border-bottom border-primary p-fixed" style={{backgroundColor: `${theme.dark}`, zIndex: 999}}>
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
            <Navbar.Toggle aria-controls="navbar"/>
            <Navbar.Collapse id="navbar">
                <Nav.Link href="/dashboard" id="nav-dropdown" className="ml-auto text-center text-white">
                    Dashboard
                </Nav.Link>
                <Nav.Link href="/#" id="nav-dropdown" className="ml-1 text-center text-white">
                    Dashboard
                </Nav.Link>
                <Nav.Link href="/#" id="nav-dropdown" className="ml-1 text-center text-white">
                    Dashboard
                </Nav.Link>
                <Nav.Link href="/#" id="nav-dropdown" className="ml-1 text-center text-white">
                    Dashboard
                </Nav.Link>
                <Navbar.Text className="mr-3 ml-5 d-none d-lg-block">
                    Logged in as: <i>{store.userData.email}</i> 
                </Navbar.Text>
                <div className="w-100 d-flex d-md-none justify-content-end">
                    <Button variant="danger"  onClick={handleLogOut}>Log Out</Button>
                </div>
                    <Button variant="danger" className="d-none d-md-block mr-2"  onClick={handleLogOut}>Log Out</Button>
            </Navbar.Collapse>
        </Navbar>
        
        <Imageback ref={background}></Imageback>

        </Container>
     );
}
 
export default Dashboard;