// TODO
const express = require('express');
const path = require('path');
const apiRoutes = require('./api/index');

const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.render('index');
});
apiRoutes(app);
app.listen(PORT, () => {
  console.log(`listening on: http://localhost:${PORT}`);
});
module.exports = app;
