import { useState } from "react";
import { User } from "../App";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogOut, Users, BookOpen, FileText, MessageSquare, GraduationCap } from "lucide-react";
import AttendanceView from "./AttendanceView";
import ExamSchedule from "./ExamSchedule";
import Circulars from "./Circulars";
import ChatSystem from "./ChatSystem";

interface StaffDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function StaffDashboard({ user, onLogout }: StaffDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">{user.name}</h1>
                <p className="text-sm text-gray-500">Staff - {user.department}</p>
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
          <TabsList className="grid grid-cols-3 lg:grid-cols-5 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="circulars">Circulars</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-gray-500 mt-1">This semester</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">180</div>
                  <p className="text-xs text-gray-500 mt-1">Across all courses</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Pending Evaluations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-yellow-600 mt-1">Due this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Classes Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-gray-500 mt-1">Theory sessions</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>My Courses</CardTitle>
                  <CardDescription>Current semester courses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">CSE3001 - Data Structures</p>
                        <p className="text-sm text-gray-500">Slot: A1+TA1</p>
                      </div>
                      <span className="text-sm text-blue-600">60 students</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => setActiveTab("attendance")}>
                        Mark Attendance
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">CSE3002 - Algorithms</p>
                        <p className="text-sm text-gray-500">Slot: B1+TB1</p>
                      </div>
                      <span className="text-sm text-blue-600">55 students</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => setActiveTab("attendance")}>
                        Mark Attendance
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">CSE4001 - Database Systems</p>
                        <p className="text-sm text-gray-500">Slot: C1+TC1</p>
                      </div>
                      <span className="text-sm text-blue-600">65 students</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => setActiveTab("attendance")}>
                        Mark Attendance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("attendance")}>
                    <Users className="w-5 h-5" />
                    <span>Mark Attendance</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("exams")}>
                    <BookOpen className="w-5 h-5" />
                    <span>Manage Exams</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("circulars")}>
                    <FileText className="w-5 h-5" />
                    <span>View Circulars</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("chat")}>
                    <MessageSquare className="w-5 h-5" />
                    <span>Messages</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceView userRole="staff" userId={user.id} />
          </TabsContent>

          <TabsContent value="exams">
            <ExamSchedule userRole="staff" />
          </TabsContent>

          <TabsContent value="circulars">
            <Circulars userRole="staff" />
          </TabsContent>

          <TabsContent value="chat">
            <ChatSystem user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
