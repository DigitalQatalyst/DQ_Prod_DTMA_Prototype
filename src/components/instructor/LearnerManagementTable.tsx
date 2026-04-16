import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Download,
  MessageSquare,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  X,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Learner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  enrolledDate: string;
  courseName: string;
  progress: number;
  status: "active" | "completed" | "inactive";
  whatsappOptIn: boolean;
  lastActive: string;
}

// Mock data - replace with actual API call
const mockLearners: Learner[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1234567890",
    enrolledDate: "2024-01-15",
    courseName: "Digital Transformation Strategy",
    progress: 75,
    status: "active",
    whatsappOptIn: true,
    lastActive: "2024-01-20",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1234567891",
    enrolledDate: "2024-01-10",
    courseName: "Digital Business Platform",
    progress: 100,
    status: "completed",
    whatsappOptIn: true,
    lastActive: "2024-01-19",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    enrolledDate: "2024-01-18",
    courseName: "Digital Transformation Strategy",
    progress: 45,
    status: "active",
    whatsappOptIn: false,
    lastActive: "2024-01-21",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "+1234567892",
    enrolledDate: "2024-01-05",
    courseName: "Digital Accelerators",
    progress: 30,
    status: "inactive",
    whatsappOptIn: true,
    lastActive: "2024-01-12",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1234567893",
    enrolledDate: "2024-01-20",
    courseName: "Digital Workers",
    progress: 60,
    status: "active",
    whatsappOptIn: true,
    lastActive: "2024-01-21",
  },
];

type SortField = "name" | "enrolledDate" | "progress" | "lastActive";
type SortDirection = "asc" | "desc";

