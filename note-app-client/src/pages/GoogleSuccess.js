import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function GoogleSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    console.log("✅ URL:", window.location.href);
    console.log("✅ Token from URL:", token);

    if (token) {
      localStorage.setItem("token", token);
      // Delay to ensure token is stored before redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 100); // short delay to ensure setItem is committed
    } else {
      navigate("/");
    }
  }, [navigate, location]);

  return <p>🔐 Logging in via Google...</p>;
}

export default GoogleSuccess;
