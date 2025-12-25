import { useState } from "react";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/StudentDashboard";
import StaffDashboard from "./components/StaffDashboard";
import DeanDashboard from "./components/DeanDashboard";

export type UserRole = "student" | "staff" | "dean" | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  registrationNumber?: string;
  department?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {user.role === "student" && <StudentDashboard user={user} onLogout={handleLogout} />}
      {user.role === "staff" && <StaffDashboard user={user} onLogout={handleLogout} />}
      {user.role === "dean" && <DeanDashboard user={user} onLogout={handleLogout} />}
    </>
  );
}
