import { useState } from "react";
import useFetch from "./useFetch";

function App() {
  const [secret, setSecret] = useState("");
  const [fetchUrl, setFetchUrl] = useState(null);
  
  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://playground-026-auth-backend.vercel.app/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ secret }),
        }
      );
      const data = await response.json();
      console.log("Login response:", data);
      
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        alert("Login successful!");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const { data, loading, error } = useFetch(fetchUrl);

  const handleFetch = () => {
    setFetchUrl("https://playground-026-auth-backend.vercel.app/admin/api/data");
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
{/*       
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleFetch}>Fetch Protected Data</button>
        
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && <p>Data: {JSON.stringify(data)}</p>}
      </div> */}
    </div>
  );
}

export default App;