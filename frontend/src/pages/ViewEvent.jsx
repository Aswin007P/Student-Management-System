import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiCalendar, FiEdit, FiTrash2, FiUsers } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { api } from "../services/api";

const EventTypeBadge = ({ type }) => {
  const config = {
    exam: { label: "Exam", color: "bg-danger" },
    meeting: { label: "Meeting", color: "bg-info text-dark" },
    holiday: { label: "Holiday", color: "bg-warning text-dark" },
    workshop: { label: "Workshop", color: "bg-success" },
  };
  const { label, color } = config[type] || { label: "Event", color: "bg-secondary" };
  return <span className={`badge ${color} fs-6`}>{label}</span>;
};

export default function ViewEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await api.getEventById(id);
        setEvent(data);
      } catch (err) {
        Swal.fire("Error", "Failed to load event.", "error");
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: `Are you sure you want to delete "${event?.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    });
    if (result.isConfirmed) {
      try {
        await api.deleteEvent(id);
        Swal.fire("Deleted!", "Event has been deleted.", "success");
        navigate("/events");
      } catch (err) {
        Swal.fire("Error!", "Failed to delete event.", "error");
      }
    }
  };

  const handleJoin = () => {
    Swal.fire({
      title: "Joined!",
      text: `You have joined: ${event?.title}`,
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!event) return null;

  return (
    <div className="container py-4">
      {/* Back Button */}
      <motion.button
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-outline-secondary mb-4 d-flex align-items-center gap-2 mt-4"
        onClick={() => navigate("/events")}
      >
        <FiArrowLeft /> Back to Events
      </motion.button>

      {/* Hero Banner */}
      <motion.div
        className="text-center mb-5 position-relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          className="rounded-4 p-4 text-white"
          style={{
            background: "linear-gradient(120deg, var(--primary), var(--secondary))",
            boxShadow: "0 8px 24px rgba(67, 97, 238, 0.4)",
          }}
        >
          <h1 className="display-5 fw-bold">{event.title}</h1>
          <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
            <span className="d-flex align-items-center gap-2">
              <FiCalendar /> {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <EventTypeBadge type={event.type} />
          </div>
        </div>
      </motion.div>

      {/* Details Card */}
      <motion.div
        className={`glass-card p-4 rounded-3 ${theme === "dark" ? "bg-dark" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {event.description && (
          <div className="mb-4">
            <h5>Description</h5>
            <p className={theme === "dark" ? "text-white" : ""}>{event.description}</p>
          </div>
        )}

        {event.maxParticipants && (
          <div className="d-flex align-items-center gap-2 mb-4">
            <FiUsers className="text-primary" />
            <span className={theme === "dark" ? "text-white" : ""}>
              Max Participants: <strong>{event.maxParticipants}</strong>
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex gap-2 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary d-flex align-items-center gap-2"
            onClick={handleJoin}
          >
            <FiCalendar /> Join Event
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-warning d-flex align-items-center gap-2 text-dark"
            onClick={() => navigate(`/events/edit/${id}`)}
          >
            <FiEdit /> Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={handleDelete}
          >
            <FiTrash2 /> Delete
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}