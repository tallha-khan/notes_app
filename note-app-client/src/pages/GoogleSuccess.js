import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <p>🔐 Logging in via Google...</p>;
}

export default GoogleSuccess;
