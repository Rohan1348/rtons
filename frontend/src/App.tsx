import React, { useState, useEffect } from "react";
import { login, register, getCurrentUser, logout } from "./services/auth"; // Adjust the import path as needed
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userInfo = getCurrentUser();
    if (userInfo.token) {
      setUser(userInfo.token);
      setUsername(userInfo.username || ""); // Set the username
    }
  }, []);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let result;
      if (isRegistering) {
        // Handle registration
        result = await register(username, password, "user");
      } else {
        // Handle login
        result = await login(username, password);
      }
      if (result.token) {
        localStorage.setItem("token", result.token);
        setUser(result.token);
        setUsername(username);
      } else {
        setError("Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error", error);
      setError("An error occurred during authentication");
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setUsername("");
    setPassword("");
  };

  if (!user) {
    return (
      <div className="auth-container">
        <h2 className="auth-title">{isRegistering ? "Register" : "Login"}</h2>
        <form className="auth-form" onSubmit={handleAuth}>
          <input
            className="auth-input"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <button
          className="toggle-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering
            ? "Already have an account? Log in"
            : "Don't have an account? Register"}
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <Dashboard username={username} />
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default App;
