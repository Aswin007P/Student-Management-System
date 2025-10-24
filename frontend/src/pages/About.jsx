import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="container py-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card text-center p-5"
      >
        <h2 className="mb-3">About StudentPro</h2>
        <p className="lead">
          A modern, responsive Student Management System built with React, Bootstrap, and Framer Motion.
        </p>
        <p>
          Designed for educational institutions to manage student records efficiently and beautifully.
        </p>
      </motion.div>
    </div>
  );
}