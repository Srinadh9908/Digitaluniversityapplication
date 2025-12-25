import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Send, MessageCircle, Search } from "lucide-react";
import { User } from "../App";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    participantName: "Dr. Priya Sharma",
    participantRole: "Faculty - CSE",
    lastMessage: "Please submit your assignment by Friday",
    timestamp: "2 hours ago",
    unread: 1,
  },
  {
    id: "2",
    participantName: "Prof. Arun Mehta",
    participantRole: "Dean",
    lastMessage: "Your request has been approved",
    timestamp: "1 day ago",
    unread: 0,
  },
  {
    id: "3",
    participantName: "Rajesh Kumar",
    participantRole: "Student - 20BCE1234",
    lastMessage: "Can you help me with this concept?",
    timestamp: "2 days ago",
    unread: 2,
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      senderId: "STF001",
      senderName: "Dr. Priya Sharma",
      senderRole: "Faculty",
      content: "Hello! How can I help you today?",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      senderId: "STU001",
      senderName: "Rajesh Kumar",
      senderRole: "Student",
      content: "I have a question about the assignment deadline.",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      senderId: "STF001",
      senderName: "Dr. Priya Sharma",
      senderRole: "Faculty",
      content: "Sure! The deadline is Friday, 11:59 PM. You can submit through the portal.",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      senderId: "STU001",
      senderName: "Rajesh Kumar",
      senderRole: "Student",
      content: "Thank you! I will submit it on time.",
      timestamp: "10:36 AM",
    },
    {
      id: "5",
      senderId: "STF001",
      senderName: "Dr. Priya Sharma",
      senderRole: "Faculty",
      content: "Please submit your assignment by Friday",
      timestamp: "2:45 PM",
    },
  ],
  "2": [
    {
      id: "1",
      senderId: "STU001",
      senderName: "Rajesh Kumar",
      senderRole: "Student",
      content: "Dear Sir, I would like to request for an academic leave.",
      timestamp: "Yesterday 3:00 PM",
    },
    {
      id: "2",
      senderId: "DEAN001",
      senderName: "Prof. Arun Mehta",
      senderRole: "Dean",
      content: "Your request has been approved. Please collect the approval letter from the office.",
      timestamp: "Yesterday 5:30 PM",
    },
  ],
  "3": [
    {
      id: "1",
      senderId: "STU002",
      senderName: "Rajesh Kumar",
      senderRole: "Student",
      content: "Hi! Can you help me understand the database normalization concept?",
      timestamp: "2 days ago 11:00 AM",
    },
    {
      id: "2",
      senderId: "STU002",
      senderName: "Rajesh Kumar",
      senderRole: "Student",
      content: "Especially the 3NF part",
      timestamp: "2 days ago 11:01 AM",
    },
  ],
};

interface ChatSystemProps {
  user: User;
}

export default function ChatSystem({ user }: ChatSystemProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const currentMessages = selectedConversation ? mockMessages[selectedConversation] || [] : [];
  const selectedChat = mockConversations.find((c) => c.id === selectedConversation);

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.participantRole.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send to the backend
      setMessage("");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = (role: string) => {
    if (role.includes("Dean")) return "bg-green-600";
    if (role.includes("Faculty") || role.includes("Staff")) return "bg-purple-600";
    return "bg-blue-600";
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Communicate with students, staff, and administrators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
            {/* Conversations List */}
            <div className="lg:col-span-1 border rounded-lg flex flex-col">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2 space-y-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conv.id
                          ? "bg-blue-100 border-2 border-blue-500"
                          : "hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className={getRoleColor(conv.participantRole)}>
                            {getInitials(conv.participantName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-sm truncate">
                              {conv.participantName}
                            </p>
                            {conv.unread > 0 && (
                              <Badge className="bg-red-500 text-xs">{conv.unread}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{conv.participantRole}</p>
                          <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                          <p className="text-xs text-gray-400 mt-1">{conv.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 border rounded-lg flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className={getRoleColor(selectedChat.participantRole)}>
                          {getInitials(selectedChat.participantName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{selectedChat.participantName}</p>
                        <p className="text-xs text-gray-500">{selectedChat.participantRole}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {currentMessages.map((msg) => {
                        const isCurrentUser = msg.senderId === user.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] ${
                                isCurrentUser ? "order-2" : "order-1"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {!isCurrentUser && (
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className={getRoleColor(msg.senderRole)}>
                                      {getInitials(msg.senderName)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                <span className="text-xs font-semibold">{msg.senderName}</span>
                                <span className="text-xs text-gray-500">{msg.timestamp}</span>
                              </div>
                              <div
                                className={`p-3 rounded-lg ${
                                  isCurrentUser
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-900"
                                }`}
                              >
                                <p className="text-sm">{msg.content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConversations.length}</div>
            <p className="text-xs text-gray-500 mt-1">Active chats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockConversations.reduce((sum, conv) => sum + conv.unread, 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Pending responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~2h</div>
            <p className="text-xs text-gray-500 mt-1">Average reply time</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
