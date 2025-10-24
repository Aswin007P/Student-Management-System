import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiBook, FiMail, FiPercent, FiPhone, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: 'CS',
    attendance: 90
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createStudent(formData);
      Swal.fire('Success!', 'Student added successfully!', 'success');
      navigate('/students');
    } catch (err) {
      Swal.fire('Error!', 'Failed to add student.', 'error');
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <motion.div
        className="glass-card col-lg-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-center">Add New Student</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', name: 'name', icon: <FiUser />, type: 'text' },
            { label: 'Email', name: 'email', icon: <FiMail />, type: 'email' },
            { label: 'Phone', name: 'phone', icon: <FiPhone />, type: 'tel' },
            { label: 'Course', name: 'course', icon: <FiBook />, type: 'select' },
            { label: 'Attendance (%)', name: 'attendance', icon: <FiPercent />, type: 'number' },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              className="mb-3"
              whileFocus={{ scale: 1.01 }}
            >
              <label className="form-label">{field.label}</label>
              <div className="input-group">
                <span className="input-group-text">{field.icon}</span>
                {field.type === 'select' ? (
                  <select
                    className="form-select"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
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
                    value={formData[field.name]}
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
              Add Student
            </motion.button>
            <Link to="/students" className="btn btn-outline-secondary text-center">
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}