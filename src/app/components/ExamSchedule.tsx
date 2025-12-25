import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Calendar, Clock, MapPin, FileText, Plus, Edit } from "lucide-react";
import { toast } from "sonner";

interface Exam {
  id: string;
  courseCode: string;
  courseName: string;
  type: "Mid-term" | "End-term" | "Quiz" | "Assignment";
  date: string;
  time: string;
  duration: string;
  venue: string;
  status: "upcoming" | "completed" | "ongoing";
  marks?: number;
  totalMarks?: number;
}

const mockExams: Exam[] = [
  {
    id: "1",
    courseCode: "CSE3001",
    courseName: "Data Structures",
    type: "Mid-term",
    date: "2025-01-20",
    time: "09:00 AM",
    duration: "2 hours",
    venue: "MB-301",
    status: "upcoming",
  },
  {
    id: "2",
    courseCode: "CSE3002",
    courseName: "Algorithms",
    type: "Mid-term",
    date: "2025-01-22",
    time: "02:00 PM",
    duration: "2 hours",
    venue: "MB-302",
    status: "upcoming",
  },
  {
    id: "3",
    courseCode: "CSE4001",
    courseName: "Database Systems",
    type: "Quiz",
    date: "2024-12-10",
    time: "10:00 AM",
    duration: "30 minutes",
    venue: "Online",
    status: "completed",
    marks: 18,
    totalMarks: 20,
  },
  {
    id: "4",
    courseCode: "CSE4002",
    courseName: "Machine Learning",
    type: "Assignment",
    date: "2024-12-15",
    time: "11:59 PM",
    duration: "N/A",
    venue: "Online Submission",
    status: "completed",
    marks: 45,
    totalMarks: 50,
  },
];

interface ExamScheduleProps {
  userRole: "student" | "staff" | "dean";
}

export default function ExamSchedule({ userRole }: ExamScheduleProps) {
  const [showAddExam, setShowAddExam] = useState(false);

  const upcomingExams = mockExams.filter((exam) => exam.status === "upcoming");
  const completedExams = mockExams.filter((exam) => exam.status === "completed");

  const handleAddExam = () => {
    toast.success("Exam added successfully!");
    setShowAddExam(false);
  };

  if (userRole === "student") {
    const totalMarks = completedExams.reduce((sum, exam) => sum + (exam.marks || 0), 0);
    const totalPossible = completedExams.reduce((sum, exam) => sum + (exam.totalMarks || 0), 0);
    const percentage = totalPossible > 0 ? Math.round((totalMarks / totalPossible) * 100) : 0;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Upcoming Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingExams.length}</div>
              <p className="text-xs text-gray-500 mt-1">Next: Jan 20, 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Current Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{percentage}%</div>
              <p className="text-xs text-gray-500 mt-1">
                {totalMarks}/{totalPossible} marks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedExams.length}</div>
              <p className="text-xs text-gray-500 mt-1">Assessments done</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Examinations</CardTitle>
            <CardDescription>Schedule for your upcoming exams and assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingExams.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No upcoming exams scheduled</p>
            ) : (
              upcomingExams.map((exam) => (
                <div key={exam.id} className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">
                          {exam.courseCode} - {exam.courseName}
                        </h3>
                        <Badge variant="outline">{exam.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700 mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exam.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{exam.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exam.venue}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exam Results</CardTitle>
            <CardDescription>Your scores in completed assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedExams.map((exam) => (
              <div key={exam.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">
                        {exam.courseCode} - {exam.courseName}
                      </h3>
                      <Badge variant="outline">{exam.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{exam.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {exam.marks}/{exam.totalMarks}
                    </div>
                    <Badge className="bg-green-500 mt-1">
                      {Math.round(((exam.marks || 0) / (exam.totalMarks || 1)) * 100)}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Staff/Dean view - managing exams
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Examination Management</CardTitle>
              <CardDescription>Schedule and manage examinations</CardDescription>
            </div>
            <Button onClick={() => setShowAddExam(!showAddExam)}>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Exam
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddExam && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Schedule New Exam</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Course Code</label>
                  <Input placeholder="CSE3001" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Exam Type</label>
                  <Input placeholder="Mid-term" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Date</label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Time</label>
                  <Input type="time" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Duration</label>
                  <Input placeholder="2 hours" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Venue</label>
                  <Input placeholder="MB-301" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Instructions</label>
                  <Textarea placeholder="Additional instructions for students..." rows={3} />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={() => setShowAddExam(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExam}>Schedule Exam</Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="font-semibold">Scheduled Examinations</h3>
            {mockExams.map((exam) => (
              <div key={exam.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">
                        {exam.courseCode} - {exam.courseName}
                      </h3>
                      <Badge variant="outline">{exam.type}</Badge>
                      <Badge
                        className={
                          exam.status === "upcoming"
                            ? "bg-blue-500"
                            : exam.status === "ongoing"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }
                      >
                        {exam.status}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{exam.venue}</span>
                  </div>
                </div>
                {userRole === "staff" && exam.status === "completed" && (
                  <div className="mt-3">
                    <Button size="sm">
                      <FileText className="w-4 h-4 mr-1" />
                      Upload Results
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {userRole === "dean" && (
        <Card>
          <CardHeader>
            <CardTitle>Examination Statistics</CardTitle>
            <CardDescription>Overview of examination performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Exams Scheduled</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                <p className="text-2xl font-bold">78.5%</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Pending Evaluations</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
