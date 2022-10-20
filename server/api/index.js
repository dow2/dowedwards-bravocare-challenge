const { shiftsRouter } = require('./shifts');

module.exports = (app) => {
  app.use('/api/shifts', shiftsRouter);
};
