// ─── Mock Data Store for HRMS ───────────────────────────────────────────────

export type Employee = {
  id: string;
  empId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  reportingManager: string;
  joinDate: string;
  status: "Active" | "Inactive" | "On Leave";
  avatar?: string;
  salary: number;
  address: string;
  dob: string;
  gender: "Male" | "Female" | "Other";
  bloodGroup: string;
  skills: string[];
  documents: string[];
};

export type JobOpening = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  openings: number;
  status: "Open" | "Closed" | "On Hold";
  postedDate: string;
  deadline: string;
  description: string;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobId: string;
  jobTitle: string;
  appliedDate: string;
  status: "Applied" | "Screening" | "Interview" | "Selected" | "Rejected" | "Offered";
  resume: string;
  experience: string;
  skills: string[];
};

export type LeaveRequest = {
  id: string;
  empId: string;
  empName: string;
  department: string;
  type: "Casual" | "Sick" | "Earned" | "Maternity" | "Paternity" | "LOP";
  from: string;
  to: string;
  days: number;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedOn: string;
};

export type AttendanceRecord = {
  id: string;
  empId: string;
  empName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hours: number;
  status: "Present" | "Absent" | "Late" | "Half Day" | "Holiday";
};

export type PayrollRecord = {
  id: string;
  empId: string;
  empName: string;
  department: string;
  month: string;
  year: string;
  basicSalary: number;
  hra: number;
  conveyance: number;
  medical: number;
  allowances: number;
  pf: number;
  esi: number;
  tds: number;
  otherDeductions: number;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  status: "Pending" | "Processed" | "Paid";
};

export type PerformanceReview = {
  id: string;
  empId: string;
  empName: string;
  department: string;
  period: string;
  rating: number;
  goals: number;
  goalsAchieved: number;
  managerFeedback: string;
  selfRating: number;
  status: "Pending" | "In Progress" | "Completed";
};

export type TrainingProgram = {
  id: string;
  title: string;
  category: string;
  trainer: string;
  startDate: string;
  endDate: string;
  duration: string;
  enrolled: number;
  capacity: number;
  status: "Upcoming" | "Ongoing" | "Completed";
  description: string;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  type: "General" | "Holiday" | "Policy" | "Event" | "Alert";
  postedBy: string;
  postedOn: string;
  priority: "Low" | "Medium" | "High";
};

export type Document = {
  id: string;
  empId: string;
  empName: string;
  type: "ID Proof" | "Address Proof" | "Qualification" | "Experience" | "Tax" | "Payslip" | "Policy" | "Other";
  name: string;
  uploadedOn: string;
  size: string;
  status: "Verified" | "Pending" | "Rejected";
};

export type ExitRecord = {
  id: string;
  empId: string;
  empName: string;
  department: string;
  designation: string;
  resignationDate: string;
  lastWorkingDay: string;
  reason: string;
  status: "Submitted" | "In Review" | "Clearance" | "Completed";
  noticePeriod: number;
  feedback: string;
};

