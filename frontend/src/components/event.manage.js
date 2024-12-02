import React, { useState } from "react";
import AddEvent from "./add.event";
import EventTable from "./event.table";

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

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
    </div>
  );
};

export default EventManager;
