import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { FiLogOut, FiMenu, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-body shadow-sm py-2 px-4"
           style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1020 }}>
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
            StudentPro
          </Link>

          <div className="d-flex align-items-center gap-3">
            <ThemeToggle />
            <div className="dropdown">
              <button
                className="btn btn-sm rounded-circle bg-light border"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FiUser size={18} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><button className="dropdown-item text-danger"><FiLogOut /> Logout</button></li>
              </ul>
            </div>
            <button
              className="navbar-toggler d-lg-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="d-lg-none"
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            bottom: 0,
            width: '240px',
            zIndex: 1030,
            backgroundColor: 'var(--bg-color)',
            borderRight: '1px solid var(--border-color)'
          }}
          onClick={() => setSidebarOpen(false)}
        >
          <Sidebar />
        </div>
      )}

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="d-lg-none"
          style={{
            position: 'fixed',
            top: '60px',
            left: '240px',
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1029
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}