import { motion } from "framer-motion";
import { FiCalendar, FiHome, FiPlus, FiSettings, FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function Sidebar() {
  const { theme } = useTheme();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { to: '/students', label: 'Students', icon: <FiUsers /> },
    { to: '/students/add', label: 'Add Student', icon: <FiPlus /> },
    { to: '/events', label: 'Events', icon: <FiCalendar /> },
    { to: '/settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <motion.div
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="d-flex flex-column p-3"
      style={{
        width: '240px',
        position: 'fixed',
        top: '60px',
        left: 0,
        bottom: 0,
        zIndex: 1000,
        overflowY: 'auto',
        background: 'var(--card-bg)',
        borderRight: '1px solid var(--border-color)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: theme === 'dark'
          ? 'inset -1px 0 0 0 rgba(100, 100, 255, 0.2), 4px 0 20px rgba(76, 201, 240, 0.15)'
          : 'inset -1px 0 0 0 var(--border-color)',
      }}
    >
      <ul className="nav flex-column">
        {navItems.map((item) => (
          <motion.li
            className="nav-item mb-1"
            key={item.to}
            whileHover={{ x: 8 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-2 ${
                  isActive
                    ? 'text-white fw-semibold'
                    : theme === 'dark' ? 'text-muted' : 'text-body'
                }`
              }
              style={({ isActive }) => ({
                transition: 'all 0.25s ease',
                background: isActive
                  ? (theme === 'dark' ? 'linear-gradient(90deg, #4361ee, #3a0ca3)' : '#4361ee')
                  : 'transparent',
                border: '1px solid transparent',
                ...(theme === 'dark' && !isActive && {
                  color: '#e0e0ff',
                }),
                // 👇 Explicitly set color for active state in dark mode
                ...(theme === 'dark' && isActive && {
                  color: '#ffffff !important', // Force white text
                }),
              })}
            >
              <motion.span
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                {item.icon}
              </motion.span>
              <span>{item.label}</span>
            </NavLink>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}