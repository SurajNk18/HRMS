import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  IndianRupee,
  FileText,
  Clock,
  ShieldCheck,
  CheckCircle,
  Download,
  Award,
} from 'lucide-react'
import { employees, documents, leaveRequests, payrollRecords } from '@/lib/data'
import { formatCurrency, formatDate, statusColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function generateStaticParams() {
  return employees.map((e) => ({ id: e.id }));
}

export default async function EmployeeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const emp = employees.find((e) => e.id === id) || employees[0]

  if (!emp) {
    notFound()
  }

  const empDocs = documents.filter((d) => d.empId === emp.empId)
  const empLeaves = leaveRequests.filter((l) => l.empId === emp.empId)
  const empPayroll = payrollRecords.filter((p) => p.empId === emp.empId)

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="text-xs">
          <Link href="/dashboard/employees">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Employee Directory
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            Edit Details
          </Button>
          <Button asChild size="sm" className="bg-[#1B4332] text-xs">
            <Link href="/dashboard/payroll">
              Generate Payslip
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Profile Card */}
      <Card className="border-gray-200 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332]" />
        <CardContent className="relative px-6 pb-6 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-12 gap-4">
            <div className="flex items-end gap-4">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-md">
                <div className="w-full h-full rounded-xl bg-emerald-950 text-white font-extrabold text-2xl flex items-center justify-center">
                  {emp.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">{emp.name}</h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor(emp.status)}`}>
                    {emp.status}
                  </span>
                </div>
                <p className="text-sm font-semibold text-emerald-800">{emp.designation}</p>
                <p className="text-xs text-gray-500">
                  {emp.department} Department • Employee ID:{' '}
                  <span className="font-mono font-bold text-gray-800">{emp.empId}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-gray-600 sm:text-right">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-gray-400 block">Reporting Manager</span>
                <span className="font-semibold text-gray-800">{emp.reportingManager}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] text-gray-400 block">Joined Isolative</span>
                <span className="font-semibold text-gray-800">{formatDate(emp.joinDate)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Layout */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="personal" className="text-xs">Personal Info</TabsTrigger>
          <TabsTrigger value="employment" className="text-xs">Employment & Salary</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs">Documents ({empDocs.length})</TabsTrigger>
          <TabsTrigger value="leave" className="text-xs">Leave Balance</TabsTrigger>
          <TabsTrigger value="payroll" className="text-xs">Payslips</TabsTrigger>
        </TabsList>

        {/* 1. Personal Info */}
        <TabsContent value="personal" className="mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-gray-900">Personal & Contact Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border">
                  <p className="font-bold text-gray-800 text-xs uppercase tracking-wider">Contact Details</p>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Official Email:</span>
                    <span className="font-semibold">{emp.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Mobile Phone:</span>
                    <span className="font-semibold">+91 {emp.phone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Residential City:</span>
                    <span className="font-semibold">{emp.address}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Work Location:</span>
                    <span className="font-semibold">Khandala Plant 1, Satara</span>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border">
                  <p className="font-bold text-gray-800 text-xs uppercase tracking-wider">Demographics & Health</p>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Date of Birth:</span>
                    <span className="font-semibold">{formatDate(emp.dob)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Gender:</span>
                    <span className="font-semibold">{emp.gender}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Blood Group:</span>
                    <span className="font-semibold text-rose-600">{emp.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Emergency Contact:</span>
                    <span className="font-semibold">Family (+91 9422000000)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. Employment & Salary */}
        <TabsContent value="employment" className="mt-4">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-gray-900">Employment Terms & Compensation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-3 p-4 bg-slate-50 rounded-xl border">
                  <p className="font-bold text-gray-800 uppercase tracking-wider">Organizational Details</p>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Employee ID:</span>
                    <span className="font-mono font-bold text-emerald-800">{emp.empId}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-semibold">{emp.department}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b">
                    <span className="text-gray-500">Designation:</span>
                    <span className="font-semibold">{emp.designation}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Reporting Officer:</span>
                    <span className="font-semibold">{emp.reportingManager}</span>
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                  <p className="font-bold text-emerald-900 uppercase tracking-wider">Monthly Compensation</p>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-gray-600">Basic Pay:</span>
                    <span className="font-mono font-semibold">{formatCurrency(emp.salary * 0.6)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-gray-600">House Rent Allowance:</span>
                    <span className="font-mono font-semibold">{formatCurrency(emp.salary * 0.24)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-emerald-100">
                    <span className="text-gray-600">Special Allowances:</span>
                    <span className="font-mono font-semibold">{formatCurrency(emp.salary * 0.16)}</span>
                  </div>
                  <div className="flex justify-between py-1 font-bold text-emerald-950 text-sm">
                    <span>Gross Monthly Salary:</span>
                    <span className="font-mono">{formatCurrency(emp.salary)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Documents */}
        <TabsContent value="documents" className="mt-4">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-gray-900">Verified Personnel Documents</CardTitle>
              <Button asChild size="sm" variant="outline" className="text-xs">
                <Link href="/dashboard/documents">
                  Open Document Vault
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {empDocs.length > 0 ? (
                empDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border text-xs bg-slate-50">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <div>
                        <p className="font-bold text-gray-900">{doc.name}</p>
                        <p className="text-[10px] text-gray-400">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <Button size="sm" variant="ghost" className="h-7 text-xs">
                        <Download className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-gray-400">
                  Standard KYC verification files archived in secure HR vault.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Leave Balance */}
        <TabsContent value="leave" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="p-4 text-center space-y-1">
                <p className="text-xs font-semibold text-gray-500">Casual Leave (CL)</p>
                <p className="text-3xl font-extrabold text-emerald-800">7 / 12</p>
                <p className="text-[11px] text-gray-400">5 days utilized</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4 text-center space-y-1">
                <p className="text-xs font-semibold text-gray-500">Sick Leave (SL)</p>
                <p className="text-3xl font-extrabold text-blue-800">9 / 12</p>
                <p className="text-[11px] text-gray-400">3 days utilized</p>
              </CardContent>
            </Card>
            <Card className="border-gray-200">
              <CardContent className="p-4 text-center space-y-1">
                <p className="text-xs font-semibold text-gray-500">Earned Leave (EL)</p>
                <p className="text-3xl font-extrabold text-amber-800">7 / 15</p>
                <p className="text-[11px] text-gray-400">8 days utilized</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 5. Payslips */}
        <TabsContent value="payroll" className="mt-4">
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold text-gray-900">Historical Salary Disbursals</CardTitle>
              <Button asChild size="sm" className="bg-[#1B4332] text-xs">
                <Link href="/dashboard/payroll">
                  Open Payroll Center
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-100 text-xs">
                {empPayroll.length > 0 ? (
                  empPayroll.map((pay) => (
                    <div key={pay.id} className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{pay.month} {pay.year}</p>
                        <p className="text-[11px] text-gray-500">
                          Gross: {formatCurrency(pay.grossSalary)} | Deductions: {formatCurrency(pay.totalDeductions)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-emerald-800 text-sm">
                          Net: {formatCurrency(pay.netSalary)}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${statusColor(pay.status)}`}>
                          {pay.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-gray-400 text-xs">
                    Current month payslip in process.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