// ─── Mock Employees ──────────────────────────────────────────────────────────
export const employees: Employee[] = [
  { id: "1", empId: "IEL001", name: "Rajesh Kumar", email: "rajesh.kumar@isolative.in", phone: "9876543210", department: "Electrical", designation: "Senior Engineer", reportingManager: "Suresh Patil", joinDate: "2020-03-15", status: "Active", salary: 75000, address: "Khandala, Satara", dob: "1988-07-22", gender: "Male", bloodGroup: "B+", skills: ["AutoCAD", "PLC", "SCADA"], documents: ["Aadhar", "PAN", "Degree"] },
  { id: "2", empId: "IEL002", name: "Priya Sharma", email: "priya.sharma@isolative.in", phone: "9876543211", department: "HR", designation: "HR Manager", reportingManager: "Vikram Joshi", joinDate: "2019-06-01", status: "Active", salary: 65000, address: "Satara, Maharashtra", dob: "1990-02-14", gender: "Female", bloodGroup: "A+", skills: ["Recruitment", "Payroll", "Compliance"], documents: ["Aadhar", "PAN"] },
  { id: "3", empId: "IEL003", name: "Amit Desai", email: "amit.desai@isolative.in", phone: "9876543212", department: "Finance", designation: "Finance Analyst", reportingManager: "Priya Sharma", joinDate: "2021-08-10", status: "Active", salary: 55000, address: "Pune, Maharashtra", dob: "1993-11-30", gender: "Male", bloodGroup: "O+", skills: ["Tally", "Excel", "SAP"], documents: ["Aadhar", "PAN", "Degree"] },
  { id: "4", empId: "IEL004", name: "Sneha Patil", email: "sneha.patil@isolative.in", phone: "9876543213", department: "Operations", designation: "Operations Executive", reportingManager: "Rajesh Kumar", joinDate: "2022-01-20", status: "On Leave", salary: 45000, address: "Kolhapur, Maharashtra", dob: "1995-05-17", gender: "Female", bloodGroup: "AB+", skills: ["Project Management", "Logistics"], documents: ["Aadhar", "PAN"] },
  { id: "5", empId: "IEL005", name: "Vikas Mehta", email: "vikas.mehta@isolative.in", phone: "9876543214", department: "Electrical", designation: "Junior Engineer", reportingManager: "Rajesh Kumar", joinDate: "2023-03-01", status: "Active", salary: 38000, address: "Nashik, Maharashtra", dob: "1997-09-08", gender: "Male", bloodGroup: "B-", skills: ["Wiring", "AutoCAD"], documents: ["Aadhar", "PAN", "Diploma"] },
  { id: "6", empId: "IEL006", name: "Kavita Rao", email: "kavita.rao@isolative.in", phone: "9876543215", department: "Admin", designation: "Admin Officer", reportingManager: "Priya Sharma", joinDate: "2020-11-15", status: "Active", salary: 42000, address: "Mumbai, Maharashtra", dob: "1991-04-25", gender: "Female", bloodGroup: "A-", skills: ["Administration", "Coordination"], documents: ["Aadhar", "PAN"] },
  { id: "7", empId: "IEL007", name: "Suresh Patil", email: "suresh.patil@isolative.in", phone: "9876543216", department: "Management", designation: "General Manager", reportingManager: "CEO", joinDate: "2015-05-10", status: "Active", salary: 150000, address: "Khandala, Satara", dob: "1975-12-01", gender: "Male", bloodGroup: "O-", skills: ["Leadership", "Strategy", "P&L"], documents: ["Aadhar", "PAN", "MBA"] },
  { id: "8", empId: "IEL008", name: "Meera Joshi", email: "meera.joshi@isolative.in", phone: "9876543217", department: "IT", designation: "Software Developer", reportingManager: "Vikas Mehta", joinDate: "2023-07-01", status: "Active", salary: 52000, address: "Pune, Maharashtra", dob: "1998-03-12", gender: "Female", bloodGroup: "B+", skills: ["React", "Node.js", "TypeScript"], documents: ["Aadhar", "PAN", "Degree"] },
];

// ─── Mock Job Openings ────────────────────────────────────────────────────────
export const jobOpenings: JobOpening[] = [
  { id: "J001", title: "Electrical Engineer", department: "Electrical", location: "Khandala, Satara", type: "Full-Time", openings: 3, status: "Open", postedDate: "2026-10-01", deadline: "2026-11-30", description: "Experienced electrical engineer for industrial projects." },
  { id: "J002", title: "HR Executive", department: "HR", location: "Satara", type: "Full-Time", openings: 1, status: "Open", postedDate: "2026-10-15", deadline: "2026-11-15", description: "Handle recruitment, onboarding, and employee relations." },
  { id: "J003", title: "Finance Manager", department: "Finance", location: "Satara", type: "Full-Time", openings: 1, status: "On Hold", postedDate: "2026-09-01", deadline: "2026-10-31", description: "Manage company finances and accounts." },
  { id: "J004", title: "Operations Supervisor", department: "Operations", location: "Khandala", type: "Full-Time", openings: 2, status: "Open", postedDate: "2026-10-20", deadline: "2026-12-01", description: "Supervise day-to-day operations and logistics." },
  { id: "J005", title: "Sales Executive", department: "Sales", location: "Mumbai", type: "Full-Time", openings: 5, status: "Open", postedDate: "2026-10-25", deadline: "2026-11-25", description: "Drive B2B sales for electrical solutions." },
];

