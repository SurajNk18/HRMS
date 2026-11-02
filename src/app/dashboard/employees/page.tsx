'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Users2,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  Building,
  UserCheck,
  Calendar,
  Grid,
  List,
  Eye,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react'
import { employees as initialEmployees, Employee } from '@/lib/data'
import { formatDate, statusColor, formatCurrency } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export default function EmployeesPage() {
  const [employeeList, setEmployeeList] = useState<Employee[]>(initialEmployees)
  const [searchTerm, setSearchTerm] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [isAddOpen, setIsAddOpen] = useState(false)

  // New employee form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dept, setDept] = useState('Electrical')
  const [designation, setDesignation] = useState('Engineer')
  const [salary, setSalary] = useState('45000')

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    const newEmp: Employee = {
      id: String(employeeList.length + 1),
      empId: `IEL00${employeeList.length + 1}`,
      name,
      email,
      phone: phone || '9876500000',
      department: dept,
      designation,
      reportingManager: 'Suresh Patil',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      salary: Number(salary) || 40000,
      address: 'Satara, Maharashtra',
      dob: '1995-01-01',
      gender: 'Male',
      bloodGroup: 'B+',
      skills: ['Operations', 'Safety'],
      documents: ['Aadhar', 'PAN'],
    }
    setEmployeeList([newEmp, ...employeeList])
    setIsAddOpen(false)
    setName('')
    setEmail('')
    setPhone('')
  }

  const filtered = employeeList.filter((emp) => {
    const matchSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDept = deptFilter === 'All' || emp.department === deptFilter
    return matchSearch && matchDept
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <Users2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              6. Employee Management Directory
            </h2>
            <p className="text-xs text-gray-500">
              Comprehensive personnel records, designations, department allocation, and lifecycle history
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-emerald-800' : 'text-gray-500'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white shadow-xs text-emerald-800' : 'text-gray-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base font-bold">Add New Employee</DialogTitle>
                <DialogDescription className="text-xs">
                  Create master profile record for an inducted team member.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEmployee} className="space-y-3 py-2 text-xs">
                <div>
                  <Label className="text-xs">Full Name</Label>
                  <Input
                    placeholder="e.g. Ramesh Kulkarni"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="text-xs mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Work Email</Label>
                    <Input
                      type="email"
                      placeholder="ramesh@isolative.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-xs mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Phone Number</Label>
                    <Input
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Department</Label>
                    <select
                      className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                      value={dept}
                      onChange={(e) => setDept(e.target.value)}
                    >
                      <option>Electrical</option>
                      <option>Operations</option>
                      <option>HR</option>
                      <option>Finance</option>
                      <option>Admin</option>
                      <option>IT</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Designation</Label>
                    <Input
                      placeholder="e.g. Project Engineer"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="text-xs mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Monthly Gross Salary (₹)</Label>
                  <Input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                    Save Record
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <Input
                placeholder="Search by name, ID (e.g. IEL001), designation..."
                className="pl-9 text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {['All', 'Electrical', 'HR', 'Finance', 'Operations', 'IT'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDeptFilter(d)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    deptFilter === d
                      ? 'bg-[#1B4332] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((emp) => (
            <Card
              key={emp.id}
              className="border-gray-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#1B4332] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                    {emp.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(emp.status)}`}>
                    {emp.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug">{emp.name}</h3>
                  <p className="text-xs font-semibold text-emerald-800">{emp.designation}</p>
                  <p className="text-[11px] text-gray-400">{emp.department} • {emp.empId}</p>
                </div>

                <div className="space-y-1 text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-[11px] truncate">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>+91 {emp.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>Joined {formatDate(emp.joinDate)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button asChild size="sm" variant="outline" className="w-full text-xs h-8 border-emerald-300 text-emerald-800 hover:bg-emerald-50">
                    <Link href={`/dashboard/employees/${emp.id}`}>
                      View Complete Profile &rarr;
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="border-gray-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-semibold">
                  <tr>
                    <th className="p-3">Employee</th>
                    <th className="p-3">ID</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Designation</th>
                    <th className="p-3">Manager</th>
                    <th className="p-3">Joining Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-900 text-white font-bold flex items-center justify-center text-xs">
                            {emp.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{emp.name}</p>
                            <p className="text-[10px] text-gray-400">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 font-mono font-semibold text-gray-700">{emp.empId}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          {emp.department}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-800">{emp.designation}</td>
                      <td className="p-3 text-gray-500">{emp.reportingManager}</td>
                      <td className="p-3 text-gray-500">{formatDate(emp.joinDate)}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(emp.status)}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <Button asChild size="sm" variant="ghost" className="h-7 text-xs text-emerald-800">
                          <Link href={`/dashboard/employees/${emp.id}`}>
                            Profile &rarr;
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

