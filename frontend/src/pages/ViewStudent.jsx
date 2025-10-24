import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiBook, FiCalendar, FiMail, FiPercent, FiPhone, FiUser } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

const DetailRow = ({ icon: Icon, label, value, delay = 0 }) => (
  <motion.div
    className="d-flex align-items-start py-3 border-bottom border-opacity-25"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <div className="me-3 mt-1 text-primary">
      <Icon size={20} />
    </div>
    <div>
      <small className="text-muted">{label}</small>
      <div className="fw-bold fs-5">{value}</div>
    </div>
  </motion.div>
);

export default function ViewStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔒 VALIDATE ID FIRST
    if (!id || isNaN(Number(id))) {
      Swal.fire("Invalid ID", "Student ID is missing or invalid.", "error");
      navigate('/students');
      return;
    }

    const fetchStudent = async () => {
      try {
        const data = await api.getStudentById(id);
        setStudent(data);
      } catch (err) {
        console.error("Failed to load student:", err);
        Swal.fire("Not Found", "Student not found.", "warning");
        navigate('/students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container py-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <h3 className="text-danger">Student not found</h3>
          <button onClick={() => navigate('/students')} className="btn btn-primary mt-3">
            ← Back to Students
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <motion.div
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="fw-bold mb-2"
          style={{
            fontSize: '2.5rem',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {student.name}
        </motion.h1>
        <motion.p
          className="text-muted mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Student Profile • {student.course}
        </motion.p>
        <div className="d-flex justify-content-center">
          <button 
            onClick={() => navigate('/students')} 
            className="btn btn-outline-primary d-flex align-items-center gap-2 px-4"
          >
            <FiArrowLeft /> Back to Students
          </button>
        </div>
      </motion.div>

      <motion.div
        className="glass-card p-4 p-md-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DetailRow icon={FiUser} label="Full Name" value={student.name} delay={0.5} />
        <DetailRow icon={FiMail} label="Email Address" value={student.email} delay={0.6} />
        <DetailRow icon={FiPhone} label="Phone Number" value={student.phone || "—"} delay={0.7} />
        <DetailRow icon={FiBook} label="Course" value={student.course} delay={0.8} />
        <DetailRow 
          icon={FiPercent} 
          label="Attendance" 
          value={`${student.attendance || 0}%`} 
          delay={0.9} 
        />
        <DetailRow 
          icon={FiCalendar} 
          label="Enrollment Date" 
          value={student.enrolled || "—"} 
          delay={1.0} 
        />
      </motion.div>
    </div>
  );
}