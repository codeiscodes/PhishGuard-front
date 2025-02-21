import { useState } from "react";
import axios from "axios";

function ServerPage() {
  const [status, setStatus] = useState("Click to start server...");
  const [trying, setTrying] = useState(true);

  const checkServer = async () => {
    let success = false;
    setStatus("Pinging server...");
    setTrying(false);

    while (!success) {
      try {
        const response = await axios.get(
          "https://phishguard-back.onrender.com/ping"
        );
        console.log(response);
        if (response.data.code === 200) {
          setStatus("✅ Server is up and running!");
          success = true;
          setTrying(true);
        } else {
          setStatus("⏳ Server starting... Retrying...");
        }
      } catch {
        setStatus("❌ Server unreachable. Retrying...");
      }
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 sec before retrying
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Server Status</h1>
      <p>{status}</p>
      {trying && (
        <button
          onClick={checkServer}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Start Server
        </button>
      )}
    </div>
  );
}

export default ServerPage;
