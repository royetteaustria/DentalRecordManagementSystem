import moment from "moment";
import Calendar from "../Calendar";
import axios from "axios";
import { useState, useEffect } from 'react';
import { Views } from "react-big-calendar";
import './Calendar.css'
import AppointmentModal from "../ViewModal/ViewModal";

const components = {
  event: (props) => {
    return (
      <div 
        onClick={() => props.onClick(props.event)}
        className="bg-brand-400 text-white"
      >
        {props.event.title} - {moment(props.event.start).format("YYYY-MM-DD HH:mm")} to {moment(props.event.end).format("YYYY-MM-DD HH:mm")}
        {props.event.description && <p>{props.event.description}</p>}
      </div>
    );
  },
};

const ControlCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:4000/api/AppointmentRoutes')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  },[]);

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the selected event
  };
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((e) => e._id !== eventId));
    setSelectedEvent(null);
  }
  return (
    <>
    <Calendar 
      events={events} 
      components={{...components, event: (props) => <components.event {...props} onClick={handleEventClick} />}}
      views={[Views.MONTH, Views.AGENDA]}
      style={{ height: 700 }}/>
    {/* Render the modal if an event is selected */}
    {selectedEvent && <AppointmentModal 
    event={selectedEvent}
    onDeleteEvent={handleDeleteEvent}
    onClose={() => setSelectedEvent(null)}  />} 
  </>
  );
}

export default ControlCalendar;
