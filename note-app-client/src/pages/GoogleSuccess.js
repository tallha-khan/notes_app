import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      fetchNotes();
      api
        .get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setName(res.data.name);
          setEmail(res.data.email);
        })
        .catch((err) => {
          console.error("❌ Failed to load user", err);
          localStorage.removeItem("token");
          window.location.href = "/";
        });
    }
  }, []);
  

  return <p>🔐 Logging in via Google...</p>;
}

export default GoogleSuccess;
