'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  LogIn,
  LogOut,
  MapPin,
  Fingerprint,
  FileEdit,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { attendanceRecords as initialRecords, AttendanceRecord } from '@/lib/data'
import { statusColor } from '@/lib/utils'
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

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords)
  const [punchedIn, setPunchedIn] = useState(true)
  const [punchTime, setPunchTime] = useState('08:45 AM')
  const [isCorrectionOpen, setIsCorrectionOpen] = useState(false)

  // Quick punch simulation
  const handleTogglePunch = () => {
    if (punchedIn) {
      setPunchedIn(false)
      alert('Punched OUT successfully at ' + new Date().toLocaleTimeString())
    } else {
      setPunchedIn(true)
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setPunchTime(now)
      alert('Punched IN successfully at ' + now)
    }
  }

  const markPresent = (id: string) => {
    setRecords(
      records.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'Present',
              checkIn: '09:00',
              checkOut: '18:00',
              hours: 9.0,
            }
          : r
      )
    )
  }

  // Generate calendar days for November 2026
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1
    const dayOfWeek = (day + 6) % 7 // Nov 1 2026 was Sunday
    let status = 'present'
    if (dayOfWeek === 0 || dayOfWeek === 6) status = 'weekend'
    else if (day === 4 || day === 18) status = 'absent'
    else if (day === 2 || day === 11) status = 'late'
    else if (day > 2) status = 'upcoming'

    return { day, status }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              7. Attendance Management & Biometric Shifts
            </h2>
            <p className="text-xs text-gray-500">
              Track work hours, real-time biometric logs, late marks and overtime for Plant 1
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Dialog open={isCorrectionOpen} onOpenChange={setIsCorrectionOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="text-xs">
                <FileEdit className="w-3.5 h-3.5 mr-1.5" />
                Correction Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base font-bold">Request Attendance Correction</DialogTitle>
                <DialogDescription className="text-xs">
                  Submit a missing biometric punch correction for supervisor approval.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 py-2 text-xs">
                <div>
                  <Label className="text-xs">Employee</Label>
                  <Input value="Suresh Patil (GM)" disabled className="text-xs mt-1 bg-slate-50" />
                </div>
                <div>
                  <Label className="text-xs">Date of Missing Punch</Label>
                  <Input type="date" defaultValue="2026-11-01" className="text-xs mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Check In Time</Label>
                    <Input type="time" defaultValue="09:00" className="text-xs mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs">Check Out Time</Label>
                    <Input type="time" defaultValue="18:00" className="text-xs mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Reason for Missing Punch</Label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Biometric device scanner timeout, on-field client visit..."
                    className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs"
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsCorrectionOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className="bg-[#1B4332] text-xs"
                    onClick={() => {
                      alert('Correction request submitted to HR!')
                      setIsCorrectionOpen(false)
                    }}
                  >
                    Submit Request
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            size="sm"
            onClick={handleTogglePunch}
            className={`text-xs ${
              punchedIn
                ? 'bg-rose-700 hover:bg-rose-800 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white'
            }`}
          >
            {punchedIn ? (
              <>
                <LogOut className="w-4 h-4 mr-1.5" />
                Punch OUT
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-1.5" />
                Punch IN
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Top Punch Status Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl">
            <Fingerprint className="w-8 h-8 text-emerald-300" />
          </div>
          <div>
            <p className="text-xs text-emerald-200 font-medium">Logged in as Suresh Patil (IEL007)</p>
            <h3 className="text-lg font-bold">
              Status: {punchedIn ? 'Currently Clocked IN' : 'Clocked OUT'}
            </h3>
            <p className="text-xs text-emerald-100">
              {punchedIn ? `Punched in at ${punchTime} via Gate 1 Biometric` : 'Not punched in today'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="text-right">
            <span className="text-emerald-300 text-[10px] block">Today&apos;s Working Hours</span>
            <span className="font-mono text-base font-bold">09 hrs 15 mins</span>
          </div>
          <div className="h-8 w-px bg-white/20" />
          <div className="text-right">
            <span className="text-emerald-300 text-[10px] block">Current Shift</span>
            <span className="font-bold">General (09:00 - 18:00)</span>
          </div>
        </div>
      </div>

      {/* 2-Column: Today's Punch List + Monthly Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Full Roster */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-gray-900">
                  Today&apos;s Attendance Roster — 02 Nov 2026
                </CardTitle>
                <CardDescription className="text-xs">
                  Biometric logs from Plant Gate 1 and Office Main Door
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-800 border-emerald-300">
                8 Employees Total
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-semibold">
                    <tr>
                      <th className="p-3">Employee</th>
                      <th className="p-3">In Time</th>
                      <th className="p-3">Out Time</th>
                      <th className="p-3">Hours</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {records.map((r) => (
                      <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <p className="font-bold text-gray-900">{r.empName}</p>
                          <p className="text-[10px] text-gray-400">{r.empId}</p>
                        </td>
                        <td className="p-3 font-mono">
                          {r.checkIn ? (
                            <span className="text-emerald-800 font-semibold">{r.checkIn}</span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="p-3 font-mono">
                          {r.checkOut ? (
                            <span className="text-slate-700">{r.checkOut}</span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="p-3 font-mono">
                          {r.hours > 0 ? `${r.hours.toFixed(1)} hrs` : '0.0'}
                        </td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(r.status)}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          {r.status === 'Absent' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 text-[10px] text-emerald-800 border-emerald-300"
                              onClick={() => markPresent(r.id)}
                            >
                              Mark Present
                            </Button>
                          ) : (
                            <span className="text-gray-400 text-[10px]">Verified</span>
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

        {/* Right 1 Col: Monthly Attendance Calendar Matrix */}
        <div className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-gray-900">
                  November 2026 Calendar
                </CardTitle>
                <span className="text-xs text-gray-500 font-medium">Plant 1</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 mb-1">
                <span>Su</span>
                <span>Mo</span>
                <span>Tu</span>
                <span>We</span>
                <span>Th</span>
                <span>Fr</span>
                <span>Sa</span>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {calendarDays.map((cd) => (
                  <div
                    key={cd.day}
                    className={`h-8 rounded-lg flex flex-col items-center justify-center font-semibold text-[11px] transition-all ${
                      cd.day === 2
                        ? 'border-2 border-emerald-600 font-extrabold text-emerald-950 bg-emerald-100'
                        : cd.status === 'present'
                        ? 'bg-emerald-50 text-emerald-800'
                        : cd.status === 'late'
                        ? 'bg-amber-100 text-amber-900'
                        : cd.status === 'absent'
                        ? 'bg-rose-100 text-rose-800'
                        : cd.status === 'weekend'
                        ? 'bg-slate-100 text-slate-400 font-normal'
                        : 'text-gray-400'
                    }`}
                  >
                    <span>{cd.day}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-gray-100 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    Present Days
                  </span>
                  <span className="font-bold text-gray-800">18 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Late Arrivals
                  </span>
                  <span className="font-bold text-gray-800">2 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Absent / Leaves
                  </span>
                  <span className="font-bold text-gray-800">2 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

