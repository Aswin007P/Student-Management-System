import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiBook, FiMail, FiPercent, FiPhone, FiUser } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'CS',
    attendance: 90,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔒 VALIDATE ID FIRST
    if (!id || isNaN(Number(id))) {
      Swal.fire("Invalid ID", "Student ID is missing or invalid.", "error");
      navigate('/students');
      return;
    }

    const loadStudent = async () => {
      try {
        const student = await api.getStudentById(id);
        setFormData({
          name: student.name || '',
          email: student.email || '',
          phone: student.phone || '',
          course: student.course || 'CS',
          attendance: student.attendance || 90,
        });
      } catch (err) {
        console.error("Load error:", err);
        Swal.fire("Error", "Student not found.", "error");
        navigate('/students');
      } finally {
        setLoading(false);
      }
    };
    loadStudent();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateStudent(id, formData);
      Swal.fire('Success!', 'Student updated successfully!', 'success');
      navigate('/students');
    } catch (err) {
      console.error("Update error:", err);
      Swal.fire('Error!', 'Failed to update student.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <motion.div
        className="glass-card col-lg-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Edit Student</h2>
          <button
            onClick={() => navigate('/students')}
            className="btn btn-sm btn-outline-secondary"
          >
            <FiArrowLeft /> Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', name: 'name', icon: <FiUser />, type: 'text' },
            { label: 'Email', name: 'email', icon: <FiMail />, type: 'email' },
            { label: 'Phone', name: 'phone', icon: <FiPhone />, type: 'tel' },
            { label: 'Course', name: 'course', icon: <FiBook />, type: 'select' },
            { label: 'Attendance (%)', name: 'attendance', icon: <FiPercent />, type: 'number' },
          ].map((field) => (
            <motion.div key={field.name} className="mb-3" whileFocus={{ scale: 1.01 }}>
              <label className="form-label">{field.label}</label>
              <div className="input-group">
                <span className="input-group-text">{field.icon}</span>
                {field.type === 'select' ? (
                  <select
                    className="form-select"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                  >
                    <option value="CS">Computer Science</option>
                    <option value="IT">Information Tech</option>
                    <option value="ECE">Electronics</option>
                    <option value="ME">Mechanical</option>
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="form-control"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    min={field.type === 'number' ? 0 : undefined}
                    max={field.type === 'number' ? 100 : undefined}
                    required
                  />
                )}
              </div>
            </motion.div>
          ))}

          <div className="d-grid gap-2">
            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Update Student
            </motion.button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/students')}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}