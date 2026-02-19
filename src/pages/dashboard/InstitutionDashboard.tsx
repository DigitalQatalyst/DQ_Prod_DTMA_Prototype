import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/hooks/use-toast";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen,
  Users,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  DollarSign,
  Star,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Building2,
  UserPlus,
  GraduationCap,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const InstitutionDashboard = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [instructorSearch, setInstructorSearch] = useState("");
  const [instructorStatusFilter, setInstructorStatusFilter] = useState("all");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showInstructorDetail, setShowInstructorDetail] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseStatusFilter, setCourseStatusFilter] = useState("all");
  const [courseInstructorFilter, setCourseInstructorFilter] = useState("all");
  const [showCourseDetail, setShowCourseDetail] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);
  const [showEditPermissionsModal, setShowEditPermissionsModal] = useState(false);
  const [showSuspendConfirmation, setShowSuspendConfirmation] = useState(false);
  const [editingPermissions, setEditingPermissions] = useState({
    canCreateCourses: true,
    canIssueCertificates: true,
    requiresCourseReview: false,
    revenueSplit: 70,
  });
  const [inviteForm, setInviteForm] = useState({
    fullName: "",
    email: "",
    role: "instructor",
  });
  const [inviteErrors, setInviteErrors] = useState<Record<string, string>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "",
    level: "",
    description: "",
    price: "",
  });
  const [courseErrors, setCourseErrors] = useState<Record<string, string>>({});

  // Mock instructor data
  const mockInstructors = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      joinedDate: "Jan 15, 2024",
      status: "active",
      courses: 8,
      students: 342,
      revenue: 12450,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "m.chen@example.com",
      joinedDate: "Feb 3, 2024",
      status: "active",
      courses: 5,
      students: 198,
      revenue: 8920,
      rating: 4.6,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      joinedDate: "Mar 12, 2024",
      status: "pending",
      courses: 0,
      students: 0,
      revenue: 0,
      rating: 0,
    },
  ];

  // Filter instructors based on search and status
  const filteredInstructors = mockInstructors.filter((instructor) => {
    // Search filter
    const searchLower = instructorSearch.toLowerCase();
    const matchesSearch =
      instructorSearch === "" ||
      instructor.name.toLowerCase().includes(searchLower) ||
      instructor.email.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus =
      instructorStatusFilter === "all" ||
      instructor.status === instructorStatusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredInstructors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedInstructors = filteredInstructors.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setInstructorSearch(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setInstructorStatusFilter(value);
    setCurrentPage(1);
  };

  // Export instructors to CSV
  const handleExportInstructors = () => {
    // Create CSV content
    const headers = ["Name", "Email", "Status", "Courses", "Students", "Revenue", "Rating", "Joined Date"];
    const rows = filteredInstructors.map((instructor) => [
      instructor.name,
      instructor.email,
      instructor.status,
      instructor.courses,
      instructor.students,
      `$${instructor.revenue}`,
      instructor.rating,
      instructor.joinedDate,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `instructors_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export successful",
      description: `Exported ${filteredInstructors.length} instructor(s) to CSV`,
    });
  };

  // Mock courses data
  const mockCourses = [
    {
      id: "1",
      title: "Advanced Makeup Techniques",
      category: "Makeup Artistry",
      createdDate: "Jan 20, 2024",
      instructor: "Sarah Johnson",
      instructorId: "1",
      status: "published",
      students: 156,
      completion: 78,
      revenue: 4680,
      certificates: 122,
      rating: 4.8,
    },
    {
      id: "2",
      title: "Hair Styling Fundamentals",
      category: "Hair Styling",
      createdDate: "Feb 5, 2024",
      instructor: "Michael Chen",
      instructorId: "2",
      status: "published",
      students: 98,
      completion: 65,
      revenue: 2940,
      certificates: 64,
      rating: 4.6,
    },
    {
      id: "3",
      title: "Nail Art Mastery",
      category: "Nail Technology",
      createdDate: "Mar 1, 2024",
      instructor: "Sarah Johnson",
      instructorId: "1",
      status: "pending",
      students: 0,
      completion: 0,
      revenue: 0,
      certificates: 0,
      rating: 0,
    },
    {
      id: "4",
      title: "Skincare Essentials",
      category: "Skincare",
      createdDate: "Mar 10, 2024",
      instructor: "Emily Rodriguez",
      instructorId: "3",
      status: "draft",
      students: 0,
      completion: 0,
      revenue: 0,
      certificates: 0,
      rating: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#F5F1ED] text-gray-600 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/log.svg"
                alt="BROWZ Academy"
                className="h-[28px] w-auto"
              />
            </Link>
          </div>

          <RoleSwitcher currentRole="instructor" />

          <nav className="flex-1 p-4 space-y-2">
            <button 
              onClick={() => { setActiveTab("overview"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "overview" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => { setActiveTab("instructors"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "instructors" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <UserPlus className="w-5 h-5" />
              <span>Instructors</span>
            </button>
            <button 
              onClick={() => { setActiveTab("courses"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "courses" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <BookOpen className="w-5 h-5" />
              <span>Courses</span>
            </button>
            <button 
              onClick={() => { setActiveTab("programs"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "programs" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <GraduationCap className="w-5 h-5" />
              <span>Programs</span>
            </button>
            <button 
              onClick={() => { setActiveTab("learners"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "learners" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <Users className="w-5 h-5" />
              <span>Students</span>
            </button>
            <button 
              onClick={() => { setActiveTab("earnings"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "earnings" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Revenue</span>
            </button>
            <button 
              onClick={() => { setActiveTab("verification"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "verification" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verification</span>
            </button>
            <button 
              onClick={() => { setActiveTab("reviews"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "reviews" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <Star className="w-5 h-5" />
              <span>Reviews</span>
            </button>
            <button 
              onClick={() => { setActiveTab("settings"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "settings" ? "bg-[#4A3428] text-white" : "text-gray-500 hover:bg-gray-200"}`}
            >
              <Settings className="w-5 h-5" />
              <span>Institution Settings</span>
            </button>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="w-10 h-10 rounded-full bg-[#4A3428] flex items-center justify-center text-sm font-semibold text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate text-gray-800">{profile?.full_name || 'Institution'}</div>
                <div className="text-xs text-gray-500">Institution</div>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-500 hover:text-gray-800 hover:bg-gray-200"
              onClick={signOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-40 bg-background border-b border-border p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-accent rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold">Institution Dashboard</span>
          <div className="w-10" />
        </header>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <button className="absolute top-4 right-4 p-2 bg-background rounded-full" onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        <main className="p-6 lg:p-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-semibold mb-2">Welcome, {profile?.full_name}!</h1>
                <p className="text-muted-foreground">Institution Dashboard Overview</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Instructors</span>
                    <UserPlus className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground mt-1">+2 this month</p>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Active Courses</span>
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">45</p>
                  <p className="text-xs text-muted-foreground mt-1">8 pending review</p>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Students</span>
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">1,234</p>
                  <p className="text-xs text-muted-foreground mt-1">+156 this month</p>
                </div>

                <div className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">$45,678</p>
                  <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <UserPlus className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Invite Instructor</p>
                      <p className="text-xs text-muted-foreground">Add new teaching staff</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <GraduationCap className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Create Program</p>
                      <p className="text-xs text-muted-foreground">Bundle courses together</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <Settings className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Institution Settings</p>
                      <p className="text-xs text-muted-foreground">Configure branding</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Instructors Tab */}
          {activeTab === "instructors" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Instructors</h1>
                  <p className="text-muted-foreground">Manage your teaching staff</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleExportInstructors}>
                    Export
                  </Button>
                  <Button onClick={() => setShowInviteModal(true)}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite Instructor
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or email..."
                    value={instructorSearch}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="max-w-md"
                  />
                </div>
                <Select value={instructorStatusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results Counter */}
              {(instructorSearch || instructorStatusFilter !== "all") && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Showing {filteredInstructors.length} of {mockInstructors.length} instructor(s)
                  </span>
                  {(instructorSearch || instructorStatusFilter !== "all") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setInstructorSearch("");
                        setInstructorStatusFilter("all");
                      }}
                    >
                      Clear filters
                    </Button>
                  )}
                </div>
              )}

              {/* Instructors Table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                {filteredInstructors.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No instructors found</h3>
                    <p className="text-muted-foreground mb-4">
                      {instructorSearch || instructorStatusFilter !== "all"
                        ? "Try adjusting your search or filters"
                        : "Get started by inviting your first instructor"}
                    </p>
                    {instructorSearch || instructorStatusFilter !== "all" ? (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setInstructorSearch("");
                          setInstructorStatusFilter("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    ) : (
                      <Button onClick={() => setShowInviteModal(true)}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Invite Instructor
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b border-border">
                        <tr>
                          <th className="text-left py-4 px-6 font-semibold text-sm">Instructor</th>
                          <th className="text-left py-4 px-6 font-semibold text-sm">Status</th>
                          <th className="text-left py-4 px-6 font-semibold text-sm">Courses</th>
                          <th className="text-left py-4 px-6 font-semibold text-sm">Students</th>
                          <th className="text-left py-4 px-6 font-semibold text-sm">Revenue</th>
                          <th className="text-left py-4 px-6 font-semibold text-sm">Rating</th>
                          <th className="text-left py-4 px-6 font-semibold text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedInstructors.map((instructor) => (
                          <tr key={instructor.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-6">
                              <button
                                onClick={() => {
                                  setSelectedInstructor(instructor);
                                  setShowInstructorDetail(true);
                                }}
                                className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
                              >
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                                  {instructor.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-medium">{instructor.name}</div>
                                  <div className="text-sm text-muted-foreground">{instructor.email}</div>
                                  <div className="text-xs text-muted-foreground">Joined {instructor.joinedDate}</div>
                                </div>
                              </button>
                            </td>
                            <td className="py-4 px-6">
                              <Badge
                                className={
                                  instructor.status === "active"
                                    ? "bg-green-600 text-white"
                                    : instructor.status === "pending"
                                    ? "bg-amber-500 text-white"
                                    : "bg-red-600 text-white"
                                }
                              >
                                {instructor.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <button className="text-primary hover:underline">
                                {instructor.courses}
                              </button>
                            </td>
                            <td className="py-4 px-6">{instructor.students}</td>
                            <td className="py-4 px-6 font-semibold">${instructor.revenue.toLocaleString()}</td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                <span className="font-medium">{instructor.rating}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Settings className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedInstructor(instructor);
                                      setShowInstructorDetail(true);
                                    }}
                                  >
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                                  <DropdownMenuItem>View Courses</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-amber-600">
                                    Suspend
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Remove
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredInstructors.length > 0 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rows per page:</span>
                    <Select
                      value={itemsPerPage.toString()}
                      onValueChange={(value) => {
                        setItemsPerPage(parseInt(value));
                        setCurrentPage(1);
                      }}
                    >
                      <SelectTrigger className="w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="text-sm text-muted-foreground">
                      {startIndex + 1}-{Math.min(endIndex, filteredInstructors.length)} of{" "}
                      {filteredInstructors.length}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter((page) => {
                            // Show first page, last page, current page, and pages around current
                            return (
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            );
                          })
                          .map((page, index, array) => (
                            <div key={page} className="flex items-center">
                              {index > 0 && array[index - 1] !== page - 1 && (
                                <span className="px-2 text-muted-foreground">...</span>
                              )}
                              <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className="w-8 h-8 p-0"
                              >
                                {page}
                              </Button>
                            </div>
                          ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Courses</h1>
                  <p className="text-muted-foreground">Manage all courses across your institution</p>
                </div>
                <Button onClick={() => setShowCreateCourseModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Course
                </Button>
              </div>

              {/* Filters */}
              <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search by course title..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="max-w-md"
                  />
                </div>
                <Select value={courseStatusFilter} onValueChange={setCourseStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={courseInstructorFilter} onValueChange={setCourseInstructorFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Instructors</SelectItem>
                    {mockInstructors.map((instructor) => (
                      <SelectItem key={instructor.id} value={instructor.id}>
                        {instructor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Courses Table */}
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-sm">Course</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm">Instructor</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm">Students</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm">Completion</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm">Revenue</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm">Certificates</th>
                        <th className="text-left py-4 px-6 font-semibold text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCourses.map((course) => (
                        <tr key={course.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                          <td className="py-4 px-6">
                            <button
                              onClick={() => {
                                setSelectedCourse(course);
                                setShowCourseDetail(true);
                              }}
                              className="text-left hover:opacity-80 transition-opacity"
                            >
                              <div className="font-medium">{course.title}</div>
                              <div className="text-sm text-muted-foreground">{course.category}</div>
                              <div className="text-xs text-muted-foreground">Created {course.createdDate}</div>
                            </button>
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => {
                                const instructor = mockInstructors.find(i => i.id === course.instructorId);
                                if (instructor) {
                                  setSelectedInstructor(instructor);
                                  setShowInstructorDetail(true);
                                }
                              }}
                              className="text-primary hover:underline"
                            >
                              {course.instructor}
                            </button>
                          </td>
                          <td className="py-4 px-6">
                            <Badge
                              className={
                                course.status === "published"
                                  ? "bg-green-600 text-white"
                                  : course.status === "pending"
                                  ? "bg-amber-500 text-white"
                                  : course.status === "draft"
                                  ? "bg-gray-500 text-white"
                                  : "bg-red-600 text-white"
                              }
                            >
                              {course.status === "pending" ? "Pending Review" : course.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">{course.students}</td>
                          <td className="py-4 px-6">
                            {course.completion > 0 ? (
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-muted rounded-full h-2 max-w-[60px]">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${course.completion}%` }}
                                  />
                                </div>
                                <span className="text-sm">{course.completion}%</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6 font-semibold">
                            {course.revenue > 0 ? `$${course.revenue.toLocaleString()}` : "-"}
                          </td>
                          <td className="py-4 px-6">
                            {course.certificates > 0 ? (
                              <div className="flex items-center gap-1">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>{course.certificates}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedCourse(course);
                                    setShowCourseDetail(true);
                                  }}
                                >
                                  View Course
                                </DropdownMenuItem>
                                {course.status === "pending" && (
                                  <>
                                    <DropdownMenuItem className="text-green-600">
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem>View Analytics</DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-amber-600">
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  Suspend
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs placeholder */}
          {activeTab !== "overview" && activeTab !== "instructors" && activeTab !== "courses" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2 capitalize">{activeTab}</h1>
                <p className="text-muted-foreground">Manage your institution's {activeTab}</p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <p className="text-muted-foreground text-center py-8">This section is under development...</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Invite Instructor Modal */}
      <Dialog open={showInviteModal} onOpenChange={(open) => {
        setShowInviteModal(open);
        if (!open) {
          // Reset form when closing
          setInviteForm({ fullName: "", email: "", role: "instructor" });
          setInviteErrors({});
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Instructor</DialogTitle>
            <DialogDescription>
              Send an invitation to join your institution as an instructor
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Error Alert */}
            {Object.keys(inviteErrors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-900 font-medium">Please fix the following errors:</p>
                <ul className="text-sm text-red-800 mt-1 space-y-1">
                  {Object.values(inviteErrors).map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <Label htmlFor="instructor-name">Full Name *</Label>
              <Input
                id="instructor-name"
                placeholder="John Doe"
                value={inviteForm.fullName}
                onChange={(e) => {
                  setInviteForm({ ...inviteForm, fullName: e.target.value });
                  if (inviteErrors.fullName) {
                    setInviteErrors({ ...inviteErrors, fullName: "" });
                  }
                }}
                className={inviteErrors.fullName ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label htmlFor="instructor-email">Email Address *</Label>
              <Input
                id="instructor-email"
                type="email"
                placeholder="john@example.com"
                value={inviteForm.email}
                onChange={(e) => {
                  setInviteForm({ ...inviteForm, email: e.target.value });
                  if (inviteErrors.email) {
                    setInviteErrors({ ...inviteErrors, email: "" });
                  }
                }}
                className={inviteErrors.email ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label htmlFor="instructor-role">Role *</Label>
              <Select
                value={inviteForm.role}
                onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="lead-instructor">Lead Instructor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                An invitation email will be sent with instructions to create their account.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowInviteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Validate form
                const errors: Record<string, string> = {};
                
                if (!inviteForm.fullName.trim()) {
                  errors.fullName = "Full name is required";
                }
                
                if (!inviteForm.email.trim()) {
                  errors.email = "Email address is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteForm.email)) {
                  errors.email = "Invalid email format";
                }
                
                if (Object.keys(errors).length > 0) {
                  setInviteErrors(errors);
                  return;
                }

                // Send invitation (in real app, this would call an API)
                // For now, we'll simulate success
                toast({
                  title: "Invitation sent!",
                  description: `An invitation has been sent to ${inviteForm.email}`,
                });

                // Close modal and reset form
                setShowInviteModal(false);
                setInviteForm({ fullName: "", email: "", role: "instructor" });
                setInviteErrors({});

                // In a real app, you would:
                // 1. Call API to create pending instructor record
                // 2. Send invitation email with unique token
                // 3. Refresh instructor list to show pending status
              }}
              className="flex-1"
            >
              Send Invitation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Course Modal */}
      <Dialog open={showCreateCourseModal} onOpenChange={(open) => {
        setShowCreateCourseModal(open);
        if (!open) {
          // Reset form when closing
          setNewCourse({ title: "", category: "", level: "", description: "", price: "" });
          setCourseErrors({});
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Set up a new course for your institution
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Error Alert */}
            {Object.keys(courseErrors).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-900 font-medium">Please fix the following errors:</p>
                <ul className="text-sm text-red-800 mt-1 space-y-1">
                  {Object.values(courseErrors).map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <Label htmlFor="course-title">Course Title *</Label>
              <Input
                id="course-title"
                placeholder="e.g., Advanced Makeup Techniques"
                value={newCourse.title}
                onChange={(e) => {
                  setNewCourse({ ...newCourse, title: e.target.value });
                  if (courseErrors.title) {
                    setCourseErrors({ ...courseErrors, title: "" });
                  }
                }}
                className={courseErrors.title ? "border-red-500" : ""}
              />
            </div>
            <div>
              <Label htmlFor="course-category">Category *</Label>
              <Select
                value={newCourse.category}
                onValueChange={(value) => {
                  setNewCourse({ ...newCourse, category: value });
                  if (courseErrors.category) {
                    setCourseErrors({ ...courseErrors, category: "" });
                  }
                }}
              >
                <SelectTrigger className={courseErrors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="makeup">Makeup Artistry</SelectItem>
                  <SelectItem value="hair">Hair Styling</SelectItem>
                  <SelectItem value="nails">Nail Technology</SelectItem>
                  <SelectItem value="skincare">Skincare</SelectItem>
                  <SelectItem value="business">Business & Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="course-level">Level *</Label>
              <Select
                value={newCourse.level}
                onValueChange={(value) => {
                  setNewCourse({ ...newCourse, level: value });
                  if (courseErrors.level) {
                    setCourseErrors({ ...courseErrors, level: "" });
                  }
                }}
              >
                <SelectTrigger className={courseErrors.level ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="course-description">Description</Label>
              <Input
                id="course-description"
                placeholder="Brief course description"
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="course-price">Price ($)</Label>
              <Input
                id="course-price"
                type="number"
                placeholder="0"
                value={newCourse.price}
                onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowCreateCourseModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Validate form
                const errors: Record<string, string> = {};
                
                if (!newCourse.title.trim()) {
                  errors.title = "Course title is required";
                }
                
                if (!newCourse.category) {
                  errors.category = "Category is required";
                }
                
                if (!newCourse.level) {
                  errors.level = "Level is required";
                }
                
                if (Object.keys(errors).length > 0) {
                  setCourseErrors(errors);
                  return;
                }

                // Generate course ID from title
                const slug = newCourse.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                const courseId = `${slug}-${Date.now()}`;

                // Save course data to localStorage for CourseBuilder to access
                const courseData = {
                  id: courseId,
                  title: newCourse.title,
                  category: newCourse.category,
                  level: newCourse.level,
                  description: newCourse.description,
                  price: parseFloat(newCourse.price) || 0,
                  createdBy: profile?.full_name || "Institution",
                  createdAt: new Date().toISOString(),
                  status: "draft",
                };

                localStorage.setItem(`course_${courseId}`, JSON.stringify(courseData));

                // Show success toast
                toast({
                  title: "Course created!",
                  description: `${newCourse.title} has been created. Complete the course setup in the builder.`,
                });

                // Close modal and reset form
                setShowCreateCourseModal(false);
                setNewCourse({ title: "", category: "", level: "", description: "", price: "" });
                setCourseErrors({});

                // Navigate to Course Builder
                navigate(`/courses/${courseId}/builder`);
              }}
              className="flex-1"
            >
              Create & Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Instructor Detail Modal */}
      <Dialog open={showInstructorDetail} onOpenChange={setShowInstructorDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Instructor Profile</DialogTitle>
          </DialogHeader>
          {selectedInstructor && (
            <div className="space-y-6 py-4">
              {/* Instructor Header */}
              <div className="flex items-start gap-4 pb-6 border-b">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-semibold text-primary">
                  {selectedInstructor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">{selectedInstructor.name}</h3>
                  <p className="text-muted-foreground">{selectedInstructor.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">Joined {selectedInstructor.joinedDate}</p>
                  <div className="mt-3">
                    <Badge
                      className={
                        selectedInstructor.status === "active"
                          ? "bg-green-600 text-white"
                          : selectedInstructor.status === "pending"
                          ? "bg-amber-500 text-white"
                          : "bg-red-600 text-white"
                      }
                    >
                      {selectedInstructor.status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Overview Stats */}
              <div>
                <h4 className="font-semibold mb-4">Performance Overview</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Total Courses</div>
                    <div className="text-2xl font-bold">{selectedInstructor.courses}</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Total Students</div>
                    <div className="text-2xl font-bold">{selectedInstructor.students}</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Revenue Generated</div>
                    <div className="text-2xl font-bold">${selectedInstructor.revenue.toLocaleString()}</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Avg Rating</div>
                    <div className="text-2xl font-bold flex items-center gap-1">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      {selectedInstructor.rating}
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="font-semibold mb-4">Permissions & Settings</h4>
                <div className="space-y-3 bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Can create courses</div>
                      <div className="text-sm text-muted-foreground">Allow instructor to create new courses</div>
                    </div>
                    <Badge className="bg-green-600 text-white">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Can issue certificates</div>
                      <div className="text-sm text-muted-foreground">Allow instructor to issue completion certificates</div>
                    </div>
                    <Badge className="bg-green-600 text-white">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Requires course review</div>
                      <div className="text-sm text-muted-foreground">Courses must be approved before publishing</div>
                    </div>
                    <Badge variant="outline">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Revenue split</div>
                      <div className="text-sm text-muted-foreground">Instructor's share of course revenue</div>
                    </div>
                    <Badge variant="outline">70%</Badge>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setEditingPermissions({
                      canCreateCourses: true,
                      canIssueCertificates: true,
                      requiresCourseReview: false,
                      revenueSplit: 70,
                    });
                    setShowEditPermissionsModal(true);
                  }}
                >
                  Edit Permissions
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setCourseInstructorFilter(selectedInstructor.id);
                    setShowInstructorDetail(false);
                    setActiveTab("courses");
                  }}
                >
                  View Courses
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-amber-600 hover:text-amber-700"
                  onClick={() => setShowSuspendConfirmation(true)}
                >
                  Suspend
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Permissions Modal */}
      <Dialog open={showEditPermissionsModal} onOpenChange={setShowEditPermissionsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Instructor Permissions</DialogTitle>
            <DialogDescription>
              Configure what {selectedInstructor?.name} can do
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Can Create Courses */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="create-courses" className="text-base font-medium">
                  Can create courses
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow instructor to create new courses
                </p>
              </div>
              <Switch
                id="create-courses"
                checked={editingPermissions.canCreateCourses}
                onCheckedChange={(checked) =>
                  setEditingPermissions({ ...editingPermissions, canCreateCourses: checked })
                }
              />
            </div>

            {/* Can Issue Certificates */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="issue-certificates" className="text-base font-medium">
                  Can issue certificates
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow instructor to issue completion certificates
                </p>
              </div>
              <Switch
                id="issue-certificates"
                checked={editingPermissions.canIssueCertificates}
                onCheckedChange={(checked) =>
                  setEditingPermissions({ ...editingPermissions, canIssueCertificates: checked })
                }
              />
            </div>

            {/* Requires Course Review */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="course-review" className="text-base font-medium">
                  Requires course review
                </Label>
                <p className="text-sm text-muted-foreground">
                  Courses must be approved before publishing
                </p>
              </div>
              <Switch
                id="course-review"
                checked={editingPermissions.requiresCourseReview}
                onCheckedChange={(checked) =>
                  setEditingPermissions({ ...editingPermissions, requiresCourseReview: checked })
                }
              />
            </div>

            {/* Revenue Split */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="revenue-split" className="text-base font-medium">
                  Revenue split
                </Label>
                <p className="text-sm text-muted-foreground">
                  Instructor's share of course revenue
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Input
                  id="revenue-split"
                  type="number"
                  min="0"
                  max="100"
                  value={editingPermissions.revenueSplit}
                  onChange={(e) =>
                    setEditingPermissions({
                      ...editingPermissions,
                      revenueSplit: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">
                  % (Institution gets {100 - editingPermissions.revenueSplit}%)
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                Changes will take effect immediately and apply to all future transactions.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowEditPermissionsModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Here you would save the permissions to the backend
                setShowEditPermissionsModal(false);
                // Show success toast
              }}
              className="flex-1"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirmation Dialog */}
      <AlertDialog open={showSuspendConfirmation} onOpenChange={setShowSuspendConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend Instructor?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to suspend {selectedInstructor?.name}? This will:
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Prevent them from logging in</li>
                <li>Hide their courses from learners</li>
                <li>Stop all new enrollments</li>
                <li>Pause revenue generation</li>
              </ul>
              <p className="mt-3 font-medium">
                You can reactivate them later from their profile.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => {
                // Here you would call the API to suspend the instructor
                setShowSuspendConfirmation(false);
                setShowInstructorDetail(false);
                // Show success toast
              }}
            >
              Suspend Instructor
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Course Detail Modal */}
      <Dialog open={showCourseDetail} onOpenChange={setShowCourseDetail}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Overview</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-6 py-4">
              {/* Course Header */}
              <div className="pb-6 border-b">
                <h3 className="text-2xl font-semibold mb-2">{selectedCourse.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{selectedCourse.category}</span>
                  <span>•</span>
                  <span>Created {selectedCourse.createdDate}</span>
                  <span>•</span>
                  <button
                    onClick={() => {
                      const instructor = mockInstructors.find(i => i.id === selectedCourse.instructorId);
                      if (instructor) {
                        setSelectedInstructor(instructor);
                        setShowCourseDetail(false);
                        setShowInstructorDetail(true);
                      }
                    }}
                    className="text-primary hover:underline"
                  >
                    {selectedCourse.instructor}
                  </button>
                </div>
                <div className="mt-3">
                  <Badge
                    className={
                      selectedCourse.status === "published"
                        ? "bg-green-600 text-white"
                        : selectedCourse.status === "pending"
                        ? "bg-amber-500 text-white"
                        : selectedCourse.status === "draft"
                        ? "bg-gray-500 text-white"
                        : "bg-red-600 text-white"
                    }
                  >
                    {selectedCourse.status === "pending" ? "Pending Review" : selectedCourse.status}
                  </Badge>
                </div>
              </div>

              {/* Overview Metrics */}
              <div>
                <h4 className="font-semibold mb-4">Performance Metrics</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Total Students</div>
                    <div className="text-2xl font-bold">{selectedCourse.students}</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Completion Rate</div>
                    <div className="text-2xl font-bold">{selectedCourse.completion}%</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Certificates</div>
                    <div className="text-2xl font-bold">{selectedCourse.certificates}</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Avg Rating</div>
                    <div className="text-2xl font-bold flex items-center gap-1">
                      {selectedCourse.rating > 0 ? (
                        <>
                          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          {selectedCourse.rating}
                        </>
                      ) : (
                        <span className="text-muted-foreground text-base">-</span>
                      )}
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Revenue</div>
                    <div className="text-2xl font-bold">
                      {selectedCourse.revenue > 0 ? `$${selectedCourse.revenue.toLocaleString()}` : "-"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Assessment Summary */}
              <div>
                <h4 className="font-semibold mb-4">Assessment Configuration</h4>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Assessment Type</div>
                      <div className="text-sm text-muted-foreground">Final quiz with multiple choice questions</div>
                    </div>
                    <Badge variant="outline">Quiz</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Passing Score</div>
                      <div className="text-sm text-muted-foreground">Minimum score required to pass</div>
                    </div>
                    <Badge variant="outline">70%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Deadline Enabled</div>
                      <div className="text-sm text-muted-foreground">Assignment submission deadline</div>
                    </div>
                    <Badge className="bg-green-600 text-white">Yes</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Late Submissions</div>
                      <div className="text-sm text-muted-foreground">Allow submissions after deadline</div>
                    </div>
                    <Badge className="bg-green-600 text-white">Allowed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Retake Policy</div>
                      <div className="text-sm text-muted-foreground">Number of attempts allowed</div>
                    </div>
                    <Badge variant="outline">Unlimited</Badge>
                  </div>
                </div>
              </div>

              {/* Certification Settings */}
              <div>
                <h4 className="font-semibold mb-4">Certification Settings</h4>
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Certification Enabled</div>
                      <div className="text-sm text-muted-foreground">Issue certificates upon completion</div>
                    </div>
                    <Badge className="bg-green-600 text-white">Yes</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Template Type</div>
                      <div className="text-sm text-muted-foreground">Certificate design template</div>
                    </div>
                    <Badge variant="outline">Professional</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Issuer</div>
                      <div className="text-sm text-muted-foreground">Who issues the certificate</div>
                    </div>
                    <Badge variant="outline">Institution</Badge>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div>
                <h4 className="font-semibold mb-4">Activity Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <div className="font-medium">Course Created</div>
                      <div className="text-sm text-muted-foreground">{selectedCourse.createdDate}</div>
                    </div>
                  </div>
                  {selectedCourse.status !== "draft" && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                      <div className="flex-1">
                        <div className="font-medium">Submitted for Review</div>
                        <div className="text-sm text-muted-foreground">Feb 10, 2024</div>
                      </div>
                    </div>
                  )}
                  {selectedCourse.status === "published" && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                      <div className="flex-1">
                        <div className="font-medium">Approved & Published</div>
                        <div className="text-sm text-muted-foreground">Feb 12, 2024</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2" />
                    <div className="flex-1">
                      <div className="font-medium">Last Updated</div>
                      <div className="text-sm text-muted-foreground">Mar 15, 2024</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedCourse.status === "pending" && (
                  <>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Approve Course
                    </Button>
                    <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                      Reject Course
                    </Button>
                  </>
                )}
                {selectedCourse.status === "published" && (
                  <>
                    <Button variant="outline" className="flex-1">
                      View Analytics
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Edit Course
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstitutionDashboard;