// ─── Mock Candidates ──────────────────────────────────────────────────────────
export const candidates: Candidate[] = [
  { id: "C001", name: "Arjun Nair", email: "arjun.nair@email.com", phone: "9988776655", jobId: "J001", jobTitle: "Electrical Engineer", appliedDate: "2026-10-05", status: "Interview", resume: "arjun_nair_resume.pdf", experience: "4 years", skills: ["PLC", "AutoCAD", "Switchgear"] },
  { id: "C002", name: "Pooja Reddy", email: "pooja.reddy@email.com", phone: "9988776644", jobId: "J002", jobTitle: "HR Executive", appliedDate: "2026-10-18", status: "Screening", resume: "pooja_reddy_resume.pdf", experience: "2 years", skills: ["Recruitment", "Excel", "Communication"] },
  { id: "C003", name: "Sanjay Gupta", email: "sanjay.gupta@email.com", phone: "9988776633", jobId: "J001", jobTitle: "Electrical Engineer", appliedDate: "2026-10-06", status: "Selected", resume: "sanjay_gupta_resume.pdf", experience: "6 years", skills: ["SCADA", "PLC", "Electrical Design"] },
  { id: "C004", name: "Nisha Iyer", email: "nisha.iyer@email.com", phone: "9988776622", jobId: "J005", jobTitle: "Sales Executive", appliedDate: "2026-10-27", status: "Applied", resume: "nisha_iyer_resume.pdf", experience: "3 years", skills: ["B2B Sales", "CRM", "Negotiation"] },
  { id: "C005", name: "Ravi Thakur", email: "ravi.thakur@email.com", phone: "9988776611", jobId: "J004", jobTitle: "Operations Supervisor", appliedDate: "2026-10-22", status: "Interview", resume: "ravi_thakur_resume.pdf", experience: "5 years", skills: ["Logistics", "ERP", "Team Management"] },
  { id: "C006", name: "Anita Singh", email: "anita.singh@email.com", phone: "9988776600", jobId: "J001", jobTitle: "Electrical Engineer", appliedDate: "2026-10-08", status: "Rejected", resume: "anita_singh_resume.pdf", experience: "1 year", skills: ["Basic Wiring"] },
];

// ─── Mock Leave Requests ──────────────────────────────────────────────────────
export const leaveRequests: LeaveRequest[] = [
  { id: "L001", empId: "IEL001", empName: "Rajesh Kumar", department: "Electrical", type: "Casual", from: "2026-11-05", to: "2026-11-06", days: 2, reason: "Personal work", status: "Approved", appliedOn: "2026-10-28" },
  { id: "L002", empId: "IEL004", empName: "Sneha Patil", department: "Operations", type: "Sick", from: "2026-11-01", to: "2026-11-07", days: 7, reason: "Medical treatment", status: "Approved", appliedOn: "2026-10-31" },
  { id: "L003", empId: "IEL005", empName: "Vikas Mehta", department: "Electrical", type: "Earned", from: "2026-11-10", to: "2026-11-14", days: 5, reason: "Family vacation", status: "Pending", appliedOn: "2026-11-01" },
  { id: "L004", empId: "IEL003", empName: "Amit Desai", department: "Finance", type: "Casual", from: "2026-11-03", to: "2026-11-03", days: 1, reason: "Festival", status: "Approved", appliedOn: "2026-10-30" },
  { id: "L005", empId: "IEL008", empName: "Meera Joshi", department: "IT", type: "Sick", from: "2026-11-08", to: "2026-11-09", days: 2, reason: "Fever", status: "Pending", appliedOn: "2026-11-02" },
];

// ─── Mock Attendance ──────────────────────────────────────────────────────────
export const attendanceRecords: AttendanceRecord[] = [
  { id: "A001", empId: "IEL001", empName: "Rajesh Kumar", date: "2026-11-02", checkIn: "09:02", checkOut: "18:05", hours: 9.05, status: "Present" },
  { id: "A002", empId: "IEL002", empName: "Priya Sharma", date: "2026-11-02", checkIn: "09:15", checkOut: "18:00", hours: 8.75, status: "Present" },
  { id: "A003", empId: "IEL003", empName: "Amit Desai", date: "2026-11-02", checkIn: "09:45", checkOut: "18:00", hours: 8.25, status: "Late" },
  { id: "A004", empId: "IEL004", empName: "Sneha Patil", date: "2026-11-02", checkIn: "", checkOut: "", hours: 0, status: "Absent" },
  { id: "A005", empId: "IEL005", empName: "Vikas Mehta", date: "2026-11-02", checkIn: "09:00", checkOut: "18:10", hours: 9.17, status: "Present" },
  { id: "A006", empId: "IEL006", empName: "Kavita Rao", date: "2026-11-02", checkIn: "09:05", checkOut: "13:00", hours: 3.92, status: "Half Day" },
  { id: "A007", empId: "IEL007", empName: "Suresh Patil", date: "2026-11-02", checkIn: "08:45", checkOut: "19:00", hours: 10.25, status: "Present" },
  { id: "A008", empId: "IEL008", empName: "Meera Joshi", date: "2026-11-02", checkIn: "09:10", checkOut: "18:05", hours: 8.92, status: "Present" },
];

