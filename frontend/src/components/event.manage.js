import React, { useState, useEffect } from "react";
import AddEvent from "./add.event";
import EventTable from "./event.list";
import EventPDF from "./event.pdf";
import axios from "axios";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/list-events");
        setEvents(response.data.list);  // Assuming the response is { list: [...] }
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);
  // Add or Update Event
  const handleAddEvent = (event) => {
    if (editingEvent !== null) {
      // Update existing event
      const updatedEvents = [...events];
      updatedEvents[editingEvent] = event;
      setEvents(updatedEvents);
      setEditingEvent(null); // Reset editing
    } else {
      // Add new event
      setEvents([...events, event]);
    }
  };

  // Edit Event
  const handleEditEvent = (index) => {
    setEditingEvent(index);
  };

  // Delete Event
  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h1>Event Management</h1>
      <AddEvent
        onAdd={handleAddEvent}
        editingEvent={editingEvent !== null ? events[editingEvent] : null}
      />
      <EventTable
        events={events}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
       {/* Add the EventPDF button to download the events list as a PDF */}
       <EventPDF events={events} />
    </div>
  );
};

export default EventManager;
