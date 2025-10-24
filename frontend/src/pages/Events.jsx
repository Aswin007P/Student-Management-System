import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { api } from "../services/api";

// src/pages/Events.jsx

const EventTypeBadge = ({ type }) => {
  const config = {
    exam: { label: "Exam", color: "bg-danger" },
    meeting: { label: "Meeting", color: "bg-info text-dark" },
    holiday: { label: "Holiday", color: "bg-warning text-dark" },
    workshop: { label: "Workshop", color: "bg-success" },
  };
  const { label, color } = config[type] || { label: "Event", color: "bg-secondary" };
  return <span className={`badge ${color}`}>{label}</span>;
};

export default function Events() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await api.getEvents();
      setEvents(data);
    } catch (err) {
      Swal.fire("Error", "Failed to load events.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: 'Delete Event?',
      text: `Are you sure you want to delete "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
    });
    if (result.isConfirmed) {
      try {
        await api.deleteEvent(id);
        setEvents(events.filter(e => e.id !== id));
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete event.', 'error');
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Hero Header */}
      <motion.div className="text-center mb-5">
        <motion.div
          className="position-relative d-inline-block rounded-4 overflow-hidden"
          style={{
            background: 'linear-gradient(120deg, var(--primary), var(--secondary))',
            padding: '1.5rem 3rem',
            boxShadow: '0 10px 30px rgba(67, 97, 238, 0.35)',
          }}
          whileHover={{ scale: 1.03 }}
        >
          <motion.h1 className="text-white fw-bold m-0 display-4">Events</motion.h1>
          <motion.p className="text-white mt-2 mb-0">Upcoming academic & institutional events</motion.p>
        </motion.div>
      </motion.div>

      <div className="d-flex justify-content-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => navigate('/events/add')}
        >
          <FiPlus /> Add Event
        </motion.button>
      </div>

      <div className="glass-card p-4">
        {events.length === 0 ? (
          <p className={`text-center ${theme === 'dark' ? 'text-white' : 'text-muted'}`}>No events scheduled.</p>
        ) : (
          <div className="row g-3">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                className="col-12"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div 
                  className={`d-flex justify-content-between align-items-center p-3 border rounded cursor-pointer ${theme === 'dark' ? 'bg-dark border-secondary' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/events/view/${event.id}`)} // 👈 Navigate to ViewEvent
                >
                  <div>
                    <h5 className={`mb-1 ${theme === 'dark' ? 'text-white' : ''}`}>{event.title}</h5>
                    <p className={`text-muted mb-0 ${theme === 'dark' ? 'text-white-50' : ''}`}>
                      <FiCalendar className="me-2" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <EventTypeBadge type={event.type} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}