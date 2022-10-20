const { Router } = require('express');
const axios = require('axios');
const { isRangeOverlap } = require('range-overlap');
const { question_one_shift, Facility } = require('../db/index');

const shiftsRouter = Router();

shiftsRouter.get('/all', async (req, res) => {
  const allShifts = await question_one_shift.findAll();
  const facilities = await Promise.all(
    allShifts.map(async (shift) => {
      // console.log(shift.facility_id, 'SHIFT');
      const names = await Facility.findOne({
        attributes: ['facility_name'],
        where: { facility_id: shift.facility_id },
      });
      return names;
    })
  );
  console.log(facilities);
  res.status(200).send([allShifts, facilities]);
});

shiftsRouter.post('/overlap', async (req, res) => {
  const { id1, id2 } = req.body;
  let maxOverlap = 0;
  let totalMinutes = 0;
  let isOverlap = false;

  const facility1 = await question_one_shift.findOne({
    where: { shift_id: id1 },
  });
  const facility2 = await question_one_shift.findOne({
    where: { shift_id: id2 },
  });
  facility1.facility_id !== facility2.facility_id
    ? (maxOverlap = 0)
    : (maxOverlap = 30);

  if (
    isRangeOverlap(
      { start: facility1.start_time, end: facility1.end_time },
      { start: facility2.start_time, end: facility2.end_time }
    )
  ) {
    totalMinutes =
      (parseInt(facility1.end_time.replace(/:/g, '')) -
        parseInt(facility2.start_time.replace(/:/g, ''))) /
      100;
    isOverlap = true;
  }

  const overlap = {
    maxOverlap: maxOverlap,
    totalMinutes: totalMinutes,
    overlapPresent: isOverlap,
  };
  const end1 = Date.parse(facility1.end_time.toString());
  res.status(200).send(overlap);
});

module.exports = { shiftsRouter };