// ─── Mock Payroll ─────────────────────────────────────────────────────────────
export const payrollRecords: PayrollRecord[] = [
  { id: "P001", empId: "IEL001", empName: "Rajesh Kumar", department: "Electrical", month: "October", year: "2026", basicSalary: 45000, hra: 18000, conveyance: 1600, medical: 1250, allowances: 9150, pf: 5400, esi: 0, tds: 3500, otherDeductions: 0, grossSalary: 75000, totalDeductions: 8900, netSalary: 66100, status: "Paid" },
  { id: "P002", empId: "IEL002", empName: "Priya Sharma", department: "HR", month: "October", year: "2026", basicSalary: 39000, hra: 15600, conveyance: 1600, medical: 1250, allowances: 7550, pf: 4680, esi: 0, tds: 2800, otherDeductions: 0, grossSalary: 65000, totalDeductions: 7480, netSalary: 57520, status: "Paid" },
  { id: "P003", empId: "IEL003", empName: "Amit Desai", department: "Finance", month: "October", year: "2026", basicSalary: 33000, hra: 13200, conveyance: 1600, medical: 1250, allowances: 5950, pf: 3960, esi: 0, tds: 2000, otherDeductions: 0, grossSalary: 55000, totalDeductions: 5960, netSalary: 49040, status: "Processed" },
  { id: "P004", empId: "IEL005", empName: "Vikas Mehta", department: "Electrical", month: "October", year: "2026", basicSalary: 22800, hra: 9120, conveyance: 1600, medical: 1250, allowances: 3230, pf: 2736, esi: 684, tds: 0, otherDeductions: 0, grossSalary: 38000, totalDeductions: 3420, netSalary: 34580, status: "Pending" },
];

// ─── Mock Performance Reviews ─────────────────────────────────────────────────
export const performanceReviews: PerformanceReview[] = [
  { id: "PR001", empId: "IEL001", empName: "Rajesh Kumar", department: "Electrical", period: "Q3 2026", rating: 4.2, goals: 8, goalsAchieved: 7, managerFeedback: "Excellent technical skills. Needs to improve on documentation.", selfRating: 4.0, status: "Completed" },
  { id: "PR002", empId: "IEL002", empName: "Priya Sharma", department: "HR", period: "Q3 2026", rating: 4.5, goals: 10, goalsAchieved: 9, managerFeedback: "Outstanding HR management. Great team player.", selfRating: 4.5, status: "Completed" },
  { id: "PR003", empId: "IEL003", empName: "Amit Desai", department: "Finance", period: "Q3 2026", rating: 3.8, goals: 6, goalsAchieved: 5, managerFeedback: "Good work on financial reporting. Should focus on accuracy.", selfRating: 3.5, status: "In Progress" },
  { id: "PR004", empId: "IEL005", empName: "Vikas Mehta", department: "Electrical", period: "Q3 2026", rating: 0, goals: 5, goalsAchieved: 0, managerFeedback: "", selfRating: 0, status: "Pending" },
];

// ─── Mock Training Programs ───────────────────────────────────────────────────
export const trainingPrograms: TrainingProgram[] = [
  { id: "T001", title: "Electrical Safety & Compliance", category: "Safety", trainer: "Suresh Patil", startDate: "2026-11-10", endDate: "2026-11-12", duration: "3 days", enrolled: 12, capacity: 20, status: "Upcoming", description: "Comprehensive electrical safety training as per IS standards." },
  { id: "T002", title: "Advanced PLC Programming", category: "Technical", trainer: "External Trainer", startDate: "2026-10-20", endDate: "2026-10-25", duration: "5 days", enrolled: 8, capacity: 10, status: "Completed", description: "Hands-on PLC programming for Siemens and Allen Bradley systems." },
  { id: "T003", title: "Leadership & Management Skills", category: "Soft Skills", trainer: "Priya Sharma", startDate: "2026-11-15", endDate: "2026-11-16", duration: "2 days", enrolled: 6, capacity: 15, status: "Upcoming", description: "Leadership development for mid-level managers." },
  { id: "T004", title: "MS Excel & Data Analysis", category: "IT Skills", trainer: "Meera Joshi", startDate: "2026-11-01", endDate: "2026-11-03", duration: "3 days", enrolled: 15, capacity: 15, status: "Ongoing", description: "Excel for business data analysis and reporting." },
];

