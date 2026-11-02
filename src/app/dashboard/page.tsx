import Link from 'next/link'
import {
  Users2,
  UserCheck,
  CalendarOff,
  Briefcase,
  Clock,
  Banknote,
  ArrowRight,
  PlusCircle,
  FileText,
  CalendarDays,
  ShieldCheck,
  Bell,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import StatCard from '@/components/layout/StatCard'
import AttendanceChart from '@/components/charts/AttendanceChart'
import DeptPieChart from '@/components/charts/DeptPieChart'
import {
  dashboardStats,
  leaveRequests,
  announcements,
  jobOpenings,
  candidates,
} from '@/lib/data'
import { formatCurrency, formatDate, statusColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const lifecycleSteps = [
    { num: '1', label: 'Job Opening', desc: 'Sourcing & Needs', color: 'bg-emerald-600' },
    { num: '2', label: 'Application', desc: 'Portal Intake', color: 'bg-teal-600' },
    { num: '3', label: 'Screening', desc: 'Resume Shortlist', color: 'bg-cyan-600' },
    { num: '4', label: 'Interview', desc: 'Tech & HR Panel', color: 'bg-blue-600' },
    { num: '5', label: 'Selection', desc: 'Panel Approval', color: 'bg-indigo-600' },
    { num: '6', label: 'Offer Letter', desc: 'CTC & Terms', color: 'bg-amber-600' },
    { num: '7', label: 'Joining', desc: 'Document Check', color: 'bg-orange-600' },
    { num: '8', label: 'Onboarding', desc: 'ID & Induction', color: 'bg-emerald-700' },
    { num: '9', label: 'Active Emp', desc: 'Work & Growth', color: 'bg-emerald-800' },
    { num: '10', label: 'Exit / Alumni', desc: 'Handover & F&F', color: 'bg-slate-700' },
  ]

  return (
    <div className="space-y-6">
      {/* Top Welcome Bar */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <svg className="w-96 h-96" viewBox="0 0 200 200" fill="currentColor">
            <path d="M45,-75C58,-68,69,-56,77,-42C85,-28,90,-12,88,3C86,18,77,32,67,45C57,58,46,70,32,77C18,84,1,86,-16,84C-33,82,-50,76,-63,64C-76,52,-85,34,-87,16C-89,-2,-84,-20,-75,-35C-66,-50,-53,-62,-39,-70C-25,-78,-12,-82,2,-85C16,-88,32,-82,45,-75Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-medium text-emerald-100 mb-2 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Plant & Head Office Operations • Khandala</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good Morning, Suresh! 👋
            </h2>
            <p className="text-sm text-emerald-100/90 mt-1 max-w-xl">
              Here is your daily workforce overview for <span className="font-semibold text-white">Isolative Electricals Private Limited</span>. 
              Attendance is running at <span className="text-amber-300 font-bold">{dashboardStats.attendanceToday}%</span> today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold shadow-sm">
              <Link href="/dashboard/recruitment">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Post Job
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link href="/dashboard/payroll">
                <Banknote className="w-4 h-4 mr-1.5" />
                Process Payroll
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
              <Link href="/dashboard/reports">
                <FileText className="w-4 h-4 mr-1.5" />
                Monthly Reports
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Workforce"
          value={dashboardStats.totalEmployees}
          icon={<Users2 className="w-5 h-5" />}
          subtitle="All active plants"
          trend="+12%"
          color="bg-emerald-50 text-emerald-800"
        />
        <StatCard
          title="Present Today"
          value={dashboardStats.activeEmployees}
          icon={<UserCheck className="w-5 h-5" />}
          subtitle="Biometric logged"
          trend="+2"
          color="bg-blue-50 text-blue-700"
        />
        <StatCard
          title="On Leave"
          value={dashboardStats.onLeave}
          icon={<CalendarOff className="w-5 h-5" />}
          subtitle="Approved leaves"
          color="bg-amber-50 text-amber-700"
        />
        <StatCard
          title="Open Positions"
          value={dashboardStats.openPositions}
          icon={<Briefcase className="w-5 h-5" />}
          subtitle="Across 5 roles"
          trend="+3"
          color="bg-purple-50 text-purple-700"
        />
        <StatCard
          title="Pending Requests"
          value={dashboardStats.pendingLeaves}
          icon={<Clock className="w-5 h-5" />}
          subtitle="Needs HR review"
          color="bg-orange-50 text-orange-700"
        />
        <StatCard
          title="Oct Payroll"
          value={formatCurrency(dashboardStats.totalPayroll)}
          icon={<Banknote className="w-5 h-5" />}
          subtitle="4 records total"
          trend="Processed"
          color="bg-teal-50 text-teal-700"
        />
      </div>

      {/* The Complete Employee Lifecycle Flow (From Image 1 & 2) */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                The Complete Employee Lifecycle
              </CardTitle>
              <CardDescription className="text-xs">
                From Candidate to Exit — End-to-end human resource governance at Isolative Electricals
              </CardDescription>
            </div>
            <Link
              href="/dashboard/onboarding"
              className="text-xs text-emerald-700 hover:text-emerald-800 font-medium inline-flex items-center"
            >
              <span>Onboarding Hub</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {lifecycleSteps.map((step) => (
              <div
                key={step.num}
                className="group relative flex flex-col items-center text-center p-2.5 rounded-xl border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all"
              >
                <div
                  className={`w-7 h-7 rounded-full text-white font-bold text-xs flex items-center justify-center mb-1.5 shadow-sm ${step.color}`}
                >
                  {step.num}
                </div>
                <p className="text-xs font-semibold text-gray-800 leading-tight">
                  {step.label}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{step.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Row: Attendance Analytics + Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-gray-900">
                  Attendance & Shift Overview
                </CardTitle>
                <CardDescription className="text-xs">
                  Biometric punch logs across Plant 1 (Satara) for the last 7 working days
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm" className="text-xs h-8">
                <Link href="/dashboard/attendance">View Full Log</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <AttendanceChart />
          </CardContent>
        </Card>

        {/* Quick Shift & Biometric device status */}
        <Card className="border-gray-200 shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-gray-900 flex items-center justify-between">
              <span>Biometric Gateway</span>
              <span className="flex items-center gap-1.5 text-[11px] font-normal text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Connected
              </span>
            </CardTitle>
            <CardDescription className="text-xs">
              Device: eSSL K90 Pro • Plant Floor Gate 1
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Current Shift:</span>
                <span className="font-semibold text-gray-800">General (09:00 - 18:00)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">On-time checkins:</span>
                <span className="font-semibold text-emerald-700">6 employees (85%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Grace period late:</span>
                <span className="font-semibold text-amber-600">1 (Amit Desai - 09:45)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Sync Status:</span>
                <span className="font-semibold text-gray-700">Live (2s ago)</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-700">Today&apos;s Highlights</p>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  <span className="font-medium text-gray-800">Suresh Patil (GM)</span>
                </div>
                <span className="text-[11px] text-gray-500">In at 08:45 AM</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-emerald-50/60 border border-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  <span className="font-medium text-gray-800">Rajesh Kumar (Sr Eng)</span>
                </div>
                <span className="text-[11px] text-gray-500">In at 09:02 AM</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-amber-50/60 border border-amber-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-600"></div>
                  <span className="font-medium text-gray-800">Amit Desai (Finance)</span>
                </div>
                <span className="text-[11px] text-amber-700 font-medium">Late: 09:45 AM</span>
              </div>
            </div>

            <Button asChild className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-xs h-9">
              <Link href="/dashboard/attendance">
                Mark Attendance / Corrections
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Row: Department Distribution + Pending Leave Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-gray-900">
                  Workforce by Department
                </CardTitle>
                <CardDescription className="text-xs">
                  Active staff distribution across operations, engineering and corporate
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm" className="text-xs h-8">
                <Link href="/dashboard/employees">Directory</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DeptPieChart />
          </CardContent>
        </Card>

        {/* Leave Requests Table */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-gray-900">
                  Recent Leave Applications
                </CardTitle>
                <CardDescription className="text-xs">
                  Review requests awaiting manager and HR signoff
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm" className="text-xs h-8">
                <Link href="/dashboard/leave">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-100">
              {leaveRequests.slice(0, 4).map((req) => (
                <div key={req.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-gray-900">{req.empName}</p>
                    <p className="text-[11px] text-gray-500">
                      {req.type} Leave • {formatDate(req.from)} to {formatDate(req.to)} ({req.days}d)
                    </p>
                    <p className="text-[11px] text-gray-400 italic">&ldquo;{req.reason}&rdquo;</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(req.status)}`}>
                      {req.status}
                    </span>
                    {req.status === 'Pending' && (
                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-6 px-1.5 text-[10px] text-emerald-700 hover:bg-emerald-50">
                          Approve
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 px-1.5 text-[10px] text-red-700 hover:bg-red-50">
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row: Recruitment Highlights & Company Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recruitment Pipeline Widget */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-emerald-700" />
                  Hiring & Candidate Pipeline
                </CardTitle>
                <CardDescription className="text-xs">
                  Active recruitment rounds for engineering and plant operations
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm" className="text-xs h-8">
                <Link href="/dashboard/candidates">Manage Pipeline</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
                <p className="text-lg font-bold text-blue-900">28</p>
                <p className="text-[10px] text-blue-600 font-medium">Applied</p>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                <p className="text-lg font-bold text-purple-900">16</p>
                <p className="text-[10px] text-purple-600 font-medium">Screening</p>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-lg font-bold text-indigo-900">10</p>
                <p className="text-[10px] text-indigo-600 font-medium">Interview</p>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                <p className="text-lg font-bold text-emerald-900">4</p>
                <p className="text-[10px] text-emerald-600 font-medium">Selected</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-700">Urgent Open Positions</p>
              {jobOpenings.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{job.title}</p>
                    <p className="text-[11px] text-gray-500">
                      {job.department} • {job.location} • {job.openings} Openings
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Company Announcements */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-600" />
                  Latest Plant & Company Notices
                </CardTitle>
                <CardDescription className="text-xs">
                  Official announcements from Management and HR
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm" className="text-xs h-8">
                <Link href="/dashboard/announcements">Post Notice</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="p-3 rounded-xl border border-gray-100 bg-white hover:border-emerald-200 hover:shadow-xs transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusColor(ann.priority)}`}>
                    {ann.priority} Priority
                  </span>
                  <span className="text-[10px] text-gray-400">{formatDate(ann.postedOn)}</span>
                </div>
                <h4 className="text-xs font-bold text-gray-900">{ann.title}</h4>
                <p className="text-[11px] text-gray-600 line-clamp-2">{ann.content}</p>
                <p className="text-[10px] text-gray-400">Posted by: {ann.postedBy}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 15 Modules Quick Access Grid */}
      <Card className="border-gray-200 shadow-sm bg-gradient-to-b from-white to-slate-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-gray-900">
            All 15 HRMS Modules — Direct Access
          </CardTitle>
          <CardDescription className="text-xs">
            Complete human resource management tools configured for Isolative Electricals Private Limited
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {[
              { title: '1. Recruitment', href: '/dashboard/recruitment', desc: 'Job Openings & Sourcing' },
              { title: '2. Candidates', href: '/dashboard/candidates', desc: 'Pipeline & Resumes' },
              { title: '3. Offer Letters', href: '/dashboard/offers', desc: 'CTC & PDF Generation' },
              { title: '4. Onboarding', href: '/dashboard/onboarding', desc: 'Induction & Checklists' },
              { title: '5. Employees', href: '/dashboard/employees', desc: 'Profiles & Directory' },
              { title: '6. Documents', href: '/dashboard/documents', desc: 'KYC & Certificates' },
              { title: '7. Attendance', href: '/dashboard/attendance', desc: 'Biometric & Shifts' },
              { title: '8. Leave Management', href: '/dashboard/leave', desc: 'Approvals & Balances' },
              { title: '9. Payroll', href: '/dashboard/payroll', desc: 'Salary & Payslips' },
              { title: '10. Performance', href: '/dashboard/performance', desc: 'Reviews & Goals' },
              { title: '11. Training', href: '/dashboard/training', desc: 'Certifications & Skills' },
              { title: '12. Announcements', href: '/dashboard/announcements', desc: 'Plant & HR Notices' },
              { title: '13. Exit Management', href: '/dashboard/exit', desc: 'Resignations & Clearance' },
              { title: '14. Reports', href: '/dashboard/reports', desc: 'Analytics & Compliance' },
              { title: '15. Public Portal', href: '/', desc: 'Corporate Showcase' },
            ].map((mod, idx) => (
              <Link
                key={idx}
                href={mod.href}
                className="group p-3 rounded-xl border border-gray-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-gray-900 group-hover:text-emerald-800 transition-colors">
                    {mod.title}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">{mod.desc}</p>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-[10px] font-semibold text-emerald-700 group-hover:translate-x-1 inline-flex items-center transition-transform">
                    Open <ArrowRight className="w-2.5 h-2.5 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

