const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {})
  .catch(error => console.log(error));

app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));