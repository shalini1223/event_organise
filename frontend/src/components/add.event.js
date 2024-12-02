import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEvent = ({ onAdd, editingEvent }) => {
  const [formData, setFormData] = useState({
    eventName: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent);
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { eventName, location, description } = formData;

    // Validation
    if (!eventName || !location || !description) {
      return alert("All fields are required!");
    }

    try {
      // Make POST request to the backend to add the event
      const response = await axios.post("http://localhost:5000/api/events/addEvent", formData);
      alert(response.data.message); // Display success message

      // Optionally reset the form or pass back data to parent component
      onAdd(formData);
      setFormData({ eventName: "", location: "", description: "" });
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>{editingEvent ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="eventName" style={styles.label}>
            Event Name:
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="location" style={styles.label}>
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="description" style={styles.label}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          />
        </div>
        <button type="submit" style={styles.button}>
          {editingEvent ? "Update Event" : "Add Event"}
        </button>
      </form>
    </div>
  );
};

// Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#555",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    resize: "none",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default AddEvent;
