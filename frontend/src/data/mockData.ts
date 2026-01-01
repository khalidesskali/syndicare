import type {
  Charge,
  Payment,
  Reclamation,
  Announcement,
  DashboardSummary,
} from "../types/residentPortal";

export const mockCharges: Charge[] = [
  {
    id: "1",
    description: "Monthly Maintenance Fee",
    amount: 250,
    dueDate: "2024-01-15",
    status: "UNPAID",
    reference: "CHG-2024-001",
  },
  {
    id: "2",
    description: "Water Bill",
    amount: 45,
    dueDate: "2024-01-10",
    status: "OVERDUE",
    reference: "CHG-2024-002",
  },
  {
    id: "3",
    description: "Electricity Common Areas",
    amount: 30,
    dueDate: "2023-12-20",
    status: "PAID",
    reference: "CHG-2023-003",
  },
  {
    id: "4",
    description: "Elevator Maintenance",
    amount: 15,
    dueDate: "2024-01-25",
    status: "UNPAID",
    reference: "CHG-2024-004",
  },
  {
    id: "5",
    description: "Security Services",
    amount: 50,
    dueDate: "2024-01-05",
    status: "PAID",
    reference: "CHG-2024-005",
  },
];

export const mockPayments: Payment[] = [
  {
    id: "1",
    chargeReference: "CHG-2023-003",
    amount: 30,
    paymentDate: "2023-12-18",
    paymentMethod: "CREDIT_CARD",
  },
  {
    id: "2",
    chargeReference: "CHG-2024-005",
    amount: 50,
    paymentDate: "2024-01-03",
    paymentMethod: "BANK_TRANSFER",
  },
  {
    id: "3",
    chargeReference: "CHG-2023-006",
    amount: 200,
    paymentDate: "2023-12-01",
    paymentMethod: "CREDIT_CARD",
  },
];

export const mockReclamations: Reclamation[] = [
  {
    id: "1",
    title: "Leaking faucet in kitchen",
    description:
      "The kitchen faucet has been leaking for the past week. Water is dripping constantly.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    createdDate: "2024-01-08",
  },
  {
    id: "2",
    title: "Hallway light not working",
    description:
      "The light in the hallway on 3rd floor is not working, making it unsafe at night.",
    status: "RESOLVED",
    priority: "HIGH",
    createdDate: "2024-01-05",
  },
  {
    id: "3",
    title: "Noise complaint from upstairs",
    description: "Excessive noise from apartment 4B during late hours.",
    status: "PENDING",
    priority: "LOW",
    createdDate: "2024-01-10",
  },
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Scheduled Water Maintenance",
    content:
      "Water supply will be interrupted on January 20th from 9 AM to 2 PM for maintenance work. Please store sufficient water.",
    date: "2024-01-12",
    author: "Building Management",
  },
  {
    id: "2",
    title: "New Security Measures",
    content:
      "We are implementing new security measures including CCTV installation in common areas. Installation will begin next week.",
    date: "2024-01-08",
    author: "Security Committee",
  },
  {
    id: "3",
    title: "Annual General Meeting",
    content:
      "The annual general meeting will be held on January 25th at 6 PM in the community hall. All residents are requested to attend.",
    date: "2024-01-05",
    author: "Management Office",
  },
];

export const mockDashboardSummary: DashboardSummary = {
  totalUnpaid: 295,
  overdueChargesCount: 1,
  lastPaymentDate: "2024-01-03",
  recentCharges: mockCharges.slice(0, 5),
};
