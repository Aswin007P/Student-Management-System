import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: 'exam',
    description: '',
    maxParticipants: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await api.getEventById(id);
        setFormData({
          title: data.title || '',
          date: data.date ? new Date(data.date).toISOString().split('T')[0] : '',
          type: data.type || 'exam',
          description: data.description || '',
          maxParticipants: data.maxParticipants || ''
        });
      } catch (err) {
        Swal.fire('Error', 'Failed to load event.', 'error');
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };
    loadEvent();
  }, [id, navigate]);

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
      await api.updateEvent(id, payload);
      Swal.fire('Success!', 'Event updated successfully.', 'success');
      navigate('/events');
    } catch (err) {
      Swal.fire('Error', err.message || 'Failed to update event.', 'error');
    }
  };

  if (loading) {
    return <div className="container py-5 text-center"><div className="spinner-border"></div></div>;
  }

  return (
    <div className="container py-4">
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
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
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Max Participants (optional)</label>
          <input
            type="number"
            className="form-control"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="1"
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Event</button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/events')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}