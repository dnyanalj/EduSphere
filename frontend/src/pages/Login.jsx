import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Login() {
  const [form, setForm] = useState({ username: "john", password: "54321" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      navigate(`/${user.role.toLowerCase()}/dashboard`);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <img
          src="/ShikenXbgr.png"
          alt="ShikenX Logo"
          className="fixed top-6 left-6 h-10 w-auto drop-shadow-md bg-black/30 px-2 py-1 rounded-md z-50"
          onClick={() => navigate(`/signup`)}
        />

      <Card className="w-full max-w-sm rounded-br-2xl shadow-2xl bg-white border-gray-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Enter your credentials below to access your account.
          </CardDescription>
          <CardAction className="mt-2">
            <Link
              to="/signup"
              className="text-sm font-medium hover:text-blue-700"
            >
              Sign Up
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Your Username"
                  required
                  value={form.username}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-gray-600 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-3 pt-0">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Login with Google :(
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
