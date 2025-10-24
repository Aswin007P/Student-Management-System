import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowLeft, FiCalendar, FiFileText, FiPlus, FiTag, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function AddEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: 'exam',
    description: '',
    maxParticipants: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants, 10) : null
      };
      await api.createEvent(payload);
      Swal.fire('Success!', 'Event created successfully.', 'success');
      navigate('/events');
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to create event.', 'error');
    }
  };

  return (
    <div className="container py-4">
      {/* 👇 FIXED: Added mt-4 (top margin) so it clears the navbar */}
      <motion.button
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-outline-secondary mb-4 d-flex align-items-center gap-2 mt-4" // ← added mt-4
        onClick={() => navigate('/events')}
      >
        <FiArrowLeft /> Back to Events
      </motion.button>

      <motion.div
        className="glass-card p-4 rounded-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 p-3 mb-3">
            <FiPlus className="text-primary" size={24} />
          </div>
          <h2 className="fw-bold">Create New Event</h2>
          <p className="text-muted">Fill in the details below to schedule a new event</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="form-label fw-semibold d-flex align-items-center gap-2">
              <FiTag /> Title
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Final Exam"
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="form-label fw-semibold d-flex align-items-center gap-2">
              <FiCalendar /> Date
            </label>
            <input
              type="date"
              className="form-control form-control-lg"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="form-label fw-semibold d-flex align-items-center gap-2">
              <FiTag /> Type
            </label>
            <select
              className="form-select form-select-lg"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="exam">Exam</option>
              <option value="meeting">Meeting</option>
              <option value="holiday">Holiday</option>
              <option value="workshop">Workshop</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="form-label fw-semibold d-flex align-items-center gap-2">
              <FiFileText /> Description (Optional)
            </label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Add event details..."
            />
          </div>

          {/* Max Participants */}
          <div className="mb-4">
            <label className="form-label fw-semibold d-flex align-items-center gap-2">
              <FiUsers /> Max Participants (Optional)
            </label>
            <input
              type="number"
              className="form-control"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleChange}
              min="1"
              placeholder="e.g., 50"
            />
          </div>

          {/* Buttons */}
          <div className="d-flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary px-4 py-2"
            >
              Create Event
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="btn btn-secondary px-4 py-2"
              onClick={() => navigate('/events')}
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}