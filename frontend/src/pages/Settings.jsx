import ThemeToggle from "../components/ThemeToggle";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiBell, FiDownload, FiKey, FiMonitor, FiSave, FiUser } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

export default function Settings() {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);

  const handleSave = () => {
    alert("Settings saved!");
  };

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
          <motion.h1 className="text-white fw-bold m-0 display-4">Settings</motion.h1>
          <motion.p className="text-white mt-2 mb-0">Manage your preferences and account</motion.p>
        </motion.div>
      </motion.div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="glass-card p-4">
            {/* Theme */}
            <div className={`d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom ${theme === 'dark' ? 'text-white' : ''}`}>
              <div className="d-flex align-items-center gap-3">
                <div className={`bg-primary ${theme === 'dark' ? 'bg-opacity-10' : 'bg-opacity-10'} p-2 rounded`}>
                  <FiMonitor size={20} className={`text-primary ${theme === 'dark' ? 'text-white' : ''}`} />
                </div>
                <div>
                  <h5 className={`mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>Appearance</h5>
                  <p className={`text-muted mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>Customize the look of the app</p>
                </div>
              </div>
              <ThemeToggle />
            </div>

            {/* Notifications */}
            <div className={`d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom ${theme === 'dark' ? 'text-white' : ''}`}>
              <div className="d-flex align-items-center gap-3">
                <div className={`bg-info ${theme === 'dark' ? 'bg-opacity-10' : 'bg-opacity-10'} p-2 rounded`}>
                  <FiBell size={20} className={`text-info ${theme === 'dark' ? 'text-white' : ''}`} />
                </div>
                <div>
                  <h5 className={`mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>Notifications</h5>
                  <p className={`text-muted mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>Email & in-app alerts</p>
                </div>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              </div>
            </div>

            {/* Data Export */}
            <div className={`d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom ${theme === 'dark' ? 'text-white' : ''}`}>
              <div className="d-flex align-items-center gap-3">
                <div className={`bg-success ${theme === 'dark' ? 'bg-opacity-10' : 'bg-opacity-10'} p-2 rounded`}>
                  <FiDownload size={20} className={`text-success ${theme === 'dark' ? 'text-white' : ''}`} />
                </div>
                <div>
                  <h5 className={`mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>Data Export</h5>
                  <p className={`text-muted mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>Download student records as CSV</p>
                </div>
              </div>
              <button className={`btn ${theme === 'dark' ? 'btn-outline-success' : 'btn-outline-success'}`}>Export</button>
            </div>

            {/* Security (placeholder) */}
            <div className={`d-flex justify-content-between align-items-center mb-4 ${theme === 'dark' ? 'text-white' : ''}`}>
              <div className="d-flex align-items-center gap-3">
                <div className={`bg-warning ${theme === 'dark' ? 'bg-opacity-10' : 'bg-opacity-10'} p-2 rounded`}>
                  <FiKey size={20} className={`text-warning ${theme === 'dark' ? 'text-white' : ''}`} />
                </div>
                <div>
                  <h5 className={`mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>Security</h5>
                  <p className={`text-muted mb-0 ${theme === 'dark' ? 'text-white' : ''}`}>Change password (coming soon)</p>
                </div>
              </div>
              <span className={`text-muted ${theme === 'dark' ? 'text-white' : ''}`}>🔒</span>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-primary d-flex align-items-center gap-2" onClick={handleSave}>
                <FiSave /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}