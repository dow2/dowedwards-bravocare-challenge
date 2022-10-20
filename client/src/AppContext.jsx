import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [id1, setId1] = useState();
  const [id2, setId2] = useState();
  const [active, setActive] = useState(false);

  const drinksProps = {
    id1,
    setId1,
    id2,
    setId2,
    active,
    setActive,
  };

  return (
    <AppContext.Provider value={drinksProps}>{children}</AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
