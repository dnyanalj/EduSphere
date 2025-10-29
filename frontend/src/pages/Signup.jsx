import React, { useState } from "react";
import { signup } from "../api/authApi";
import { Link,useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "CANDIDATE",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      alert("Signup successful!");
      
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="p-4">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
        />
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
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="CANDIDATE">Candidate</option>
          <option value="EXAMINER">Examiner</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
