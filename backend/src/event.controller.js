// controllers/eventController.js
const Event = require('./event.model');

// Add a new event
const addEvent = async (req, res) => {
  console.log('Received data:', req.body);
  const { eventName, location, description } = req.body;

  try {
    const newEvent =await Event.create({
      eventName,
      location,
      description,
    });

    res.status(200).send({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    res.status(400).json({ message: 'Error adding event', error: error.message });
  }
};

const listEvent = async (req, res) =>{
  
  try {
    const list = await Event.find({});

    res.status(200).send({ message: 'Success', list: list });
  } catch (error) {
    res.status(400).json({ message: 'Error adding event', error: error.message });
  }
}
const deleteEvent =  async (req, res) => {
  try {
    const eventId = req.params.id;  // Extract ID from URL parameter

    // Find and delete the event by ID
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    // If no event is found with the provided ID
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Return success response
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};
module.exports = { addEvent , listEvent,deleteEvent};
