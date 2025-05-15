import { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setForm({ name: '', email: '' });
  };

  return (
    <div className="container">
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
        />
        <button type="submit">Add User</button>
      </form>
      {/* Users list hidden */}
    </div>
  );
}

export default App;
