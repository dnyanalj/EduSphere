import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, User, Mail, UserCog } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ⚡ Replace with real API call
    const data = {
      name: "Dnyanal",
      email: "dnyanal@example.com",
      role: "Candidate",
      testsTaken: 12,
      accuracy: "78%",
      joinedAt: "2024-09-12",
    };
    setUser(data);
  }, []);

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">

        {/* 🧑 Profile Info */}
        <Card className="border border-gray-200 shadow-md rounded-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <User className="w-6 h-6 text-gray-700" />
              Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 ring-2 ring-gray-300">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-xl">
                  {user.name[0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>

                <Badge variant="secondary" className="mt-2">
                  {user.role}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* 📝 Editable Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <Input defaultValue={user.name} className="mt-1" />
              </div>

              <div>
                <label className="text-sm text-gray-600">Email</label>
                <Input defaultValue={user.email} disabled className="mt-1" />
              </div>
            </div>

            <Button className="w-full bg-black hover:bg-gray-900 mt-4">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* 📊 Stats Card */}
        <Card className="border border-gray-200 shadow-md rounded-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserCog className="w-5 h-5 text-gray-700" /> Account Stats
            </CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-gray-100">
              <h3 className="text-xl font-bold text-gray-800">
                {user.testsTaken}
              </h3>
              <p className="text-sm text-gray-500">Tests Taken</p>
            </div>

            <div className="p-4 rounded-lg bg-gray-100">
              <h3 className="text-xl font-bold text-gray-800">
                {user.accuracy}
              </h3>
              <p className="text-sm text-gray-500">Accuracy</p>
            </div>

            <div className="p-4 rounded-lg bg-gray-100">
              <h3 className="text-xl font-bold text-gray-800">
                {new Date(user.joinedAt).toLocaleDateString()}
              </h3>
              <p className="text-sm text-gray-500">Joined</p>
            </div>
          </CardContent>
        </Card>

        {/* 🚪 Logout Button */}
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>
    </div>
  );
}
