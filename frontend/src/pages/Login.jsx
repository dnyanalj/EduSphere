// import React, { useState } from "react";
// import { login } from "../api/authApi";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button"

// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login(form);
//       alert("Login successful!");

//       console.log();
//       navigate(`/${res.data.user.role.toLowerCase()}/dashboard`);
//       // console.log("Navigating to /${role}/dashboard");
//     } catch (err) {
//       alert(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="username"
//           value={form.username}
//           onChange={handleChange}
//           placeholder="Username"
//         />
//         <input
//           name="password"
//           type="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         {/* <button type="submit">Login</button> */}
//          <Button className="bg-blue-600 hover:bg-blue-700 text-white" type="submit">
//           Login
//         </Button>
//         <div className="flex items-start gap-2">
       
       
//       </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Login() {
  //
  const [form, setForm] = useState({ username: "", password: "" }); 
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      navigate(`/${res.data.user.role.toLowerCase()}/dashboard`); 
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    // ✨ FIX: Add a container div for full-screen centering and background
    <div className="flex min-h-screen items-center justify-center p-4 
  bg-gradient-to-br from-gray-50 to-blue-50">
      
      <Card className="w-full max-w-sm rounded-br-2xl shadow-2xl bg-white border-gray-300 " onSubmit={handleSubmit}>
        
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to access your account.
          </CardDescription>
          {/* Change CardAction to link to Signup page */}
          <CardAction className="mt-2">
            <Link to="/signup" className="text-sm font-medium hover:text-blue-700">
              Sign Up
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          {/* Attach onSubmit handler to the form, not the Card */}
          <form onSubmit={handleSubmit}> 
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username" // Name attribute is essential for handleChange
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
                  name="password" // Name attribute is essential for handleChange
                  type="password" 
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              {/* Place primary submit button inside form, within CardContent/CardFooter */}
              <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                        // onClick={handleSubmit}
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
              Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


export default Login;