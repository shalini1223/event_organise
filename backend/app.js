// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const eventRoutes = require('./src/event.route');

const app = express();

// Middleware
// app.use(cors());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/eventdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/events', eventRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
