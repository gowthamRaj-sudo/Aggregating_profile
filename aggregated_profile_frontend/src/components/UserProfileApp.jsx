import React, { useState } from "react";
import Instance from "../utils/Instance";
import Input from "./Input";
import Button from "./Button";

const UserProfileApp = () => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await Instance.post(`/auth/login`, {
        username,
        password,
      });

      const data = await response.data;

      if (response.status === 200) {
        setToken(data.token);
        setMessage("Login successful!");
        setUsername("");
        setPassword("");
      } else {
        setMessage("Error: " + (data.error || "Login failed"));
      }
    } catch (err) {
      setMessage("Error: Something went to wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUser = async () => {
    if (!searchUsername.trim()) {
      setMessage("Please enter a username");
      return;
    }

    setLoading(true);
    setMessage("");
    setUserProfile(null);

    try {
      const response = await Instance.get(`/users/${searchUsername}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      if (response.status === 200) {
        setUserProfile(data);
        setMessage("Profile loaded successfully!");
      } else {
        setMessage("Error: " + (data.error || "Failed to fetch profile"));
      }
    } catch (err) {
      setMessage("Error: Something went to wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setUserProfile(null);
    setSearchUsername("");
    setMessage("Logged out successfully");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1>User Profile Aggregator</h1>
      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e8",
            border:
              "1px solid " +
              (message.includes("Error") ? "#f44336" : "#4caf50"),
            borderRadius: "4px",
          }}
        >
          {message}
        </div>
      )}
      {!token ? (
        <div
          style={{
            marginBottom: "30px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <h2>Login</h2>
          <div style={{ marginBottom: "10px" }}>
            <Input
              type={"text"}
              label={"Username:"}
              value={username}
              onChange={setUsername}
              placeholder={"Enter any username..."}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Input
              type={"password"}
              label={"Password:"}
              value={password}
              onChange={setPassword}
              placeholder={"Enter any password"}
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
            text={loading ? "Logging in..." : "Login"}
            loading={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          />
          <p style={{ marginTop: "10px", fontSize: "14px", color: "#666" }}>
            Note: Use any username/password combination to login
          </p>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Dashboard</h2>
            <Button
              onClick={handleLogout}
              text={"Logout"}
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
          </div>
          <div
            style={{
              marginBottom: "30px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h3>Search User Profile</h3>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                placeholder="Enter username (e.g., Bret, octocat)"
                style={{ flex: 1, padding: "8px" }}
              />
              <Button
                onClick={handleSearchUser}
                disabled={loading}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.6 : 1,
                }}
                text={loading ? "Searching..." : "Search"}
              />
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
              <strong>Try these users:</strong> Bret, Antonette, Samantha,
              octocat, torvalds, gaearon
            </div>
          </div>
          {userProfile && (
            <div
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>User Profile: {userProfile.username}</h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "20px",
                }}
              >
                <div>
                  <h4>Basic Information</h4>
                  <p>
                    <strong>Name:</strong> {userProfile?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userProfile?.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {userProfile?.role}
                  </p>
                  <p>
                    <strong>City:</strong> {userProfile?.city}
                  </p>
                  <p>
                    <strong>Company:</strong> {userProfile?.companyName}
                  </p>
                </div>
                <div>
                  <h4>GitHub Information</h4>
                  {userProfile?.github?.profile !== "N/A" ? (
                    <div>
                      {userProfile?.github?.avatarUrl !== "N/A" && (
                        <img
                          src={userProfile?.github?.avatarUrl}
                          alt="Avatar"
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            marginBottom: "10px",
                          }}
                        />
                      )}
                      <p>
                        <strong>Bio:</strong> {userProfile?.github?.bio}
                      </p>
                      <p>
                        <strong>Public Repos:</strong>{" "}
                        {userProfile?.github?.publicRepos}
                      </p>
                      <p>
                        <strong>Profile:</strong>
                        <a
                          href={userProfile?.github.profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#007bff",
                            textDecoration: "none",
                            marginLeft: "5px",
                          }}
                        >
                          View GitHub Profile
                        </a>
                      </p>
                    </div>
                  ) : (
                    <p>No GitHub profile found</p>
                  )}
                </div>
              </div>

              <details style={{ marginTop: "20px" }}>
                <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                  Raw API Response
                </summary>
                <pre
                  style={{
                    backgroundColor: "#f5f5f5",
                    padding: "10px",
                    borderRadius: "4px",
                    overflow: "auto",
                    fontSize: "12px",
                  }}
                >
                  {JSON.stringify(userProfile, null, 2)}
                </pre>
              </details>
            </div>
          )}

          {!userProfile && !loading && (
            <div
              style={{ textAlign: "center", padding: "40px", color: "#666" }}
            >
              <p>view their aggregated profile...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfileApp;
