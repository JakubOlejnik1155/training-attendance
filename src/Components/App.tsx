import React from 'react';
import { Store as ContextStore } from './Store'; 

const App = () => {

  const {store, setStore} = React.useContext(ContextStore)

  return (
    <div className="App">
      hello
      {store.isDarkMode ? "tak" : "nie"}
      <button onClick={()=>{
        setStore({...StaticRange, isDarkMode: !store.isDarkMode})
      }}>
        zmien
      </button>
    </div>
  );
}

export default App;
