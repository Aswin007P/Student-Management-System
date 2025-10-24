import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className="mt-auto py-4 border-top"
      style={{
        backgroundColor: 'var(--card-bg)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 1000
      }}
    >
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-muted mb-2 mb-md-0">
            © {new Date().getFullYear()} <span className="fw-semibold">StudentPro</span>. All rights reserved.
          </div>
         <Link
            to="/about"
            className="text-muted text-decoration-none fw-medium"
            style={{
              transition: 'color 0.25s ease, transform 0.2s ease',
              padding: '4px 8px',
              borderRadius: '6px',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = theme === 'dark' ? '#4cc9f0' : '#4361ee';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '';
              e.target.style.transform = '';
            }}
          >
            About StudentPro
          </Link>
          <div className="d-flex align-items-center gap-1">
            <span className="text-muted">Built by</span>
            <a
              href="https://github.com/Aswin007P"
              target="_blank"
              rel="noopener noreferrer"
              className="fw-bold text-decoration-none"
              style={{
                color: theme === 'dark' ? '#4cc9f0' : '#4361ee'
              }}
            >
              Aswin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}