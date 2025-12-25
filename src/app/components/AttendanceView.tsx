import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AttendanceRecord {
  id: string;
  courseCode: string;
  courseName: string;
  date: string;
  status: "present" | "absent" | "od";
  slot: string;
}

interface CourseAttendance {
  courseCode: string;
  courseName: string;
  totalClasses: number;
  attended: number;
  percentage: number;
}

const mockStudentAttendance: AttendanceRecord[] = [
  {
    id: "1",
    courseCode: "CSE3001",
    courseName: "Data Structures",
    date: "2024-12-24",
    status: "present",
    slot: "A1",
  },
  {
    id: "2",
    courseCode: "CSE3002",
    courseName: "Algorithms",
    date: "2024-12-24",
    status: "present",
    slot: "B1",
  },
  {
    id: "3",
    courseCode: "CSE4001",
    courseName: "Database Systems",
    date: "2024-12-23",
    status: "absent",
    slot: "C1",
  },
  {
    id: "4",
    courseCode: "CSE3001",
    courseName: "Data Structures",
    date: "2024-12-23",
    status: "present",
    slot: "A1",
  },
];

const mockCourseAttendance: CourseAttendance[] = [
  {
    courseCode: "CSE3001",
    courseName: "Data Structures",
    totalClasses: 40,
    attended: 36,
    percentage: 90,
  },
  {
    courseCode: "CSE3002",
    courseName: "Algorithms",
    totalClasses: 38,
    attended: 32,
    percentage: 84,
  },
  {
    courseCode: "CSE4001",
    courseName: "Database Systems",
    totalClasses: 35,
    attended: 30,
    percentage: 86,
  },
  {
    courseCode: "CSE4002",
    courseName: "Machine Learning",
    totalClasses: 32,
    attended: 28,
    percentage: 88,
  },
];

interface Student {
  id: string;
  name: string;
  regNo: string;
}

const mockStudents: Student[] = [
  { id: "1", name: "Rajesh Kumar", regNo: "20BCE1234" },
  { id: "2", name: "Priya Sharma", regNo: "20BCE1235" },
  { id: "3", name: "Arun Menon", regNo: "20BCE1236" },
  { id: "4", name: "Sneha Patel", regNo: "20BCE1237" },
  { id: "5", name: "Vikram Singh", regNo: "20BCE1238" },
];

interface AttendanceViewProps {
  userRole: "student" | "staff" | "dean";
  userId: string;
}

export default function AttendanceView({ userRole, userId }: AttendanceViewProps) {
  const [selectedCourse, setSelectedCourse] = useState("CSE3001");
  const [attendanceMap, setAttendanceMap] = useState<Record<string, boolean>>({});

  const handleMarkAttendance = () => {
    const presentCount = Object.values(attendanceMap).filter((v) => v).length;
    toast.success(`Attendance marked for ${presentCount} students`);
    setAttendanceMap({});
  };

  if (userRole === "student") {
    const overallAttendance = Math.round(
      mockCourseAttendance.reduce((sum, course) => sum + course.percentage, 0) /
        mockCourseAttendance.length
    );

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Overall Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallAttendance}%</div>
              <p className="text-xs text-green-600 mt-1">Above minimum (75%)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Classes Attended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">126/145</div>
              <p className="text-xs text-gray-500 mt-1">Total across courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">At Risk Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-green-600 mt-1">All courses above 75%</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course-wise Attendance</CardTitle>
            <CardDescription>Your attendance percentage for each course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockCourseAttendance.map((course) => (
              <div key={course.courseCode} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">
                      {course.courseCode} - {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Attended: {course.attended}/{course.totalClasses} classes
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{course.percentage}%</div>
                    {course.percentage >= 75 ? (
                      <Badge className="bg-green-500 mt-1">Good</Badge>
                    ) : (
                      <Badge className="bg-red-500 mt-1">At Risk</Badge>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      course.percentage >= 75 ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ width: `${course.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
            <CardDescription>Last 10 days attendance record</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockStudentAttendance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {record.status === "present" && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                    {record.status === "absent" && <XCircle className="w-5 h-5 text-red-500" />}
                    {record.status === "od" && <AlertCircle className="w-5 h-5 text-blue-500" />}
                    <div>
                      <p className="font-semibold text-sm">
                        {record.courseCode} - {record.courseName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {record.date} | Slot: {record.slot}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      record.status === "present"
                        ? "bg-green-500"
                        : record.status === "absent"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }
                  >
                    {record.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Staff/Dean view - marking attendance
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Select course and mark attendance for today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-sm font-semibold mb-2 block">Select Course</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE3001">CSE3001 - Data Structures</SelectItem>
                  <SelectItem value="CSE3002">CSE3002 - Algorithms</SelectItem>
                  <SelectItem value="CSE4001">CSE4001 - Database Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Date</label>
              <div className="flex items-center gap-2 p-2 border rounded-lg">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Dec 25, 2024</span>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Student List</h3>
              <div className="text-sm text-gray-600">
                Present: {Object.values(attendanceMap).filter((v) => v).length}/{mockStudents.length}
              </div>
            </div>

            <div className="space-y-3">
              {mockStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={attendanceMap[student.id] || false}
                      onCheckedChange={(checked) =>
                        setAttendanceMap({
                          ...attendanceMap,
                          [student.id]: checked as boolean,
                        })
                      }
                    />
                    <div>
                      <p className="font-semibold text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.regNo}</p>
                    </div>
                  </div>
                  <Badge variant={attendanceMap[student.id] ? "default" : "outline"}>
                    {attendanceMap[student.id] ? "Present" : "Absent"}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const allPresent = mockStudents.reduce(
                    (acc, student) => ({ ...acc, [student.id]: true }),
                    {}
                  );
                  setAttendanceMap(allPresent);
                }}
              >
                Mark All Present
              </Button>
              <Button className="flex-1" onClick={handleMarkAttendance}>
                Submit Attendance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {userRole === "dean" && (
        <Card>
          <CardHeader>
            <CardTitle>Department Statistics</CardTitle>
            <CardDescription>Overall attendance trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Average Attendance</p>
                <p className="text-2xl font-bold">84.5%</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Students Below 75%</p>
                <p className="text-2xl font-bold">145</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Perfect Attendance</p>
                <p className="text-2xl font-bold">320</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
