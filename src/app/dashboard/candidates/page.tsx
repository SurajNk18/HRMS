'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ArrowRight,
} from 'lucide-react'
import { candidates as initialCandidates, Candidate } from '@/lib/data'
import { formatDate, statusColor } from '@/lib/utils'
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

export default function CandidatesPage() {
  const [candidateList, setCandidateList] = useState<Candidate[]>(initialCandidates)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [interviewDate, setInterviewDate] = useState('2026-11-06')
  const [interviewTime, setInterviewTime] = useState('11:00')
  const [interviewer, setInterviewer] = useState('Suresh Patil (GM)')

  const filtered = candidateList.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchStatus = statusFilter === 'All' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = (id: string, newStatus: Candidate['status']) => {
    setCandidateList(
      candidateList.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    )
  }

  const handleScheduleInterview = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCandidate) {
      updateStatus(selectedCandidate.id, 'Interview')
      alert(`Interview successfully scheduled with ${selectedCandidate.name} for ${interviewDate} at ${interviewTime} with ${interviewer}`)
      setIsScheduleOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              2. Candidate Tracking & Pipeline
            </h2>
            <p className="text-xs text-gray-500">
              Screen profiles, schedule interviews, and transition top candidates to offer stage
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="text-xs">
            <Link href="/dashboard/recruitment">
              &larr; Back to Openings
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
            <Link href="/dashboard/offers">
              Create Offer Letter &rarr;
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <Input
                placeholder="Search candidate name, role, skill..."
                className="pl-9 text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {['All', 'Applied', 'Screening', 'Interview', 'Selected', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="p-3">Candidate Profile</th>
                  <th className="p-3">Position Applied</th>
                  <th className="p-3">Contact Details</th>
                  <th className="p-3">Experience & Skills</th>
                  <th className="p-3">Applied On</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{c.name}</p>
                          <p className="text-[10px] text-gray-400">ID: {c.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-emerald-800">{c.jobTitle}</p>
                      <p className="text-[10px] text-gray-400">Req: {c.jobId}</p>
                    </td>
                    <td className="p-3">
                      <div className="space-y-0.5 text-[11px] text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{c.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>+91 {c.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-gray-700">{c.experience}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {c.skills.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 text-slate-600">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-gray-500">
                      {formatDate(c.appliedDate)}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${statusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs text-blue-700 hover:bg-blue-50"
                          onClick={() => {
                            setSelectedCandidate(c)
                            setIsScheduleOpen(true)
                          }}
                        >
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          Schedule
                        </Button>

                        {c.status !== 'Selected' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-emerald-700 hover:bg-emerald-50"
                            onClick={() => updateStatus(c.id, 'Selected')}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Select
                          </Button>
                        )}

                        {c.status === 'Selected' && (
                          <Button
                            asChild
                            size="sm"
                            className="h-7 px-2.5 text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold"
                          >
                            <Link href="/dashboard/offers">
                              Issue Offer
                            </Link>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Interview Dialog */}
      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              Schedule Technical Interview
            </DialogTitle>
            <DialogDescription className="text-xs">
              Candidate: <span className="font-semibold text-gray-800">{selectedCandidate?.name}</span> ({selectedCandidate?.jobTitle})
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleInterview} className="space-y-3 py-2 text-xs">
            <div>
              <Label className="text-xs">Interview Date</Label>
              <Input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="text-xs mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs">Time Slot</Label>
              <Input
                type="time"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className="text-xs mt-1"
                required
              />
            </div>
            <div>
              <Label className="text-xs">Interviewer / Panel</Label>
              <select
                className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
              >
                <option>Suresh Patil (General Manager)</option>
                <option>Rajesh Kumar (Senior Electrical Engineer)</option>
                <option>Priya Sharma (HR Manager)</option>
              </select>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-[11px] text-emerald-800">
              An automated calendar invite and Google Meet/Plant Visit details will be dispatched to {selectedCandidate?.email}.
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsScheduleOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

