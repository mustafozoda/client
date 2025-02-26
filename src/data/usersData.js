const usersData = [
  {
    id: 1,
    name: "John Doe",
    role: "Admin",
    email: "john.doe@example.com",
    phone: "+1 555-1234",
    department: "Operations",
    permissions: ["manage_users", "view_reports", "edit_machines"],
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Worker",
    email: "jane.smith@example.com",
    phone: "+1 555-5678",
    department: "Manufacturing",
    permissions: ["view_machines", "report_issues"],
  },
  {
    id: 3,
    name: "Mark Johnson",
    role: "Technician",
    email: "mark.johnson@example.com",
    phone: "+1 555-9876",
    department: "Maintenance",
    permissions: ["view_machines", "perform_maintenance", "report_issues"],
  },
];

export default usersData;
