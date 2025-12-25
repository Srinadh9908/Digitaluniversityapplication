import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, MapPin, User } from "lucide-react";

interface TimeSlot {
  time: string;
  courses: {
    day: string;
    courseCode: string;
    courseName: string;
    faculty: string;
    venue: string;
    type: "Theory" | "Lab" | "Tutorial";
  }[];
}

const mockTimetable: TimeSlot[] = [
  {
    time: "08:00 - 08:50",
    courses: [
      {
        day: "Monday",
        courseCode: "CSE3001",
        courseName: "Data Structures",
        faculty: "Dr. Priya Sharma",
        venue: "MB-301",
        type: "Theory",
      },
      {
        day: "Wednesday",
        courseCode: "CSE3002",
        courseName: "Algorithms",
        faculty: "Prof. Rajesh Kumar",
        venue: "MB-302",
        type: "Theory",
      },
    ],
  },
  {
    time: "09:00 - 09:50",
    courses: [
      {
        day: "Tuesday",
        courseCode: "CSE4001",
        courseName: "Database Systems",
        faculty: "Dr. Anjali Menon",
        venue: "MB-303",
        type: "Theory",
      },
      {
        day: "Thursday",
        courseCode: "CSE4002",
        courseName: "Machine Learning",
        faculty: "Dr. Vikram Singh",
        venue: "SJT-401",
        type: "Theory",
      },
    ],
  },
  {
    time: "10:00 - 10:50",
    courses: [
      {
        day: "Monday",
        courseCode: "CSE3001",
        courseName: "Data Structures",
        faculty: "Dr. Priya Sharma",
        venue: "MB-301",
        type: "Tutorial",
      },
      {
        day: "Friday",
        courseCode: "CSE3002",
        courseName: "Algorithms",
        faculty: "Prof. Rajesh Kumar",
        venue: "MB-302",
        type: "Theory",
      },
    ],
  },
  {
    time: "11:00 - 11:50",
    courses: [],
  },
  {
    time: "12:00 - 12:50",
    courses: [
      {
        day: "Wednesday",
        courseCode: "CSE4001",
        courseName: "Database Systems",
        faculty: "Dr. Anjali Menon",
        venue: "CDMM-Lab1",
        type: "Lab",
      },
    ],
  },
  {
    time: "14:00 - 14:50",
    courses: [
      {
        day: "Tuesday",
        courseCode: "CSE4002",
        courseName: "Machine Learning",
        faculty: "Dr. Vikram Singh",
        venue: "SJT-Lab2",
        type: "Lab",
      },
      {
        day: "Thursday",
        courseCode: "CSE3001",
        courseName: "Data Structures",
        faculty: "Dr. Priya Sharma",
        venue: "CDMM-Lab1",
        type: "Lab",
      },
    ],
  },
  {
    time: "15:00 - 15:50",
    courses: [
      {
        day: "Friday",
        courseCode: "CSE4001",
        courseName: "Database Systems",
        faculty: "Dr. Anjali Menon",
        venue: "MB-303",
        type: "Tutorial",
      },
    ],
  },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

interface TimetableProps {
  userRole: "student" | "staff" | "dean";
}

export default function Timetable({ userRole }: TimetableProps) {
  const getClassForDay = (timeSlot: TimeSlot, day: string) => {
    return timeSlot.courses.find((course) => course.day === day);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Weekly Timetable</CardTitle>
          <CardDescription>Your class schedule for Winter 2025 semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header */}
              <div className="grid grid-cols-6 gap-2 mb-2">
                <div className="p-3 bg-gray-100 rounded-lg font-semibold text-center">Time</div>
                {days.map((day) => (
                  <div key={day} className="p-3 bg-gray-100 rounded-lg font-semibold text-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Timetable rows */}
              {mockTimetable.map((slot, index) => (
                <div key={index} className="grid grid-cols-6 gap-2 mb-2">
                  <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-center text-sm font-semibold">
                    {slot.time}
                  </div>
                  {days.map((day) => {
                    const classInfo = getClassForDay(slot, day);
                    return (
                      <div
                        key={day}
                        className={`p-3 rounded-lg min-h-[100px] ${
                          classInfo
                            ? classInfo.type === "Lab"
                              ? "bg-purple-50 border-2 border-purple-200"
                              : classInfo.type === "Tutorial"
                              ? "bg-green-50 border-2 border-green-200"
                              : "bg-blue-50 border-2 border-blue-200"
                            : "bg-gray-50 border-2 border-gray-200"
                        }`}
                      >
                        {classInfo ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Badge
                                variant="outline"
                                className={
                                  classInfo.type === "Lab"
                                    ? "bg-purple-500 text-white"
                                    : classInfo.type === "Tutorial"
                                    ? "bg-green-500 text-white"
                                    : "bg-blue-500 text-white"
                                }
                              >
                                {classInfo.type}
                              </Badge>
                            </div>
                            <p className="font-semibold text-sm">{classInfo.courseCode}</p>
                            <p className="text-xs text-gray-600 line-clamp-1">
                              {classInfo.courseName}
                            </p>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                              <User className="w-3 h-3" />
                              <span className="line-clamp-1">{classInfo.faculty}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span>{classInfo.venue}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-xs text-gray-400">
                            Free
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Classes Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500 mt-1">2 Theory, 1 Lab, 1 Tutorial</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Next Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">CSE3001</div>
            <p className="text-xs text-gray-500 mt-1">Data Structures at 08:00 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Free Slots Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-500 mt-1">11:00 AM, 01:00 PM</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Theory Class</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm">Lab Session</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Tutorial</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
