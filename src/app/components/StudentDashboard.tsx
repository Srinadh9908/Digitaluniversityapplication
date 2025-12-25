import { useState } from "react";
import { User } from "../App";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogOut, BookOpen, DollarSign, Calendar, FileText, MessageSquare, ClipboardCheck, GraduationCap } from "lucide-react";
import FFCSSystem from "./FFCSSystem";
import FeesPayment from "./FeesPayment";
import AttendanceView from "./AttendanceView";
import ExamSchedule from "./ExamSchedule";
import Timetable from "./Timetable";
import Circulars from "./Circulars";
import ChatSystem from "./ChatSystem";

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">{user.name}</h1>
                <p className="text-sm text-gray-500">{user.registrationNumber}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ffcs">FFCS</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="circulars">Circulars</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Current Semester</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Semester 5</div>
                  <p className="text-xs text-gray-500 mt-1">Winter 2024-25</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Overall CGPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.75</div>
                  <p className="text-xs text-green-600 mt-1">↑ 0.12 from last sem</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Attendance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-gray-500 mt-1">Above minimum</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Pending Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹0</div>
                  <p className="text-xs text-green-600 mt-1">All cleared</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and features</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("ffcs")}>
                    <BookOpen className="w-5 h-5" />
                    <span>FFCS Registration</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("fees")}>
                    <DollarSign className="w-5 h-5" />
                    <span>Pay Fees</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("timetable")}>
                    <Calendar className="w-5 h-5" />
                    <span>View Timetable</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("chat")}>
                    <MessageSquare className="w-5 h-5" />
                    <span>Messages</span>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                  <CardDescription>Latest updates and circulars</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-semibold">FFCS Registration Open</p>
                    <p className="text-xs text-gray-600 mt-1">Register for courses before Jan 15, 2025</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-semibold">Mid-term Exams Schedule</p>
                    <p className="text-xs text-gray-600 mt-1">Check exam dates in the Exams section</p>
                  </div>
                  <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab("circulars")}>
                    View all circulars →
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ffcs">
            <FFCSSystem userRole="student" />
          </TabsContent>

          <TabsContent value="fees">
            <FeesPayment user={user} />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceView userRole="student" userId={user.id} />
          </TabsContent>

          <TabsContent value="exams">
            <ExamSchedule userRole="student" />
          </TabsContent>

          <TabsContent value="timetable">
            <Timetable userRole="student" />
          </TabsContent>

          <TabsContent value="circulars">
            <Circulars userRole="student" />
          </TabsContent>

          <TabsContent value="chat">
            <ChatSystem user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
