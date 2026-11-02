import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Inactive: "bg-gray-100 text-gray-600",
    "On Leave": "bg-amber-100 text-amber-700",
    Open: "bg-emerald-100 text-emerald-700",
    Closed: "bg-red-100 text-red-700",
    "On Hold": "bg-amber-100 text-amber-700",
    Applied: "bg-blue-100 text-blue-700",
    Screening: "bg-purple-100 text-purple-700",
    Interview: "bg-indigo-100 text-indigo-700",
    Selected: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
    Offered: "bg-teal-100 text-teal-700",
    Pending: "bg-amber-100 text-amber-700",
    Approved: "bg-emerald-100 text-emerald-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-emerald-100 text-emerald-700",
    Upcoming: "bg-purple-100 text-purple-700",
    Ongoing: "bg-blue-100 text-blue-700",
    Paid: "bg-emerald-100 text-emerald-700",
    Processed: "bg-blue-100 text-blue-700",
    Present: "bg-emerald-100 text-emerald-700",
    Absent: "bg-red-100 text-red-700",
    Late: "bg-amber-100 text-amber-700",
    "Half Day": "bg-orange-100 text-orange-700",
    Holiday: "bg-purple-100 text-purple-700",
    Verified: "bg-emerald-100 text-emerald-700",
    Submitted: "bg-blue-100 text-blue-700",
    "In Review": "bg-amber-100 text-amber-700",
    Clearance: "bg-orange-100 text-orange-700",
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-gray-100 text-gray-600",
  };
  return map[status] ?? "bg-gray-100 text-gray-600";
}
