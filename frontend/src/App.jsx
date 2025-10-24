import About from "./pages/About";
import AddEvent from "./pages/AddEvent";
import AddStudent from "./pages/AddStudent";
import Dashboard from "./pages/Dashboard";
import EditEvent from "./pages/EditEvent";
import EditStudent from "./pages/EditStudent";
import Events from "./pages/Events";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Students from "./pages/Students";
import ViewEvent from "./pages/ViewEvent";
import ViewStudent from "./pages/ViewStudent";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex min-vh-100">
        {/* Desktop Sidebar */}
        <div className="d-none d-lg-block">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '240px' }}>
          <Navbar />
          <main className="flex-grow-1 pt-4 pb-5" style={{ 
            minHeight: 'calc(100vh - 120px)', 
            paddingTop: 'var(--navbar-height)'
          }}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/add" element={<AddStudent />} />
                <Route path="/students/edit/:id" element={<EditStudent />} />
                <Route path="/students/view/:id" element={<ViewStudent />} />
                
                {/* ✅ Events Routes */}
                <Route path="/events" element={<Events />} />
                <Route path="/events/add" element={<AddEvent />} />
                <Route path="/events/edit/:id" element={<EditEvent />} />
                {/* 👇 ADD THIS ROUTE */}
                <Route path="/events/view/:id" element={<ViewEvent />} />

                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;