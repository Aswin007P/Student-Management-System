import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FiEdit, FiEye, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { api } from "../services/api";

export default function Students() {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await api.getStudents();
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students", err);
        Swal.fire("Error", "Could not load students. Is the backend running?", "error");
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  const courses = useMemo(() => {
    return ['All', ...new Set(students.map(s => s.course))];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase()) ||
                            student.email.toLowerCase().includes(search.toLowerCase());
      const matchesCourse = courseFilter === 'All' || student.course === courseFilter;
      return matchesSearch && matchesCourse;
    });
  }, [search, courseFilter, students]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Delete student "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'Cancel'
    });
    if (result.isConfirmed) {
      try {
        await api.deleteStudent(id);
        setStudents(prev => prev.filter(s => s.id !== id));
        Swal.fire('Deleted!', 'Student has been deleted.', 'success');
      } catch (err) {
        Swal.fire('Error!', 'Failed to delete student.', 'error');
      }
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
    <div className="container py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-5"
      >
        <motion.div
          className="position-relative d-inline-block rounded-4 overflow-hidden"
          style={{
            background: 'linear-gradient(120deg, var(--primary), var(--secondary))',
            padding: '1.5rem 3rem',
            boxShadow: '0 10px 30px rgba(67, 97, 238, 0.35)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          whileHover={{ scale: 1.03, boxShadow: '0 12px 40px rgba(67, 97, 238, 0.5)' }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.h1
            className="text-white fw-bold m-0 display-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 10 }}
          >
            Students
          </motion.h1>
          <motion.p
            className="text-white mt-2 mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Manage your student records with ease
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Add Student Button */}
      <div className="d-flex justify-content-end mb-4">
        <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
          <Link to="/students/add" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2">
            <FiPlus size={20} /> Add Student
          </Link>
        </motion.div>
      </div>

      {/* Search & Filter */}
      <motion.div
        className="row mb-5 g-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-body"><FiSearch /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Student Table */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="table-responsive">
          <table className={`table align-middle w-100 ${theme === 'dark' ? 'table-dark' : ''}`}
            style={{
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
              ...(theme === 'dark' && {
                '--bs-table-color': '#f0f0f5',
                '--bs-table-bg': 'transparent',
              })
            }}
          >
            <thead>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={theme === 'dark' ? { borderBottom: '1px solid #3a3a4a' } : {}}
              >
                <th className="fw-bold" style={theme === 'dark' ? { color: '#e0e0ff' } : {}}>Name</th>
                <th className="fw-bold" style={theme === 'dark' ? { color: '#e0e0ff' } : {}}>Email</th>
                <th className="fw-bold" style={theme === 'dark' ? { color: '#e0e0ff' } : {}}>Course</th>
                <th className="fw-bold" style={theme === 'dark' ? { color: '#e0e0ff' } : {}}>Attendance</th>
                <th className="text-center fw-bold" style={theme === 'dark' ? { color: '#e0e0ff' } : {}}>Actions</th>
              </motion.tr>
            </thead>
            <tbody>
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No students found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => ( // ✅ REMOVED index 'i'
                  <motion.tr
                    key={student.id} // ✅ CRITICAL: use student.id as key
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    style={{
                      transition: 'all 0.25s ease',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      ...(theme === 'dark' && {
                        border: '1px solid rgba(80, 80, 100, 0.3)',
                        background: 'rgba(30, 30, 40, 0.6)',
                      })
                    }}
                  >
                    <td className="fw-medium py-3 px-4">{student.name}</td>
                    <td className="py-3 px-4">{student.email}</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${theme === 'dark' ? 'bg-primary text-white' : 'bg-primary-soft text-primary'}`}>
                        {student.course}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${
                        student.attendance >= 90 ? 'bg-success' :
                        student.attendance >= 75 ? 'bg-warning' : 'bg-danger'
                      } ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          to={`/students/view/${student.id}`} // ✅ correct
                          className={`btn btn-sm rounded-circle p-2 ${theme === 'dark' ? 'btn-outline-info' : 'btn-outline-info'}`}
                          aria-label="View student"
                        >
                          <FiEye size={16} />
                        </Link>
                        <Link
                          to={`/students/edit/${student.id}`} // ✅ correct
                          className={`btn btn-sm rounded-circle p-2 ${theme === 'dark' ? 'btn-outline-warning' : 'btn-outline-warning'}`}
                          aria-label="Edit student"
                        >
                          <FiEdit size={16} />
                        </Link>
                        <button
                          className={`btn btn-sm rounded-circle p-2 ${theme === 'dark' ? 'btn-outline-danger' : 'btn-outline-danger'}`}
                          onClick={() => handleDelete(student.id, student.name)}
                          aria-label="Delete student"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.nav
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className={`page-link ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`} 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  Prev
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <motion.li
                  key={i + 1}
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    className={`page-link ${
                      theme === 'dark' ? 'bg-dark text-white border-secondary' : ''
                    } ${
                      currentPage === i + 1 
                        ? (theme === 'dark' ? 'bg-primary text-white' : 'bg-primary text-white') 
                        : ''
                    }`} 
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </motion.li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className={`page-link ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`} 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Next
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </motion.div>
    </div>
  );
}