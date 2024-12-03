// routes/eventRoutes.js
const express = require('express');
const { addEvent, listEvent,deleteEvent } = require('./event.controller');

const router = express.Router();

// POST route for adding an event
router.post('/addEvent', addEvent);
router.get('/list-events', listEvent);
router.delete('/delete-event/:id', deleteEvent);

module.exports = router;
