// TODO
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ShiftList from './ShiftList';
import { ChakraProvider } from '@chakra-ui/react';
import { AppContextProvider } from '../AppContext';

const App = () => {
  const [shifts, setShifts] = useState([]);
  const [facilities, setFacilities] = useState([]);
  useEffect(() => {
    axios
      .get('/api/shifts/all')
      .then((response) => {
        // console.log(response.data);
        setShifts(response.data[0]);
        setFacilities(response.data[1]);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(shifts, facilities);
  return (
    <AppContextProvider>
      <ChakraProvider>
        <div>
          <ShiftList shifts={shifts} facilities={facilities}></ShiftList>
        </div>
      </ChakraProvider>
    </AppContextProvider>
  );
};

export default App;
