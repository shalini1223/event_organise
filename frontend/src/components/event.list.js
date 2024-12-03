import React, { useState, useEffect } from "react";
import axios from "axios";
import EventTable from "./event.table";

const EventListContainer = () => {
  const [events, setEvents] = useState([]); // State to store events
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true); // Set loading to true
        const response = await axios.get("http://localhost:5000/api/events/list-events");
        
        // Extract 'list' from the response and set to state
        setEvents(response.data.list || []); 
        setLoading(false); // Data fetched, stop loading
      } catch (err) {
        setError("Failed to fetch events. Please try again."); // Handle errors
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array to fetch data on component mount

  // Handle Edit
  const handleEdit = (index) => {
    const eventToEdit = events[index];
    console.log("Edit event:", eventToEdit); // Replace with actual edit logic
  };

  // Handle Delete
  const handleDelete = async (index) => {
    const eventToDelete = events[index];
    
    try {
      // Call the backend API to delete the event by its ID
      const response = await axios.delete(`http://localhost:5000/api/events/delete-event/${eventToDelete._id}`);
      console.log("Deleted event response:", response.data);
  
      // After successful deletion, update the state to remove the event
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents); // Update the local event list
  
      // Optionally, show a success message
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };
  

  return (
    <div>
      {loading && <p>Loading events...</p>} {/* Display loading message */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      {!loading && !error && (
        <EventTable events={events} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default EventListContainer;
