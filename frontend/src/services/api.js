const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const handleResponse = async (res) => {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  return res.json();
};

export const api = {
  // Students API
  getStudents: () => fetch(`${BASE_URL}/api/students`).then(handleResponse),
  getStudentById: (id) => fetch(`${BASE_URL}/api/students/${id}`).then(handleResponse),
  createStudent: (data) =>
    fetch(`${BASE_URL}/api/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateStudent: (id, data) =>
    fetch(`${BASE_URL}/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  deleteStudent: (id) =>
    fetch(`${BASE_URL}/api/students/${id}`, { method: 'DELETE' }).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res; // DELETE usually returns no body
    }),

  // Events API
  getEvents: () => fetch(`${BASE_URL}/api/events`).then(handleResponse),
  getEventById: (id) => fetch(`${BASE_URL}/api/events/${id}`).then(handleResponse),
  createEvent: (data) =>
    fetch(`${BASE_URL}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  updateEvent: (id, data) =>
    fetch(`${BASE_URL}/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(handleResponse),
  deleteEvent: (id) =>
    fetch(`${BASE_URL}/api/events/${id}`, { method: 'DELETE' }).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    }),
};