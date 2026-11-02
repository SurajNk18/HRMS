'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  AlertCircle,
  FileText,
  User,
} from 'lucide-react'
import { leaveRequests as initialLeaveRequests, LeaveRequest } from '@/lib/data'
import { formatDate, statusColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LeavePage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialLeaveRequests)
  const [isApplyOpen, setIsApplyOpen] = useState(false)

  // Leave Form State
  const [leaveEmp, setLeaveEmp] = useState('Rajesh Kumar')
  const [leaveType, setLeaveType] = useState<LeaveRequest['type']>('Casual')
  const [fromDate, setFromDate] = useState('2026-11-10')
  const [toDate, setToDate] = useState('2026-11-11')
  const [reason, setReason] = useState('')

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fromDate || !toDate) return
    const newReq: LeaveRequest = {
      id: `L00${requests.length + 1}`,
      empId: 'IEL001',
      empName: leaveEmp,
      department: 'Electrical',
      type: leaveType,
      from: fromDate,
      to: toDate,
      days: 2,
      reason: reason || 'Personal exigency',
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    }
    setRequests([newReq, ...requests])
    setIsApplyOpen(false)
    setReason('')
  }

  const updateRequestStatus = (id: string, newStatus: LeaveRequest['status']) => {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    )
  }

  const holidays = [
    { date: '2026-11-01', name: 'Diwali (Laxmi Pujan)', day: 'Sunday' },
    { date: '2026-11-02', name: 'Diwali (Balipratipada)', day: 'Monday' },
    { date: '2026-11-03', name: 'Bhaubeej', day: 'Tuesday' },
    { date: '2026-12-25', name: 'Christmas', day: 'Friday' },
    { date: '2027-01-26', name: 'Republic Day', day: 'Tuesday' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              8. Leave Management & Approval Portal
            </h2>
            <p className="text-xs text-gray-500">
              Simplified leave requests, entitlement balance tracking, and manager approvals
            </p>
          </div>
        </div>

        <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
              <Plus className="w-4 h-4 mr-1.5" />
              Apply for Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Apply for Leave</DialogTitle>
              <DialogDescription className="text-xs">
                Submit a leave request for departmental and HR manager approval.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleApplyLeave} className="space-y-3 py-2 text-xs">
              <div>
                <Label className="text-xs">Applicant Employee</Label>
                <select
                  className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                  value={leaveEmp}
                  onChange={(e) => setLeaveEmp(e.target.value)}
                >
                  <option>Rajesh Kumar (Senior Engineer)</option>
                  <option>Priya Sharma (HR Manager)</option>
                  <option>Amit Desai (Finance Analyst)</option>
                  <option>Vikas Mehta (Junior Engineer)</option>
                  <option>Meera Joshi (Software Developer)</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Leave Category</Label>
                <select
                  className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as LeaveRequest['type'])}
                >
                  <option>Casual</option>
                  <option>Sick</option>
                  <option>Earned</option>
                  <option>Maternity</option>
                  <option>Paternity</option>
                  <option>LOP</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">From Date</Label>
                  <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">To Date</Label>
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                    className="text-xs mt-1"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">Reason for Leave</Label>
                <Textarea
                  placeholder="State the reason clearly..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  rows={2}
                  className="text-xs mt-1"
                />
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsApplyOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                  Submit Application
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leave Entitlement Cards (From Mockup Image 1 & 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Casual Leave (CL)</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7 / 12</p>
              <p className="text-[11px] text-emerald-700">5 days consumed this FY</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
              58%
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Sick Leave (SL)</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">9 / 12</p>
              <p className="text-[11px] text-blue-700">3 days consumed this FY</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
              75%
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Earned / Privilege Leave</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7 / 15</p>
              <p className="text-[11px] text-amber-700">8 days consumed this FY</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
              47%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="requests" className="text-xs">
            Leave Applications ({requests.length})
          </TabsTrigger>
          <TabsTrigger value="holidays" className="text-xs">
            Official Holiday Calendar 2026-27
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Requests Table */}
        <TabsContent value="requests" className="mt-4">
          <Card className="border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-semibold">
                    <tr>
                      <th className="p-3">Applicant</th>
                      <th className="p-3">Leave Type</th>
                      <th className="p-3">Duration (Dates)</th>
                      <th className="p-3">Total Days</th>
                      <th className="p-3">Reason</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Approval Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {requests.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <p className="font-bold text-gray-900">{r.empName}</p>
                          <p className="text-[10px] text-gray-400">{r.department} • {r.empId}</p>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                            {r.type} Leave
                          </span>
                        </td>
                        <td className="p-3 text-gray-600">
                          {formatDate(r.from)} &rarr; {formatDate(r.to)}
                        </td>
                        <td className="p-3 font-semibold text-gray-800">
                          {r.days} {r.days === 1 ? 'day' : 'days'}
                        </td>
                        <td className="p-3 text-gray-600 max-w-xs truncate italic">
                          &ldquo;{r.reason}&rdquo;
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(r.status)}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {r.status === 'Pending' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                size="sm"
                                className="h-7 px-2 text-xs bg-emerald-700 hover:bg-emerald-800"
                                onClick={() => updateRequestStatus(r.id, 'Approved')}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2 text-xs text-rose-700 hover:bg-rose-50"
                                onClick={() => updateRequestStatus(r.id, 'Rejected')}
                              >
                                <XCircle className="w-3.5 h-3.5 mr-1" />
                                Reject
                              </Button>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-[10px]">Decision Recorded</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Holiday Calendar */}
        <TabsContent value="holidays" className="mt-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-900">
                Isolative Electricals Plant Holiday Calendar
              </CardTitle>
              <CardDescription className="text-xs">
                Mandatory paid holidays observed at Khandala and Satara manufacturing units
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-100 text-xs">
                {holidays.map((h, i) => (
                  <div key={i} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{h.name}</p>
                        <p className="text-[10px] text-gray-400">{h.day}</p>
                      </div>
                    </div>
                    <span className="font-mono text-gray-700 font-semibold">{formatDate(h.date)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

