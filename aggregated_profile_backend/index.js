const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port---> ${PORT}`);
});

module.exports = app;
