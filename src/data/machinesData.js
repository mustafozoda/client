const machinesData = [
  {
    id: 1,
    name: "Lathe Machine",
    type: "CNC",
    status: "Running",
    lastMaintenance: "2024-02-10",
    nextMaintenance: "2024-03-10",
    location: "Factory A - Section 1",
    assignedOperator: "John Doe",
    issues: [],
  },
  {
    id: 2,
    name: "Milling Machine",
    type: "Manual",
    status: "Under Maintenance",
    lastMaintenance: "2024-01-25",
    nextMaintenance: "2024-03-05",
    location: "Factory B - Section 3",
    assignedOperator: "Jane Smith",
    issues: [
      {
        reportedBy: "Mark Johnson",
        date: "2024-02-15",
        description: "Spindle motor overheating",
      },
    ],
  },
  {
    id: 3,
    name: "Welding Machine",
    type: "Automatic",
    status: "Idle",
    lastMaintenance: "2024-02-05",
    nextMaintenance: "2024-03-15",
    location: "Factory A - Section 2",
    assignedOperator: "Chris Evans",
    issues: [],
  },
];

export default machinesData;
