// EventPDF.js
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EventPDF = ({ events }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title of the PDF
    doc.text("Event List", 14, 10);

    // Define table headers
    const headers = [["Event Name", "Location", "Description"]];

    // Map event data into the format needed for the table
    const data = events.map(event => [
      event.eventName, 
      event.location, 
      event.description
    ]);

    // Add table to PDF
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,  // Starting position for the table
      theme: "grid",
    });

    // Save the PDF
    doc.save("event_list.pdf");
  };

  return (
    <button onClick={downloadPDF} style={styles.button}>
      Download PDF
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default EventPDF;
