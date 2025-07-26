import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleSuccess() {
  const navigate = useNavigate();
useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    console.log("✅ Redirected URL:", url.href);
    console.log("✅ Extracted Token:", token);

    if (token) {
      try {
        localStorage.setItem("token", token);
        console.log("✅ Token saved to localStorage");

        // Optional: confirm token is stored before navigating
        const saved = localStorage.getItem("token");
        if (saved) {
          navigate("/dashboard");
        } else {
          console.warn("⚠️ Token not stored properly");
          navigate("/");
        }
      } catch (err) {
        console.error("❌ Failed to save token:", err);
        navigate("/");
      }
    } else {
      console.warn("⚠️ No token found in URL");
      navigate("/");
    }
  }, [navigate]);

  return <p>🔐 Logging in via Google...</p>;
}

export default GoogleSuccess;
