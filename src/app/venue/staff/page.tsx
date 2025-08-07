"use client";

import { useState } from "react";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  avatar?: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  memberCount: number;
}

export default function VenueStaffPage() {
  const [activeTab, setActiveTab] = useState<"staff" | "roles">("staff");
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  
  // Sample staff members data
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "staff-1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Manager",
      status: "active",
      joinDate: "Jun 15, 2024",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: "staff-2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Barista",
      status: "active",
      joinDate: "Jul 20, 2024",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: "staff-3",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      role: "Server",
      status: "active",
      joinDate: "Aug 05, 2024",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: "staff-4",
      name: "Emily Davis",
      email: "emily.d@example.com",
      role: "Barista",
      status: "active",
      joinDate: "Jul 10, 2024",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    {
      id: "staff-5",
      name: "Robert Wilson",
      email: "robert.w@example.com",
      role: "Server",
      status: "inactive",
      joinDate: "May 12, 2024"
    },
    {
      id: "staff-6",
      name: "Sarah Thompson",
      email: "sarah.t@example.com",
      role: "Cashier",
      status: "pending",
      joinDate: "Aug 12, 2024",
      avatar: "https://i.pravatar.cc/150?img=9"
    }
  ]);
  
  // Sample roles data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "role-1",
      name: "Manager",
      permissions: ["manage_staff", "manage_menu", "view_reports", "manage_bookings", "manage_orders", "manage_inventory"],
      memberCount: 1
    },
    {
      id: "role-2",
      name: "Barista",
      permissions: ["manage_orders", "view_inventory"],
      memberCount: 2
    },
    {
      id: "role-3",
      name: "Server",
      permissions: ["manage_orders"],
      memberCount: 2
    },
    {
      id: "role-4",
      name: "Cashier",
      permissions: ["manage_orders", "view_bookings"],
      memberCount: 1
    }
  ]);
  
  // Filter staff members
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || staff.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  // Get all unique roles for the filter dropdown
  const uniqueRoles = Array.from(new Set(staffMembers.map(staff => staff.role)));
  
  // Function to get the status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "inactive":
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400";
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Staff Management</h1>
          <p className="text-muted-foreground">
            Manage your venue's staff and role permissions
          </p>
        </div>
        
        <div>
          <button 
            onClick={() => activeTab === "staff" ? setShowAddStaffModal(true) : setShowAddRoleModal(true)}
            className="btn-primary py-2 px-4 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {activeTab === "staff" ? "Add Staff Member" : "Add Role"}
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-border mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "staff"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("staff")}
        >
          Staff Members
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "roles"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveTab("roles")}
        >
          Roles & Permissions
        </button>
      </div>
      
      {/* Staff Tab Content */}
      {activeTab === "staff" && (
        <>
          {/* Filters */}
          <div className="workout-card p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 pr-10 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-muted-foreground">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Role Filter */}
              <div className="w-full md:w-48">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                >
                  <option value="all">All Roles</option>
                  {uniqueRoles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Staff List */}
          <div className="workout-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Staff Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredStaff.length > 0 ? (
                    filteredStaff.map((staff) => (
                      <tr key={staff.id} className="hover:bg-accent/10">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {staff.avatar ? (
                              <img
                                src={staff.avatar}
                                alt={staff.name}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
                                {staff.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{staff.name}</div>
                              <div className="text-xs text-muted-foreground">{staff.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {staff.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(staff.status)}`}>
                            {staff.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {staff.joinDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button className="text-primary hover:text-primary/80">
                              Edit
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                        No staff members found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pending Invitations Section */}
          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">Pending Invitations</h2>
            <div className="workout-card overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">sarah.t@example.com</p>
                    <p className="text-sm text-muted-foreground">Sent Aug 12, 2025 • Expires in 6 days</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-sm text-primary hover:underline">
                      Resend
                    </button>
                    <button className="text-sm text-red-500 hover:underline">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Roles Tab Content */}
      {activeTab === "roles" && (
        <div className="grid grid-cols-1 gap-6">
          {roles.map((role) => (
            <div key={role.id} className="workout-card overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{role.name}</h3>
                  <p className="text-sm text-muted-foreground">{role.memberCount} staff member{role.memberCount !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-accent/50 rounded-md hover:bg-accent/70">
                    Edit
                  </button>
                  {role.name !== "Manager" && (
                    <button className="px-3 py-1 text-sm bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50">
                      Delete
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-sm font-medium mb-3">Permissions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {role.permissions.map((permission, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm capitalize">{permission.split("_").join(" ")}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {role.memberCount > 0 && (
                <div className="px-6 pb-6">
                  <h4 className="text-sm font-medium mb-3">Staff Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {staffMembers
                      .filter(staff => staff.role === role.name)
                      .map(staff => (
                        <div key={staff.id} className="flex items-center gap-2 px-2 py-1 bg-accent/30 rounded-md">
                          {staff.avatar ? (
                            <img
                              src={staff.avatar}
                              alt={staff.name}
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
                              {staff.name.charAt(0)}
                            </div>
                          )}
                          <span className="text-sm">{staff.name}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Add Staff Member</h3>
                <button 
                  onClick={() => setShowAddStaffModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                      placeholder="Enter staff email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium mb-2">
                      Role
                    </label>
                    <select
                      id="role"
                      className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                      required
                    >
                      <option value="">Select a role</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sendInvite"
                      className="rounded border-border text-primary focus:ring-primary mr-2"
                      defaultChecked
                    />
                    <label htmlFor="sendInvite" className="text-sm">
                      Send invitation email
                    </label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddStaffModal(false)}
                    className="px-4 py-2 border border-border rounded-md hover:bg-accent/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Role Modal */}
      {showAddRoleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Create New Role</h3>
                <button 
                  onClick={() => setShowAddRoleModal(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="roleName" className="block text-sm font-medium mb-2">
                      Role Name
                    </label>
                    <input
                      type="text"
                      id="roleName"
                      className="w-full p-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary bg-transparent"
                      placeholder="Enter role name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Permissions
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-border text-primary focus:ring-primary mr-2"
                        />
                        <span className="text-sm">Manage Staff</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-border text-primary focus:ring-primary mr-2"
                        />
                        <span className="text-sm">Manage Menu</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-border text-primary focus:ring-primary mr-2"
                        />
                        <span className="text-sm">View Reports</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-border text-primary focus:ring-primary mr-2"
                        />
                        <span className="text-sm">Manage Bookings</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-border text-primary focus:ring-primary mr-2"
                        />
                        <span className="text-sm">Manage Orders</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-border text-primary focus:ring-primary mr-2"
                        />
                        <span className="text-sm">Manage Inventory</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddRoleModal(false)}
                    className="px-4 py-2 border border-border rounded-md hover:bg-accent/50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2"
                  >
                    Create Role
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}