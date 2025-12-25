import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Calendar, User, Bell, Plus, Pin } from "lucide-react";
import { toast } from "sonner";

interface Circular {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  category: "Academic" | "Administrative" | "Event" | "Emergency";
  isPinned: boolean;
  attachments?: string[];
}

const mockCirculars: Circular[] = [
  {
    id: "1",
    title: "FFCS Registration Window Open",
    content:
      "The Fully Flexible Credit System (FFCS) registration window for Winter 2025 semester is now open. Students are required to register for their courses before January 15, 2025. Please ensure you meet the prerequisites before registering.",
    author: "Prof. Arun Mehta",
    authorRole: "Dean",
    date: "2024-12-20",
    category: "Academic",
    isPinned: true,
  },
  {
    id: "2",
    title: "Mid-term Examination Schedule",
    content:
      "The mid-term examinations are scheduled to begin from January 20, 2025. Students are advised to check their individual exam schedules in the Exams section. Hall tickets will be available for download from January 15, 2025.",
    author: "Dr. Priya Sharma",
    authorRole: "Examination Controller",
    date: "2024-12-18",
    category: "Academic",
    isPinned: true,
  },
  {
    id: "3",
    title: "Annual Tech Fest 2025",
    content:
      "The annual technical festival 'TechnoVIT 2025' will be held on February 10-12, 2025. Students are encouraged to participate in various technical events, workshops, and competitions. Registration opens on January 5, 2025.",
    author: "Student Council",
    authorRole: "Event Organizers",
    date: "2024-12-15",
    category: "Event",
    isPinned: false,
  },
  {
    id: "4",
    title: "Library Timings Update",
    content:
      "The central library will remain open 24/7 starting from January 10, 2025 to support students during the examination period. Additional study spaces have been arranged in the MB building.",
    author: "Library Administration",
    authorRole: "Administration",
    date: "2024-12-12",
    category: "Administrative",
    isPinned: false,
  },
  {
    id: "5",
    title: "Guest Lecture: AI in Healthcare",
    content:
      "Dr. Sarah Johnson from MIT will be delivering a guest lecture on 'Applications of Artificial Intelligence in Healthcare' on January 8, 2025 at 3:00 PM in the Main Auditorium. All students and faculty are invited to attend.",
    author: "Dr. Vikram Singh",
    authorRole: "Department Head",
    date: "2024-12-10",
    category: "Event",
    isPinned: false,
  },
];

interface CircularsProps {
  userRole: "student" | "staff" | "dean";
}

export default function Circulars({ userRole }: CircularsProps) {
  const [showAddCircular, setShowAddCircular] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filteredCirculars = mockCirculars.filter(
    (circular) => filterCategory === "all" || circular.category === filterCategory
  );

  const pinnedCirculars = filteredCirculars.filter((c) => c.isPinned);
  const regularCirculars = filteredCirculars.filter((c) => !c.isPinned);

  const handlePostCircular = () => {
    toast.success("Circular posted successfully!");
    setShowAddCircular(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-500";
      case "Administrative":
        return "bg-purple-500";
      case "Event":
        return "bg-green-500";
      case "Emergency":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Circulars & Announcements</CardTitle>
              <CardDescription>Important updates and notifications</CardDescription>
            </div>
            {(userRole === "staff" || userRole === "dean") && (
              <Button onClick={() => setShowAddCircular(!showAddCircular)}>
                <Plus className="w-4 h-4 mr-2" />
                Post Circular
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button
              variant={filterCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("all")}
            >
              All
            </Button>
            <Button
              variant={filterCategory === "Academic" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("Academic")}
            >
              Academic
            </Button>
            <Button
              variant={filterCategory === "Event" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("Event")}
            >
              Events
            </Button>
            <Button
              variant={filterCategory === "Administrative" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory("Administrative")}
            >
              Administrative
            </Button>
          </div>

          {(userRole === "staff" || userRole === "dean") && showAddCircular && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">Create New Circular</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Title</label>
                  <Input placeholder="Enter circular title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Category</label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Academic
                    </Button>
                    <Button variant="outline" size="sm">
                      Administrative
                    </Button>
                    <Button variant="outline" size="sm">
                      Event
                    </Button>
                    <Button variant="outline" size="sm">
                      Emergency
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Content</label>
                  <Textarea placeholder="Enter circular content..." rows={5} />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="pin" className="rounded" />
                  <label htmlFor="pin" className="text-sm">
                    Pin this circular to top
                  </label>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowAddCircular(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePostCircular}>
                    <Bell className="w-4 h-4 mr-2" />
                    Post Circular
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {pinnedCirculars.length > 0 && (
              <>
                <h3 className="font-semibold flex items-center gap-2">
                  <Pin className="w-4 h-4" />
                  Pinned Announcements
                </h3>
                {pinnedCirculars.map((circular) => (
                  <div
                    key={circular.id}
                    className="p-4 border-2 border-yellow-300 bg-yellow-50 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Pin className="w-4 h-4 text-yellow-600" />
                          <h3 className="font-semibold">{circular.title}</h3>
                          <Badge className={getCategoryColor(circular.category)}>
                            {circular.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{circular.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 border-t pt-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>
                            {circular.author} ({circular.authorRole})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{circular.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {regularCirculars.length > 0 && (
              <>
                {pinnedCirculars.length > 0 && <h3 className="font-semibold mt-6">All Circulars</h3>}
                {regularCirculars.map((circular) => (
                  <div key={circular.id} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{circular.title}</h3>
                          <Badge className={getCategoryColor(circular.category)}>
                            {circular.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{circular.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 border-t pt-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>
                            {circular.author} ({circular.authorRole})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{circular.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {filteredCirculars.length === 0 && (
              <p className="text-center text-gray-500 py-8">No circulars found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
