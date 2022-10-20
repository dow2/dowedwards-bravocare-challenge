import { Box, Flex, chakra, LinkBox, LinkOverlay } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../AppContext';

const Shift = ({ shift, facility, isActive }) => {
  const { start_time, shift_date, facility_id, end_time, shift_id } = shift;
  const { facility_name } = facility;
  const [active, setActive] = useState(false);
  const { id1, id2, setId1, setId2 } = useContext(AppContext);

  const handleClick = (e) => {
    e.preventDefault();
    setActive(true);
    if (id1 === undefined) {
      setId1(shift_id);
    }
    if (id1 && id1 !== shift_id) {
      setId2(shift_id);
    }
  };
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  return (
    <LinkBox maxW='xs' mx='auto' bg='white'>
      <Flex p={50} w='full' alignItems='center' justifyContent='center'>
        <Box
          maxW='xs'
          mx='auto'
          bg='white'
          _dark={{
            bg: 'gray.800',
          }}
          shadow='lg'
          rounded='lg'
          bgColor={active && isActive ? 'blue.400' : 'white'}
        >
          <Box px={4} py={2}>
            <LinkOverlay href='#' onClick={handleClick}>
              <chakra.h1
                fontWeight='bold'
                fontSize='l'
                textTransform='capitalize'
              >
                {facility_name}
              </chakra.h1>
            </LinkOverlay>
            <chakra.p
              mt={1}
              fontSize='sm'
              color='gray.600'
              _dark={{
                color: 'gray.400',
              }}
            >
              {shift_date}
            </chakra.p>
            <chakra.p
              mt={1}
              fontSize='sm'
              color='gray.600'
              _dark={{
                color: 'gray.400',
              }}
            >
              {tConvert(start_time)} - {tConvert(end_time)}
            </chakra.p>
          </Box>

          <Flex
            alignItems='center'
            justifyContent='space-between'
            px={4}
            py={2}
            roundedBottom='lg'
          ></Flex>
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default Shift;
