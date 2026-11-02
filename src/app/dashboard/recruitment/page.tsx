'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Plus,
  Users,
  Search,
  CheckCircle,
  Clock,
  MapPin,
  Filter,
  Eye,
  FileCheck,
  ChevronRight,
} from 'lucide-react'
import { jobOpenings, candidates } from '@/lib/data'
import { formatDate, statusColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

export default function RecruitmentPage() {
  const [jobs, setJobs] = useState(jobOpenings)
  const [isNewJobOpen, setIsNewJobOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newDept, setNewDept] = useState('Electrical')
  const [newLoc, setNewLoc] = useState('Khandala, Satara')
  const [newOpenings, setNewOpenings] = useState('2')
  const [newDesc, setNewDesc] = useState('')

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle) return
    const newJob = {
      id: `J00${jobs.length + 1}`,
      title: newTitle,
      department: newDept,
      location: newLoc,
      type: 'Full-Time' as const,
      openings: parseInt(newOpenings) || 1,
      status: 'Open' as const,
      postedDate: new Date().toISOString().split('T')[0],
      deadline: '2026-12-31',
      description: newDesc || 'Engineering role at Khandala plant.',
    }
    setJobs([newJob, ...jobs])
    setIsNewJobOpen(false)
    setNewTitle('')
    setNewDesc('')
  }

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const pipelineStages = [
    { key: 'Applied', title: 'Applied', color: 'border-blue-500 bg-blue-50/50' },
    { key: 'Screening', title: 'Screening', color: 'border-purple-500 bg-purple-50/50' },
    { key: 'Interview', title: 'Interview Round', color: 'border-indigo-500 bg-indigo-50/50' },
    { key: 'Selected', title: 'Selected & Offered', color: 'border-emerald-500 bg-emerald-50/50' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                1. Recruitment & Hiring Management
              </h2>
              <p className="text-xs text-gray-500">
                Find, evaluate and hire the best technical and operations talent
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button asChild variant="outline" size="sm" className="text-xs">
            <Link href="/dashboard/candidates">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              View Candidate Pool ({candidates.length})
            </Link>
          </Button>

          <Dialog open={isNewJobOpen} onOpenChange={setIsNewJobOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
                <Plus className="w-4 h-4 mr-1.5" />
                Create Job Opening
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base font-bold">Post New Job Opening</DialogTitle>
                <DialogDescription className="text-xs">
                  Create a new vacancy for the Khandala or Satara unit.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddJob} className="space-y-3 py-2 text-xs">
                <div>
                  <Label className="text-xs">Job Title</Label>
                  <Input
                    placeholder="e.g. Senior Switchgear Engineer"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="text-xs mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Department</Label>
                    <select
                      className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                    >
                      <option>Electrical</option>
                      <option>Operations</option>
                      <option>Finance</option>
                      <option>HR</option>
                      <option>Sales</option>
                      <option>IT</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs">Openings</Label>
                    <Input
                      type="number"
                      value={newOpenings}
                      onChange={(e) => setNewOpenings(e.target.value)}
                      min="1"
                      className="text-xs mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Location</Label>
                  <Input
                    value={newLoc}
                    onChange={(e) => setNewLoc(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Job Description & Responsibilities</Label>
                  <Textarea
                    placeholder="Key responsibilities, skills, qualifications..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={3}
                    className="text-xs mt-1"
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsNewJobOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                    Publish Opening
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-3.5">
            <p className="text-[11px] font-medium text-gray-500 uppercase">Active Positions</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{jobs.filter(j => j.status === 'Open').length}</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Across all plants</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-3.5">
            <p className="text-[11px] font-medium text-gray-500 uppercase">Total Vacancies</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{jobs.reduce((acc, j) => acc + j.openings, 0)}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Approved headcounts</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-3.5">
            <p className="text-[11px] font-medium text-gray-500 uppercase">Candidates In Funnel</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{candidates.length + 22}</p>
            <p className="text-[10px] text-blue-600 mt-0.5">Active applications</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-3.5">
            <p className="text-[11px] font-medium text-gray-500 uppercase">Offers Dispatched</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">4</p>
            <p className="text-[10px] text-amber-600 mt-0.5">2 Accepted, 2 In Review</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="openings" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-2">
          <TabsList className="bg-slate-100 p-1">
            <TabsTrigger value="openings" className="text-xs">
              Job Vacancies ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="pipeline" className="text-xs">
              Candidate Pipeline Kanban
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400" />
              <Input
                placeholder="Search openings..."
                className="pl-8 text-xs h-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Tab 1: Job Openings Table & Cards */}
        <TabsContent value="openings" className="mt-4 space-y-3">
          <Card className="border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-semibold">
                    <tr>
                      <th className="p-3">Job ID & Role</th>
                      <th className="p-3">Department</th>
                      <th className="p-3">Location & Type</th>
                      <th className="p-3 text-center">Openings</th>
                      <th className="p-3">Deadline</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3">
                          <p className="font-bold text-gray-900">{job.title}</p>
                          <p className="text-[11px] text-gray-400">ID: {job.id}</p>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 font-medium text-slate-700">
                            {job.department}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span>{job.location}</span>
                          </div>
                          <span className="text-[10px] text-gray-400">{job.type}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="inline-block px-2 py-0.5 font-bold rounded-full bg-emerald-50 text-emerald-800 text-xs">
                            {job.openings}
                          </span>
                        </td>
                        <td className="p-3 text-gray-500">
                          {formatDate(job.deadline)}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-xs text-emerald-800">
                              <Link href="/dashboard/candidates">
                                Applicants
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
                              Share
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Candidate Pipeline Kanban */}
        <TabsContent value="pipeline" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pipelineStages.map((stage) => {
              const stageCandidates = candidates.filter(
                (c) =>
                  (stage.key === 'Selected' && (c.status === 'Selected' || c.status === 'Offered')) ||
                  c.status === stage.key
              )

              return (
                <div key={stage.key} className="flex flex-col rounded-xl border border-gray-200 bg-slate-50/70 p-3">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                      {stage.title}
                    </span>
                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                      {stageCandidates.length}
                    </Badge>
                  </div>

                  <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
                    {stageCandidates.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 bg-white rounded-lg border border-gray-200 shadow-xs hover:border-emerald-400 hover:shadow-sm transition-all text-xs space-y-1.5"
                      >
                        <div className="flex items-start justify-between">
                          <p className="font-bold text-gray-900">{c.name}</p>
                          <span className="text-[10px] text-gray-400">{c.experience}</span>
                        </div>
                        <p className="text-[11px] text-emerald-800 font-medium">{c.jobTitle}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {c.skills.slice(0, 2).map((sk) => (
                            <span key={sk} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-100 text-slate-600">
                              {sk}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-400">
                          <span>Applied {formatDate(c.appliedDate)}</span>
                          <Link href="/dashboard/candidates" className="text-emerald-700 font-semibold hover:underline">
                            Profile &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                    {stageCandidates.length === 0 && (
                      <div className="p-4 text-center text-xs text-gray-400 border border-dashed rounded-lg">
                        No candidates in this stage
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

