import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CreditCard, CheckCircle, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { User } from "../App";

interface FeeItem {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
}

const mockFees: FeeItem[] = [
  {
    id: "1",
    description: "Tuition Fee - Semester 5",
    amount: 150000,
    dueDate: "2024-12-20",
    status: "paid",
  },
  {
    id: "2",
    description: "Library Fee",
    amount: 2000,
    dueDate: "2024-12-20",
    status: "paid",
  },
  {
    id: "3",
    description: "Lab Fee",
    amount: 5000,
    dueDate: "2024-12-20",
    status: "paid",
  },
  {
    id: "4",
    description: "Hostel Fee - Semester 5",
    amount: 45000,
    dueDate: "2025-01-10",
    status: "pending",
  },
];

interface FeesPaymentProps {
  user: User;
}

export default function FeesPayment({ user }: FeesPaymentProps) {
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [showPayment, setShowPayment] = useState(false);

  const pendingFees = mockFees.filter((fee) => fee.status === "pending");
  const totalPending = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);
  const selectedTotal = mockFees
    .filter((fee) => selectedFees.includes(fee.id))
    .reduce((sum, fee) => sum + fee.amount, 0);

  const handleToggleFee = (feeId: string) => {
    if (selectedFees.includes(feeId)) {
      setSelectedFees(selectedFees.filter((id) => id !== feeId));
    } else {
      setSelectedFees([...selectedFees, feeId]);
    }
  };

  const handlePayment = () => {
    if (selectedFees.length === 0) {
      toast.error("Please select at least one fee item");
      return;
    }
    toast.success("Payment processed successfully!");
    setSelectedFees([]);
    setShowPayment(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">{pendingFees.length} items pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Paid This Semester</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹157,000</div>
            <p className="text-xs text-green-600 mt-1">All cleared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Next Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jan 10</div>
            <p className="text-xs text-gray-500 mt-1">Hostel fee due</p>
          </CardContent>
        </Card>
      </div>

      {!showPayment ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Fee Details</CardTitle>
              <CardDescription>View and manage your fee payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockFees.map((fee) => (
                <div
                  key={fee.id}
                  className={`p-4 border rounded-lg ${
                    fee.status === "pending" ? "border-yellow-300 bg-yellow-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{fee.description}</h3>
                        {fee.status === "paid" && (
                          <Badge className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Paid
                          </Badge>
                        )}
                        {fee.status === "pending" && (
                          <Badge className="bg-yellow-500">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">Due Date: {fee.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">₹{fee.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  {fee.status === "pending" && (
                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant={selectedFees.includes(fee.id) ? "default" : "outline"}
                        onClick={() => handleToggleFee(fee.id)}
                      >
                        {selectedFees.includes(fee.id) ? "Selected" : "Select for Payment"}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {selectedFees.length > 0 && (
            <Card className="border-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Selected Amount</p>
                    <p className="text-2xl font-bold">₹{selectedTotal.toLocaleString()}</p>
                  </div>
                  <Button size="lg" onClick={() => setShowPayment(true)}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Proceed to Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
            <CardDescription>Complete your payment securely</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-3xl font-bold">₹{selectedTotal.toLocaleString()}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Payment Method</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="netbanking">Net Banking</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="wallet">Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === "card" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Card Number</label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Expiry Date</label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">CVV</label>
                    <Input placeholder="123" type="password" maxLength={3} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Cardholder Name</label>
                  <Input placeholder="Name on card" />
                </div>
              </>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">UPI ID</label>
                <Input placeholder="yourname@upi" />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setShowPayment(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handlePayment}>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay ₹{selectedTotal.toLocaleString()}
              </Button>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg text-xs text-gray-600 text-center">
              🔒 Your payment is secured with 256-bit SSL encryption
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
