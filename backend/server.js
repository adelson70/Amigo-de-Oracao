const database = require('./src/models/index')
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVIDOR LIGADO ${PORT}`);
});

