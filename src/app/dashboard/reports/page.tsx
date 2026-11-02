'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  Calendar,
  Users,
  Banknote,
  TrendingUp,
  Clock,
  Printer,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const payrollTrendData = [
  { month: 'Jun', amount: 245000 },
  { month: 'Jul', amount: 252000 },
  { month: 'Aug', amount: 260000 },
  { month: 'Sep', amount: 268000 },
  { month: 'Oct', amount: 279640 },
  { month: 'Nov (Est)', amount: 285000 },
]

const deptHeadcount = [
  { dept: 'Electrical', count: 3 },
  { dept: 'HR & Admin', count: 2 },
  { dept: 'Finance', count: 1 },
  { dept: 'Operations', count: 1 },
  { dept: 'IT', count: 1 },
]

const attendanceDonut = [
  { name: 'Present (85%)', value: 112, color: '#1B4332' },
  { name: 'On Leave (9%)', value: 8, color: '#F59E0B' },
  { name: 'Absent (6%)', value: 4, color: '#EF4444' },
]

export default function ReportsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              14. Reports & Workforce Analytics
            </h2>
            <p className="text-xs text-gray-500">
              Data-driven insights for executive decision making, factory compliance and labor statistics
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => alert('Exporting full HR audit report to Excel (.xlsx)...')}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-emerald-700" />
            Export to Excel
          </Button>
          <Button
            size="sm"
            className="bg-[#1B4332] text-xs"
            onClick={() => window.print()}
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            Print Analytics
          </Button>
        </div>
      </div>

      {/* Overview Stat Row (Matches Mockup numbers in Image 1: 124, 112, 8, 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Total Headcount</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">124</p>
            <p className="text-[10px] text-gray-400">Plants 1 & 2 + HQ</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Present Today</p>
            <p className="text-3xl font-extrabold text-emerald-800 mt-1">112</p>
            <p className="text-[10px] text-emerald-600 font-medium">90.3% Attendance</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">On Planned Leave</p>
            <p className="text-3xl font-extrabold text-amber-600 mt-1">8</p>
            <p className="text-[10px] text-amber-700 font-medium">Approved leaves</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Unplanned Absent</p>
            <p className="text-3xl font-extrabold text-rose-600 mt-1">4</p>
            <p className="text-[10px] text-rose-700 font-medium">Follow-up needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Trend */}
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-gray-900">
              Monthly Payroll Expenditure Trend (INR)
            </CardTitle>
            <CardDescription className="text-xs">
              Consecutive 6 months wage bill with statutory contributions
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={payrollTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Payroll Cost']} />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#1B4332"
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>

        {/* Attendance Donut & Headcount */}
        <Card className="border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-gray-900">
              Daily Workforce Presence Distribution
            </CardTitle>
            <CardDescription className="text-xs">
              Live ratio of Present, Approved Leaves, and Absenteeism
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceDonut}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {attendanceDonut.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {/* Downloadable Standard Compliance Reports List */}
      <Card className="border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-gray-900">
            Exportable Statutory & Compliance Statements
          </CardTitle>
          <CardDescription className="text-xs">
            Download standard formats for government audits and internal management review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {[
              { title: 'Form 16 & Tax Deduction Statement', type: 'Tax & TDS', size: 'PDF (2.4 MB)' },
              { title: 'Monthly PF ECR Electronic Filing File', type: 'EPFO Compliance', size: 'TXT (180 KB)' },
              { title: 'ESIC Contribution Statement', type: 'ESIC', size: 'XLSX (450 KB)' },
              { title: 'Muster Roll & Shift Register (Form II)', type: 'Labor Laws', size: 'PDF (3.1 MB)' },
              { title: 'Equal Remuneration & Gender Ratio', type: 'Governance', size: 'PDF (1.2 MB)' },
              { title: 'Annual Safety & Hazard Incident Log', type: 'Factory Inspector', size: 'PDF (890 KB)' },
            ].map((rep, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-gray-200 bg-slate-50/50 hover:bg-white hover:border-emerald-400 transition-all flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-gray-900 leading-snug">{rep.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{rep.type} • {rep.size}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-emerald-800"
                  onClick={() => alert(`Generating ${rep.title}...`)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

