import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { api } from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Helper: Group students by month (assumes student.enrolled is ISO string like "2025-03-15")
const getEnrollmentByMonth = (students) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthly = {};

  students.forEach(student => {
    if (student.enrolled) {
      const date = new Date(student.enrolled);
      const month = monthNames[date.getMonth()];
      monthly[month] = (monthly[month] || 0) + 1;
    }
  });

  // Return as array for Recharts, sorted by month order
  return monthNames
    .filter(month => monthly[month] > 0)
    .map(month => ({ month, students: monthly[month] }))
    .slice(-4); // Last 4 months
};

export default function Dashboard() {
  const { theme } = useTheme();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = theme === 'dark' 
    ? ['#4cc9f0', '#7209b7', '#4361ee', '#3f37c9', '#f72585', '#b5179e']
    : ['#4361ee', '#3f37c9', '#4cc9f0', '#7209b7', '#f72585', '#b5179e'];

  // Fetch students on mount
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await api.getStudents();
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students for dashboard", err);
        setError("Unable to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadStudents();
  }, []);

  // Compute stats from students array
  const stats = useMemo(() => {
    if (students.length === 0) {
      return {
        totalStudents: 0,
        averageAttendance: 0,
        topPerformers: 0,
        recentRegistrations: 0,
        barData: [],
        pieData: []
      };
    }

    // Total students
    const totalStudents = students.length;

    // Average attendance
    const totalAttendance = students.reduce((sum, s) => sum + (s.attendance || 0), 0);
    const averageAttendance = totalStudents ? Math.round(totalAttendance / totalStudents) : 0;

    // Top performers (attendance >= 90)
    const topPerformers = students.filter(s => (s.attendance || 0) >= 90).length;

    // Recent registrations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRegistrations = students.filter(s => {
      if (!s.enrolled) return false;
      const enrolledDate = new Date(s.enrolled);
      return enrolledDate >= thirtyDaysAgo;
    }).length;

    // Bar chart: enrollment by month (last 4 months)
    const barData = getEnrollmentByMonth(students);

    // Pie chart: course distribution
    const courseMap = {};
    students.forEach(s => {
      const course = s.course || 'Other';
      courseMap[course] = (courseMap[course] || 0) + 1;
    });
    const pieData = Object.entries(courseMap).map(([name, value]) => ({ name, value }));

    return {
      totalStudents,
      averageAttendance,
      topPerformers,
      recentRegistrations,
      barData,
      pieData
    };
  }, [students]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading dashboard...</span>
        </div>
        <p className="mt-3 text-muted">Fetching live data from database...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <h3 className="text-danger">⚠️ {error}</h3>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Hero Header */}
      <motion.div
        className="text-center mb-5"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="position-relative d-inline-block rounded-4 overflow-hidden"
          style={{
            background: 'linear-gradient(120deg, var(--primary), var(--secondary))',
            padding: '1.8rem 3.5rem',
            boxShadow: '0 12px 40px rgba(67, 97, 238, 0.4)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
          whileHover={{ scale: 1.03, boxShadow: '0 16px 50px rgba(67, 97, 238, 0.55)' }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.h1
            className="text-white fw-bold m-0"
            style={{ fontSize: '3.2rem', lineHeight: 1.2 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 10 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-white mt-3 mb-0"
            style={{ fontSize: '1.1rem', opacity: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Welcome back! Here's what's happening with your students.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {[
          { title: 'Total Students', value: stats.totalStudents, icon: '🎓' },
          { title: 'Avg. Attendance', value: stats.averageAttendance, icon: '📅' },
          { title: 'Top Performers', value: stats.topPerformers, icon: '🏆' },
          { title: 'Recent Reg.', value: stats.recentRegistrations, icon: '🆕' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="col-md-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="glass-card text-center h-100 d-flex flex-column justify-content-center align-items-center p-4">
              <div className="display-4 mb-3">{stat.icon}</div>
              <h3 className="fw-bold">
                <CountUp end={stat.value} duration={2} />
                {stat.title === 'Avg. Attendance' && '%'}
              </h3>
              <p className="text-muted mt-2 mb-0">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="row g-4">
        <div className="col-lg-7">
          <div className="glass-card p-4">
            <h5 className="mb-4 fw-bold">Student Enrollment (Last 4 Months)</h5>
            {stats.barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={stats.barData}>
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--text-color)" 
                    tick={{ fill: 'var(--text-color)' }}
                  />
                  <YAxis 
                    stroke="var(--text-color)" 
                    tick={{ fill: 'var(--text-color)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-color)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="students" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-5 text-muted">No enrollment data available</div>
            )}
          </div>
        </div>
        <div className="col-lg-5">
          <div className="glass-card p-4">
            <h5 className="mb-4 fw-bold">Course Distribution</h5>
            {stats.pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={stats.pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={true}
                  >
                    {stats.pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card-bg)',
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-color)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-5 text-muted">No course data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}