// ─── Mock Announcements ───────────────────────────────────────────────────────
export const announcements: Announcement[] = [
  { id: "AN001", title: "Office Closed - Diwali Holiday", content: "The office will remain closed on Nov 1st, 2nd & 3rd for Diwali celebrations. Wishing everyone a Happy Diwali!", type: "Holiday", postedBy: "Priya Sharma", postedOn: "2026-10-28", priority: "High" },
  { id: "AN002", title: "New HR Policy Update", content: "The updated Leave Policy has been released effective December 1, 2026. Please review the document in the Document Management section.", type: "Policy", postedBy: "Priya Sharma", postedOn: "2026-11-01", priority: "High" },
  { id: "AN003", title: "Company Annual Meet - Satara", content: "The Annual Company Meet will be held on December 15, 2026 at Hotel Landmark, Satara. Attendance is mandatory for all employees.", type: "Event", postedBy: "Suresh Patil", postedOn: "2026-11-02", priority: "Medium" },
  { id: "AN004", title: "Fire Safety Drill", content: "A fire safety drill will be conducted on November 10, 2026 at 11:00 AM. All employees must participate.", type: "Alert", postedBy: "Kavita Rao", postedOn: "2026-11-02", priority: "High" },
  { id: "AN005", title: "New Project Won - MSEDCL Substation", content: "We are pleased to announce that Isolative Electricals has been awarded the MSEDCL substation project worth ₹2.5 Crore!", type: "General", postedBy: "Suresh Patil", postedOn: "2026-10-30", priority: "Medium" },
];

// ─── Mock Documents ───────────────────────────────────────────────────────────
export const documents: Document[] = [
  { id: "D001", empId: "IEL001", empName: "Rajesh Kumar", type: "ID Proof", name: "Aadhar Card - Rajesh Kumar.pdf", uploadedOn: "2020-03-15", size: "1.2 MB", status: "Verified" },
  { id: "D002", empId: "IEL001", empName: "Rajesh Kumar", type: "Qualification", name: "B.Tech Degree - Rajesh Kumar.pdf", uploadedOn: "2020-03-15", size: "2.5 MB", status: "Verified" },
  { id: "D003", empId: "IEL002", empName: "Priya Sharma", type: "ID Proof", name: "Aadhar Card - Priya Sharma.pdf", uploadedOn: "2019-06-01", size: "1.1 MB", status: "Verified" },
  { id: "D004", empId: "IEL002", empName: "Priya Sharma", type: "Tax", name: "Form 16 - FY 2025-26.pdf", uploadedOn: "2026-06-15", size: "0.8 MB", status: "Pending" },
  { id: "D005", empId: "IEL003", empName: "Amit Desai", type: "Qualification", name: "MBA Certificate - Amit Desai.pdf", uploadedOn: "2021-08-10", size: "3.1 MB", status: "Verified" },
  { id: "D006", empId: "IEL008", empName: "Meera Joshi", type: "Experience", name: "Experience Letter - Previous Company.pdf", uploadedOn: "2023-07-01", size: "0.5 MB", status: "Pending" },
];

// ─── Mock Exit Records ────────────────────────────────────────────────────────
export const exitRecords: ExitRecord[] = [
  { id: "E001", empId: "IEL009", empName: "Deepak Verma", department: "Electrical", designation: "Engineer", resignationDate: "2026-10-01", lastWorkingDay: "2026-10-31", reason: "Better opportunity", status: "Completed", noticePeriod: 30, feedback: "Good company to work with. Processes could be more streamlined." },
  { id: "E002", empId: "IEL010", empName: "Swati Kulkarni", department: "Admin", designation: "Executive", resignationDate: "2026-10-20", lastWorkingDay: "2026-11-19", reason: "Relocation", status: "Clearance", noticePeriod: 30, feedback: "" },
];

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export const dashboardStats = {
  totalEmployees: 8,
  activeEmployees: 6,
  onLeave: 1,
  newHires: 2,
  openPositions: 11,
  pendingLeaves: 2,
  attendanceToday: 87.5,
  payrollMonth: "October 2026",
  totalPayroll: 279640,
};
