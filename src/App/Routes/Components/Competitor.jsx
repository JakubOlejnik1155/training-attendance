import * as React from 'react';
import {Link} from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import deleteIcon from '../../../images/delete.svg';
import {theme} from '../../../static/theme';
import menuIcom from '../../../images/menu.svg';


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
const Btn = styled.button`
    padding: 5px;
    height: 100%;
    border: none;
    outline: none;
    background-color: rgb(212,58,47);
    border-radius: 0 4px 4px 0;
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
const SeeMoreBtn = styled.button`
    padding: 5px;
    height: 100%;
    border: none;
    outline: none;
    background-color: ${theme.blue};
    transition: .3s all linear;
    &:hover{
        background-color: lightblue;
    }
`;



const Competitor = ({ name, surname, attendance}) => {

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //TODO: make deleting function
    const handleDeleting = () =>{
        console.log({ name, surname });
        setShow(false);
    }
    return (
        <>
            <Container>
                <span>
                    <strong>{name + ' '}</strong>
                    <i>{surname}</i>
                </span>
                <Attendance at={attendance}>
                    {attendance}%
                </Attendance>
                {/* //TODO: make this route for special user informations */}
                <Link to={`/${name+surname}`}>
                    <SeeMoreBtn>
                        <img src={menuIcom} alt="menu" width="30" height="30" />
                    </SeeMoreBtn>
                </Link>
                <Btn onClick={handleShow}>
                    <img src={deleteIcon} alt="bin" width="30" height="30"/>
                </Btn>
            </Container>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Competitor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are You sure that you want to delete:
                    <span style={{color: 'red', fontWeight: 'bold'}}>{ ' '+name + ' '+ surname}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancel
                     </Button>
                    <Button variant="danger" onClick={handleDeleting}>DELETE</Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}

export default Competitor;