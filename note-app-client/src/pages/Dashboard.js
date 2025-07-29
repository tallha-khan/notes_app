import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../Dashboard.css";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", content: "" });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes", { headers: getHeaders() });
      setNotes(res.data);
    } catch (err) {
      console.error("❌ Error fetching notes:", err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/notes", note, { headers: getHeaders() });
      setNote({ title: "", content: "" });
      fetchNotes();
    } catch (err) {
      console.error("❌ Error adding note:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`, { headers: getHeaders() });
      fetchNotes();
    } catch (err) {
      console.error("❌ Error deleting note:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      fetchNotes();
      api
        .get("/auth/me", { headers: getHeaders() })
        .then((res) => {
          setEmail(res.data.email);
          setName(res.data.name);
        })
        .catch((err) => {
          console.error("❌ Failed to load user", err);
          localStorage.removeItem("token");
          window.location.href = "/";
        });
    }
  }, []);
  

  return (
    <div className="dashboard-container">
      <div className="header">
        <h2>📝 My Notes</h2>
        <div className="user-info">
          
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <form className="note-form" onSubmit={handleAdd}>
      <span> Welcome, {name} ({email})</span>
      <button type="submit">Create Note</button>
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          required
        />
        
      </form>

      <div className="notes-grid">
        {notes.map((n) => (
          <div key={n._id} className="note-card">
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <button onClick={() => handleDelete(n._id)}>🗑 Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
