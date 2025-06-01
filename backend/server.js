const { connect } = require('./src/config/pg');
const app = require('./app');

require('dotenv').config();
require('./src/models');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`SERVIDOR LIGADO ${PORT}`);
  connect()
});