export const LearnerManagementTable = () => {
  const { toast } = useToast();
  const [learners] = useState<Learner[]>(mockLearners);
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [whatsappFilter, setWhatsappFilter] = useState<"all" | "opted-in" | "not-opted-in">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed" | "inactive">("all");
  const [sortField, setSortField] = useState<SortField>("enrolledDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedLearners, setSelectedLearners] = useState<Set<string>>(new Set());
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  // Get unique courses from learners
  const uniqueCourses = useMemo(() => {
    const courses = Array.from(new Set(learners.map(l => l.courseName)));
    return courses.sort();
  }, [learners]);

  // Filter and sort learners
  const filteredAndSortedLearners = useMemo(() => {
    let filtered = learners.filter((learner) => {
      // Search filter
      const matchesSearch =
        learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        learner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        learner.courseName.toLowerCase().includes(searchQuery.toLowerCase());

      // Course filter
      const matchesCourse = courseFilter === "all" || learner.courseName === courseFilter;

      // WhatsApp filter
      const matchesWhatsApp =
        whatsappFilter === "all" ||
        (whatsappFilter === "opted-in" && learner.whatsappOptIn) ||
        (whatsappFilter === "not-opted-in" && !learner.whatsappOptIn);

      // Status filter
      const matchesStatus = statusFilter === "all" || learner.status === statusFilter;

      return matchesSearch && matchesCourse && matchesWhatsApp && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "enrolledDate" || sortField === "lastActive") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [learners, searchQuery, courseFilter, whatsappFilter, statusFilter, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

  const toggleLearnerSelection = (learnerId: string) => {
    const newSelection = new Set(selectedLearners);
    if (newSelection.has(learnerId)) {
      newSelection.delete(learnerId);
    } else {
      newSelection.add(learnerId);
    }
    setSelectedLearners(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedLearners.size === filteredAndSortedLearners.length) {
      setSelectedLearners(new Set());
    } else {
      setSelectedLearners(new Set(filteredAndSortedLearners.map((l) => l.id)));
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Course",
      "Enrolled Date",
      "Progress",
      "Status",
      "WhatsApp Opt-In",
      "Last Active",
    ];

    const rows = filteredAndSortedLearners.map((learner) => [
      learner.name,
      learner.email,
      learner.phone || "N/A",
      learner.courseName,
      learner.enrolledDate,
      `${learner.progress}%`,
      learner.status,
      learner.whatsappOptIn ? "Yes" : "No",
      learner.lastActive,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `learners_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: `Exported ${filteredAndSortedLearners.length} learners to CSV`,
    });
  };

  const sendWhatsAppMessage = () => {
    const selectedLearnersData = learners.filter(
      (l) => selectedLearners.has(l.id) && l.whatsappOptIn
    );

    if (selectedLearnersData.length === 0) {
      toast({
        title: "No recipients",
        description: "Please select learners who have opted in to WhatsApp",
        variant: "destructive",
      });
      return;
    }

    if (!messageContent.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message to send",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending message
    toast({
      title: "Messages sent!",
      description: `WhatsApp message sent to ${selectedLearnersData.length} learner(s)`,
    });

    setIsMessageModalOpen(false);
    setMessageContent("");
    setSelectedLearners(new Set());
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-700",
      completed: "bg-blue-100 text-blue-700",
      inactive: "bg-gray-100 text-gray-700",
    };
    return (
      <Badge className={variants[status as keyof typeof variants] || ""}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const selectedOptedInCount = Array.from(selectedLearners).filter(
    (id) => learners.find((l) => l.id === id)?.whatsappOptIn
  ).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-[24px] leading-[32px] font-semibold text-[#1e2348]">
            {learners.length}
          </div>
          <div className="text-[13px] leading-[18px] font-normal text-muted-foreground">
            Total Learners
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-[24px] leading-[32px] font-semibold text-[#1e2348]">
            {learners.filter((l) => l.whatsappOptIn).length}
          </div>
          <div className="text-[13px] leading-[18px] font-normal text-muted-foreground">
            WhatsApp Opted In
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-[24px] leading-[32px] font-semibold text-[#1e2348]">
            {learners.filter((l) => l.status === "active").length}
          </div>
          <div className="text-[13px] leading-[18px] font-normal text-muted-foreground">
            Active Learners
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="text-[24px] leading-[32px] font-semibold text-[#1e2348]">
            {learners.filter((l) => l.status === "completed").length}
          </div>
          <div className="text-[13px] leading-[18px] font-normal text-muted-foreground">
            Completed
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Course Filter */}
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-full lg:w-[250px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {uniqueCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* WhatsApp Filter */}
          <Select value={whatsappFilter} onValueChange={(v: any) => setWhatsappFilter(v)}>
            <SelectTrigger className="w-full lg:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Learners</SelectItem>
              <SelectItem value="opted-in">WhatsApp Opted In</SelectItem>
              <SelectItem value="not-opted-in">Not Opted In</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* Export Button */}
          <Button
            variant="outline"
            onClick={exportToCSV}
            className="border-[#1e2348] text-[#1e2348] hover:bg-[#1e2348]/5"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || courseFilter !== "all" || whatsappFilter !== "all" || statusFilter !== "all") && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {searchQuery && (
              <Badge variant="secondary" className="gap-1">
                Search: {searchQuery}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setSearchQuery("")}
                />
              </Badge>
            )}
            {courseFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Course: {courseFilter}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setCourseFilter("all")}
                />
              </Badge>
            )}
            {whatsappFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                WhatsApp: {whatsappFilter === "opted-in" ? "Opted In" : "Not Opted In"}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setWhatsappFilter("all")}
                />
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Status: {statusFilter}
                <X
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setStatusFilter("all")}
                />
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Selection Actions */}
      {selectedLearners.size > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#1e2348]">
              {selectedLearners.size} learner(s) selected
            </span>
            {selectedOptedInCount > 0 && (
              <span className="text-sm text-muted-foreground">
                ({selectedOptedInCount} opted in to WhatsApp)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedLearners(new Set())}
              className="hover:bg-[#ff6b4d] hover:text-white hover:border-[#ff6b4d]"
            >
              Clear Selection
            </Button>
            <Button
              size="sm"
              onClick={() => setIsMessageModalOpen(true)}
              disabled={selectedOptedInCount === 0}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send WhatsApp Message
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedLearners.size === filteredAndSortedLearners.length &&
                      filteredAndSortedLearners.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                </th>
                <th
                  className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#1e2348] cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {getSortIcon("name")}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#1e2348]">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#1e2348]">
                  Course
                </th>
                <th
                  className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#1e2348] cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("enrolledDate")}
                >
                  <div className="flex items-center">
                    Enrolled
                    {getSortIcon("enrolledDate")}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#1e2348] cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("progress")}
                >
                  <div className="flex items-center">
                    Progress
                    {getSortIcon("progress")}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#1e2348]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#1e2348]">
                  WhatsApp
                </th>
                <th
                  className="px-4 py-3 text-left text-[12px] leading-[16px] font-medium text-[#1e2348] cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("lastActive")}
                >
                  <div className="flex items-center">
                    Last Active
                    {getSortIcon("lastActive")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAndSortedLearners.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center">
                    <div className="text-muted-foreground">
                      <p className="text-[14px] leading-[20px] font-medium mb-1">
                        No learners found
                      </p>
                      <p className="text-[12px] leading-[16px]">
                        Try adjusting your filters or search query
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedLearners.map((learner) => (
                  <tr
                    key={learner.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedLearners.has(learner.id)}
                        onChange={() => toggleLearnerSelection(learner.id)}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[14px] leading-[20px] font-medium text-[#1e2348]">
                        {learner.name}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] leading-[18px] text-muted-foreground">
                        {learner.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] leading-[18px] text-muted-foreground max-w-[200px] truncate">
                        {learner.courseName}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] leading-[18px] text-muted-foreground">
                        {new Date(learner.enrolledDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                          <div
                            className="bg-[#ff6b4d] h-2 rounded-full"
                            style={{ width: `${learner.progress}%` }}
                          />
                        </div>
                        <span className="text-[12px] leading-[16px] text-muted-foreground">
                          {learner.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(learner.status)}</td>
                    <td className="px-4 py-3">
                      {learner.whatsappOptIn ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-[12px] leading-[16px] font-medium">
                            Opted In
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <XCircle className="w-4 h-4" />
                          <span className="text-[12px] leading-[16px]">Not Opted In</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[13px] leading-[18px] text-muted-foreground">
                        {new Date(learner.lastActive).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-[13px] leading-[18px] text-muted-foreground text-center">
        Showing {filteredAndSortedLearners.length} of {learners.length} learners
      </div>

      {/* WhatsApp Message Modal */}
      <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[24px] leading-[32px] font-medium text-[#1e2348]">
              Send WhatsApp Message
            </DialogTitle>
            <DialogDescription className="text-[14px] leading-[20px] font-normal">
              Send a message to {selectedOptedInCount} learner(s) who have opted in to
              WhatsApp
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-[12px] leading-[16px] font-medium mb-2 text-[#1e2348]">
                Message
              </label>
              <Textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Enter your message here..."
                rows={6}
                maxLength={1000}
                className="resize-none"
              />
              <p className="text-[12px] leading-[16px] text-muted-foreground mt-1">
                {messageContent.length}/1000 characters
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setIsMessageModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={sendWhatsAppMessage}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
