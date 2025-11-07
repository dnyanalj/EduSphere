
//   return (

//     <div className="p-4">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Full Name"
//         />
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
//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//         <select name="role" value={form.role} onChange={handleChange}>
//           <option value="CANDIDATE">Candidate</option>
//           <option value="EXAMINER">Examiner</option>
//         </select>
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//     //   <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
//     //   <div className="flex w-full max-w-sm flex-col gap-6">
//     //     <a href="#" className="flex items-center gap-2 self-center font-medium">
//     //       <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
//     //         <GalleryVerticalEnd className="size-4" />
//     //       </div>
//     //       Acme Inc.
//     //     </a>
//     //     <SignupForm />
//     //   </div>
//     // </div>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import { signup } from "../api/authApi";
import { Link,useNavigate } from "react-router-dom";
// import {SignupForm} from "@/components/signup-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Signup() {
  // const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    role: "CANDIDATE",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleRoleChange = (value) =>
    setForm({ ...form, role: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      // alert("Signup successful!");
      console.log("Signup response:", res);

      navigate(`/${form.role.toLowerCase()}/dashboard`);

    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto w-full max-w-5xl bg-white rounded-2xl border border-gray-200 shadow-lg grid md:grid-cols-2 overflow-hidden">
        
        {/* LEFT SIDE — FORM */}
        <div className="flex flex-col justify-center p-10">
          <div className="mx-auto w-full max-w-sm space-y-7">
            
            {/* HEADER */}
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Sign up to get started with your new account
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="m@example.com"
                  className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="image" className="text-gray-700">Profile Picture</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="border-gray-300 text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200"
                />
              </div> */}

              {/* ROLE BUTTONS */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-700">Role</Label>
                <div className="flex w-full rounded-md overflow-hidden border border-gray-300">
                  {/* Candidate Button */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange("CANDIDATE")}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                      form.role === "CANDIDATE"
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Candidate
                  </button>
                  {/* Examiner Button */}

                  <button
                    type="button"
                    onClick={() => handleRoleChange("EXAMINER")}
                    className={`flex-1 px-4 py-2 text-sm font-medium transition-colors border-l border-gray-300 ${
                      form.role === "EXAMINER"
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Examiner
                  </button>

                </div>
              </div>

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </form>

            {/* FOOTER LINKS */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="underline underline-offset-4 hover:text-black"
              >
                Log in
              </Link>
            </p>

            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-black">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-black">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — FULL IMAGE AREA */}
        <div className="hidden md:block relative bg-gray-100">
          <img
            src="/Data_security_01.jpg"
            alt="Signup Illustration"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" /> {/* Subtle dark overlay */}
        </div>
      </div>
    </div>
  );
}
