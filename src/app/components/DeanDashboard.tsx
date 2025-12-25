import { useState } from "react";
import { User } from "../App";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogOut, Users, BookOpen, FileText, MessageSquare, GraduationCap, TrendingUp } from "lucide-react";
import AttendanceView from "./AttendanceView";
import ExamSchedule from "./ExamSchedule";
import Circulars from "./Circulars";
import ChatSystem from "./ChatSystem";
import FFCSSystem from "./FFCSSystem";

interface DeanDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function DeanDashboard({ user, onLogout }: DeanDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold">{user.name}</h1>
                <p className="text-sm text-gray-500">Dean - {user.department}</p>
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
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ffcs">FFCS Control</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="circulars">Circulars</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,450</div>
                  <p className="text-xs text-gray-500 mt-1">Active enrollment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Faculty Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85</div>
                  <p className="text-xs text-gray-500 mt-1">Full-time staff</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Active Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">142</div>
                  <p className="text-xs text-gray-500 mt-1">This semester</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Average CGPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.85</div>
                  <p className="text-xs text-green-600 mt-1">↑ 0.08 from last sem</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Department Statistics</CardTitle>
                  <CardDescription>Key metrics overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold">FFCS Registration</p>
                      <p className="text-xs text-gray-600">Students registered</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">1,845 / 2,450</p>
                      <p className="text-xs text-gray-600">75.3%</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold">Average Attendance</p>
                      <p className="text-xs text-gray-600">Department wide</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">84.5%</p>
                      <p className="text-xs text-green-600">Above target</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold">Pending Fees</p>
                      <p className="text-xs text-gray-600">Students with dues</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">245</p>
                      <p className="text-xs text-gray-600">10% of total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Administrative Actions</CardTitle>
                  <CardDescription>Quick access to controls</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("ffcs")}>
                    <BookOpen className="w-5 h-5" />
                    <span>FFCS Control</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("exams")}>
                    <TrendingUp className="w-5 h-5" />
                    <span>Exam Management</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("circulars")}>
                    <FileText className="w-5 h-5" />
                    <span>Post Circulars</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => setActiveTab("attendance")}>
                    <Users className="w-5 h-5" />
                    <span>View Reports</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates across the department</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">FFCS window opened</p>
                    <p className="text-xs text-gray-600 mt-1">Students can now register for Winter 2025 courses</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Exam schedule published</p>
                    <p className="text-xs text-gray-600 mt-1">Mid-term examination dates announced for all courses</p>
                    <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-yellow-500 bg-gray-50 rounded">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Fee reminder sent</p>
                    <p className="text-xs text-gray-600 mt-1">Notification sent to 245 students with pending dues</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ffcs">
            <FFCSSystem userRole="dean" />
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceView userRole="dean" userId={user.id} />
          </TabsContent>

          <TabsContent value="exams">
            <ExamSchedule userRole="dean" />
          </TabsContent>

          <TabsContent value="circulars">
            <Circulars userRole="dean" />
          </TabsContent>

          <TabsContent value="chat">
            <ChatSystem user={user} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
