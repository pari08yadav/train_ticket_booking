import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const DisplayTicket = () => {
    const location = useLocation();
    const { bookings } = location.state || {}; // Retrieve the bookings data passed from the BookTicket component
    const ticketRef = useRef(null); // Ref for the ticket details container

    if (!bookings || bookings.length === 0) {
        return <div className="no-booking-message">No booking data found.</div>;
    }

    // Function to download the ticket as a PDF
    const downloadPDF = async () => {
        if (!ticketRef.current) {
            console.error("Invalid element: ticketRef is null or undefined.");
            return;
        }

        try {
            const element = ticketRef.current;
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("ticket-details.pdf");
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div>
            <div ref={ticketRef} className="ticket-details-container">
                <h2>Your Ticket Details</h2>
                <table className="ticket-table">
                    <thead>
                        <tr>
                            <th>Passenger Name</th>
                            <th>Passenger Age</th>
                            <th>Class Type</th>
                            <th>Total Fare</th>
                            <th>Train Name</th>
                            <th>Train Number</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Date</th>
                            <th>Seat Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={index}>
                                <td>{booking.passenger_name}</td>
                                <td>{booking.passenger_age}</td>
                                <td>{booking.class_type}</td>
                                <td>₹{booking.total_fare}</td>
                                <td>{booking.train_name}</td>
                                <td>{booking.train_number}</td>
                                <td>{booking.source}</td>
                                <td>{booking.destination}</td>
                                <td>{booking.date}</td>
                                <td>{booking.seat_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={downloadPDF} className="download-button">
                Download Ticket as PDF
            </button>
        </div>
    );
};

export default DisplayTicket;
