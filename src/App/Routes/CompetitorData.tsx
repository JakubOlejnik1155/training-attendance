import * as React from 'react';
import { useParams } from 'react-router-dom';

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
        <>
        siema siema
        </>
    )
}

export default CompetitorData;