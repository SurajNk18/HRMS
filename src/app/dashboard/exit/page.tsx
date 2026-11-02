'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  LogOut,
  CheckCircle2,
  Clock,
  FileCheck,
  Building,
  AlertCircle,
  FileText,
  UserX,
  Download,
  Plus,
} from 'lucide-react'
import { exitRecords as initialExits, ExitRecord } from '@/lib/data'
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

export default function ExitManagementPage() {
  const [exits, setExits] = useState<ExitRecord[]>(initialExits)
  const [isOpen, setIsOpen] = useState(false)
  const [empName, setEmpName] = useState('Vikas Mehta')
  const [reason, setReason] = useState('')
  const [lwd, setLwd] = useState('2026-12-15')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newExit: ExitRecord = {
      id: `E00${exits.length + 1}`,
      empId: 'IEL005',
      empName,
      department: 'Electrical',
      designation: 'Junior Engineer',
      resignationDate: new Date().toISOString().split('T')[0],
      lastWorkingDay: lwd,
      reason: reason || 'Higher studies',
      status: 'In Review',
      noticePeriod: 30,
      feedback: '',
    }
    setExits([newExit, ...exits])
    setIsOpen(false)
  }

  const exitSteps = [
    { num: '1', title: 'Resignation Submitted', desc: 'Notice logged', done: true },
    { num: '2', title: 'Manager Approval', desc: 'Retention discussion', done: true },
    { num: '3', title: 'Handover & Knowledge Transfer', desc: 'Asset & project audit', done: true },
    { num: '4', title: 'Department Clearances', desc: 'IT, Finance & Store', done: false },
    { num: '5', title: 'Final Settlement (F&F)', desc: 'Gratuity & Leave encashment', done: false },
    { num: '6', title: 'Relieving & Experience Letter', desc: 'Issued to employee', done: false },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-rose-100 text-rose-800">
            <LogOut className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              13. Exit Management & Offboarding
            </h2>
            <p className="text-xs text-gray-500">
              Smooth, compliant separation, asset retrieval, No Objection Certificates, and Full & Final settlements
            </p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
              <Plus className="w-4 h-4 mr-1.5" />
              Initiate Separation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Initiate Employee Separation</DialogTitle>
              <DialogDescription className="text-xs">
                Log formal resignation or retirement to start clearance workflow.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3 py-2 text-xs">
              <div>
                <Label className="text-xs">Employee</Label>
                <select
                  className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                >
                  <option>Vikas Mehta (Junior Engineer)</option>
                  <option>Kavita Rao (Admin Officer)</option>
                  <option>Amit Desai (Finance Analyst)</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Proposed Last Working Day</Label>
                <Input
                  type="date"
                  value={lwd}
                  onChange={(e) => setLwd(e.target.value)}
                  className="text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Reason for Resignation</Label>
                <Textarea
                  placeholder="Career move, relocation, health, etc..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  rows={2}
                  className="text-xs mt-1"
                />
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                  Begin Offboarding
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Exit Milestones Tracker (Direct Match from Mockup) */}
      <Card className="border-gray-200 shadow-xs">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-bold text-gray-700 uppercase tracking-wider">
            Standard 6-Phase Offboarding Workflow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {exitSteps.map((st) => (
              <div
                key={st.num}
                className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                  st.done
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                    : 'bg-slate-50 border-gray-200 text-gray-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[11px]">Phase {st.num}</span>
                  {st.done ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
                <p className="font-bold text-xs leading-snug">{st.title}</p>
                <p className="text-[10px] text-gray-400 mt-1">{st.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exit Roster Table */}
      <Card className="border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-gray-900">
            Current Separation Cases ({exits.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Resignation Date</th>
                  <th className="p-3">Last Working Day</th>
                  <th className="p-3">Notice Period</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {exits.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-gray-900">{ex.empName}</p>
                      <p className="text-[10px] text-gray-400">{ex.empId} • {ex.designation}</p>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                        {ex.department}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{formatDate(ex.resignationDate)}</td>
                    <td className="p-3 font-semibold text-rose-800">{formatDate(ex.lastWorkingDay)}</td>
                    <td className="p-3 font-mono">{ex.noticePeriod} days</td>
                    <td className="p-3 text-gray-600 max-w-xs truncate">{ex.reason}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(ex.status)}`}>
                        {ex.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {ex.status === 'Completed' ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs text-emerald-800"
                          onClick={() => alert(`Downloading Relieving Letter for ${ex.empName}...`)}
                        >
                          <Download className="w-3.5 h-3.5 mr-1" />
                          Relieving Letter
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-blue-800 border-blue-200"
                          onClick={() => alert(`Updating clearances for ${ex.empName}...`)}
                        >
                          Clearance Checklist
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

