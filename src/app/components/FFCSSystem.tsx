import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Search, Filter, Plus, Trash2, BookOpen, Clock, Users } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  faculty: string;
  slot: string;
  venue: string;
  enrolled: number;
  capacity: number;
  category: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    code: "CSE3001",
    name: "Data Structures and Algorithms",
    credits: 4,
    faculty: "Dr. Priya Sharma",
    slot: "A1+TA1",
    venue: "MB-301",
    enrolled: 58,
    capacity: 60,
    category: "Core",
  },
  {
    id: "2",
    code: "CSE3002",
    name: "Database Management Systems",
    credits: 3,
    faculty: "Prof. Rajesh Kumar",
    slot: "B1+TB1",
    venue: "MB-302",
    enrolled: 55,
    capacity: 60,
    category: "Core",
  },
  {
    id: "3",
    code: "CSE3003",
    name: "Operating Systems",
    credits: 4,
    faculty: "Dr. Anjali Menon",
    slot: "C1+TC1",
    venue: "MB-303",
    enrolled: 52,
    capacity: 60,
    category: "Core",
  },
  {
    id: "4",
    code: "CSE4001",
    name: "Machine Learning",
    credits: 3,
    faculty: "Dr. Vikram Singh",
    slot: "D1+TD1",
    venue: "SJT-401",
    enrolled: 45,
    capacity: 50,
    category: "Elective",
  },
  {
    id: "5",
    code: "CSE4002",
    name: "Cloud Computing",
    credits: 3,
    faculty: "Prof. Meera Nair",
    slot: "E1+TE1",
    venue: "SJT-402",
    enrolled: 42,
    capacity: 50,
    category: "Elective",
  },
  {
    id: "6",
    code: "CSE4003",
    name: "Cyber Security",
    credits: 3,
    faculty: "Dr. Arjun Patel",
    slot: "F1+TF1",
    venue: "SJT-403",
    enrolled: 38,
    capacity: 50,
    category: "Elective",
  },
];

interface FFCSSystemProps {
  userRole: "student" | "staff" | "dean";
}

export default function FFCSSystem({ userRole }: FFCSSystemProps) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const totalCredits = selectedCourses.reduce((sum, course) => sum + course.credits, 0);

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddCourse = (course: Course) => {
    if (selectedCourses.find((c) => c.id === course.id)) {
      toast.error("Course already added!");
      return;
    }

    if (totalCredits + course.credits > 27) {
      toast.error("Maximum 27 credits allowed!");
      return;
    }

    // Check for slot clash
    const hasClash = selectedCourses.some((c) => c.slot === course.slot);
    if (hasClash) {
      toast.error("Slot clash detected!");
      return;
    }

    setSelectedCourses([...selectedCourses, course]);
    toast.success(`${course.code} added successfully!`);
  };

  const handleRemoveCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter((c) => c.id !== courseId));
    toast.success("Course removed");
  };

  const handleSubmitRegistration = () => {
    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course");
      return;
    }

    toast.success("Registration submitted successfully!");
  };

  if (userRole === "dean") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>FFCS System Control</CardTitle>
          <CardDescription>Manage FFCS registration windows and course offerings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Registration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm">FFCS Window</span>
                  <Badge className="bg-green-500">Open</Badge>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    Close Window
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Students Registered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,845</div>
                <p className="text-xs text-gray-500 mt-1">75.3% of total students</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-gray-500 mt-1">Available this semester</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockCourses.slice(0, 5).map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-semibold">
                        {course.code} - {course.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Faculty: {course.faculty} | Slot: {course.slot}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {course.enrolled}/{course.capacity}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round((course.enrolled / course.capacity) * 100)}% full
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>FFCS - Fully Flexible Credit System</CardTitle>
          <CardDescription>Register for courses for Winter 2025 semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <p className="font-semibold">Registration Window: Open</p>
              <p className="text-sm text-gray-600">Closes on: January 15, 2025</p>
            </div>
            <Badge className="bg-green-500">Active</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Available Courses</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={filterCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterCategory === "Core" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory("Core")}
                  >
                    Core
                  </Button>
                  <Button
                    variant={filterCategory === "Elective" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory("Elective")}
                  >
                    Elective
                  </Button>
                </div>
              </div>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search courses by code or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredCourses.map((course) => (
                <div key={course.id} className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{course.code}</h3>
                        <Badge variant="outline">{course.category}</Badge>
                        <Badge variant="secondary">{course.credits} Credits</Badge>
                      </div>
                      <p className="text-sm mb-2">{course.name}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAddCourse(course)}
                      disabled={selectedCourses.some((c) => c.id === course.id)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{course.faculty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Slot: {course.slot}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      <span>Venue: {course.venue}</span>
                    </div>
                    <div>
                      <span>
                        {course.enrolled}/{course.capacity} enrolled
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Selected Courses</CardTitle>
              <CardDescription>Total Credits: {totalCredits}/27</CardDescription>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(totalCredits / 27) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedCourses.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">No courses selected</p>
              ) : (
                <>
                  {selectedCourses.map((course) => (
                    <div key={course.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-semibold text-sm">{course.code}</p>
                          <p className="text-xs text-gray-600">{course.name}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveCourse(course.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                        <span>{course.slot}</span>
                        <span>{course.credits} Credits</span>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full" onClick={handleSubmitRegistration}>
                    Submit Registration
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}