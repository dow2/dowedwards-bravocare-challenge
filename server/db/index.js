const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dow', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
main();
