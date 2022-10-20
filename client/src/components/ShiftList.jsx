import React, { useContext, useEffect, useState } from 'react';
import Shift from './Shift.jsx';
import { Grid, GridItem, Flex, Button, Box, Text } from '@chakra-ui/react';
import { AppContext } from '../AppContext.jsx';
import axios from 'axios';
// not every shift has author data from api so only use title

const ShiftList = ({ shifts, facilities }) => {
  const { id1, id2, setId1, setId2 } = useContext(AppContext);
  const [overlap, setOverlap] = useState({
    overlapPresent: false,
    maxOverlap: 0,
    totalMinutes: 0,
  });
  const [active, setActive] = useState(true);
  const handleClick = (e) => {
    e.preventDefault();

    axios.post('/api/shifts/overlap', { id1, id2 }).then(({ data }) => {
      console.log(data);
      setOverlap(data);
    });
    setActive(false);
  };
  return (
    <Box>
      <Flex>
        <Grid templateColumns='repeat(6, 1fr)'>
          {shifts.map((shift, i) => {
            return (
              <GridItem key={shift.shift_id}>
                <Shift
                  shift={shift}
                  facility={facilities[i]}
                  isActive={active}
                />
              </GridItem>
            );
          })}
          <Box>
            <Text>
              Overlap minutes:
              {overlap.totalMinutes ? overlap.totalMinutes : '0'}
            </Text>

            <Text>
              Max Overlap Threshold:
              {overlap.maxOverlap ? overlap.maxOverlap : '0'}
            </Text>

            <Text>
              Exceeds Overlap Threshold:
              {overlap.overlapPresent ? 'True' : 'False'}
            </Text>

            <Box>
              <Button onClick={handleClick}>Submit</Button>
            </Box>
          </Box>
        </Grid>
      </Flex>
    </Box>
  );
};

export default ShiftList;
