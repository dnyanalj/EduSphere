import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await login(form);
        alert("Login successful!");
        // window.location.href = "/dashboard";
        console.log(res.data.user);

        navigate("/candidate/dashboard");
        
      } catch (err) {
        alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="p-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
        />
        <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
