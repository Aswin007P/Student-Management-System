import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="display-4 fw-bold text-primary mb-3">
          Welcome to StudentPro
        </h1>
        <p className="lead text-muted mb-4">
          Manage your students with elegance and simplicity.
        </p>
         <Link
          to="/dashboard"
          className="btn btn-primary px-4 py-2 d-inline-flex align-items-center gap-2"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}