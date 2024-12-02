import React from "react";

const EventTable = ({ events, onEdit, onDelete }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Event List</h2>
      {events.length === 0 ? (
        <p style={styles.noEvents}>No events to display.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Event Name</th>
              <th style={styles.th}>Location</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.td}>{event.eventName}</td>
                <td style={styles.td}>{event.location}</td>
                <td style={styles.td}>{event.description}</td>
                <td style={styles.td}>
                  <button style={styles.editButton} onClick={() => onEdit(index)}>
                    Edit
                  </button>
                  <button style={styles.deleteButton} onClick={() => onDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    margin: "20px auto",
    maxWidth: "80%",
  },
  header: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  noEvents: {
    color: "#888",
    fontStyle: "italic",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "0 auto",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  th: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "12px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  row: {
    backgroundColor: "#f9f9f9",
  },
  td: {
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "left",
  },
  editButton: {
    padding: "5px 10px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#DC3545",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default EventTable;
