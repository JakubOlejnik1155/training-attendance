import * as React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../static/theme';
import NavTemplate from './Components/NavTemplate';

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




interface ParamTypes {
    comp: string | undefined
  }
const CompetitorData = () => {

    const {comp} = useParams<ParamTypes>();

    React.useEffect(()=>{
        console.log(comp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])





    return (
        <NavTemplate>
            <Container>
                here will be specific competitor info
            </Container>
        </NavTemplate>
    )
}

export default CompetitorData;