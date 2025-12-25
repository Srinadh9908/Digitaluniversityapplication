import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { User, UserRole } from "../App";
import { GraduationCap } from "lucide-react";

interface LoginPageProps {
  onLogin: (user: User) => void;
}

// Mock users for demonstration
const mockUsers = {
  student: {
    id: "STU001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@university.edu",
    role: "student" as UserRole,
    registrationNumber: "20BCE1234",
    department: "Computer Science Engineering",
  },
  staff: {
    id: "STF001",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@university.edu",
    role: "staff" as UserRole,
    department: "Computer Science Engineering",
  },
  dean: {
    id: "DEAN001",
    name: "Prof. Arun Mehta",
    email: "arun.mehta@university.edu",
    role: "dean" as UserRole,
    department: "School of Computing",
  },
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [role, setRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role) {
      onLogin(mockUsers[role]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle>Digital University Portal</CardTitle>
          <CardDescription>Login to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select value={role || ""} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="dean">Dean</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
              <p className="font-semibold mb-1">Demo Login:</p>
              <p className="text-xs text-gray-600">Select any role and use any email/password to login</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
