'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  UserPlus,
  CheckCircle2,
  Clock,
  FileCheck,
  ShieldCheck,
  Laptop,
  Briefcase,
  IdCard,
  UserCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function OnboardingPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Collect KYC & educational documents', done: true, phase: 'Pre-Joining' },
    { id: 2, title: 'Verify background & previous employment references', done: true, phase: 'Pre-Joining' },
    { id: 3, title: 'Confirm official joining date & issue welcome kit', done: true, phase: 'Pre-Joining' },
    { id: 4, title: 'Create Employee ID & enterprise email address', done: true, phase: 'Day 1' },
    { id: 5, title: 'Assign department & reporting manager', done: true, phase: 'Day 1' },
    { id: 6, title: 'Issue biometric access card & RFID badge', done: false, phase: 'Day 1' },
    { id: 7, title: 'Allocate IT assets (Workstation & software tools)', done: false, phase: 'Week 1' },
    { id: 8, title: 'Plant safety & ISO compliance induction', done: false, phase: 'Week 1' },
    { id: 9, title: 'Assign mentor & initial 30-day KPI goals', done: false, phase: 'Week 1' },
  ])

  const [activeJoiner, setActiveJoiner] = useState({
    name: 'Sanjay Gupta',
    empId: 'IEL009',
    role: 'Electrical Engineer',
    dept: 'Electrical Projects',
    manager: 'Rajesh Kumar',
    joiningDate: '2026-11-01',
    progress: 55,
  })

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const completedCount = tasks.filter((t) => t.done).length
  const progressPercent = Math.round((completedCount / tasks.length) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-100 text-teal-800">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              4 & 5. Pre-Joining, Joining & Employee Onboarding
            </h2>
            <p className="text-xs text-gray-500">
              Transform accepted candidates into fully productive team members through seamless induction
            </p>
          </div>
        </div>

        <Button asChild size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
          <Link href="/dashboard/employees">
            View All Employees Directory &rarr;
          </Link>
        </Button>
      </div>

      {/* 5-Step Joining Pipeline Bar */}
      <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-xs">
        <p className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
          Onboarding Lifecycle Milestones
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {[
            { step: '1', title: 'Offer Accepted', sub: 'Contract signed', done: true },
            { step: '2', title: 'Document Verification', sub: 'PAN, Aadhar, Degree', done: true },
            { step: '3', title: 'Asset & IT Setup', sub: 'Laptop, ID & Email', done: true },
            { step: '4', title: 'Induction & Safety', sub: 'Plant orientation', done: false },
            { step: '5', title: 'Active Duty', sub: 'Project assignment', done: false },
          ].map((s) => (
            <div
              key={s.step}
              className={`p-3 rounded-lg border text-xs flex items-center gap-2.5 ${
                s.done
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  s.done ? 'bg-emerald-700 text-white' : 'bg-slate-300 text-slate-700'
                }`}
              >
                {s.done ? <CheckCircle2 className="w-4 h-4" /> : s.step}
              </div>
              <div>
                <p className="font-bold leading-tight">{s.title}</p>
                <p className="text-[10px] opacity-80">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Onboarding Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold text-gray-900">
                    Onboarding Checklist — {activeJoiner.name}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Emp ID: <span className="font-semibold text-emerald-800">{activeJoiner.empId}</span> • Role: {activeJoiner.role} ({activeJoiner.dept})
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800">{progressPercent}% Completed</span>
                  <p className="text-[10px] text-gray-400">{completedCount} of {tasks.length} items verified</p>
                </div>
              </div>
              <Progress value={progressPercent} className="h-2 mt-2 bg-slate-100" />
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    task.done
                      ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className={`font-medium ${task.done ? 'line-through text-gray-500' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-normal border-gray-300">
                    {task.phase}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Candidate & Assets Assignee Panel */}
        <div className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-gray-900">
                New Joiner Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200">
                <div className="flex justify-between">
                  <span className="text-gray-500">Full Name:</span>
                  <span className="font-bold text-gray-900">{activeJoiner.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Generated Emp ID:</span>
                  <span className="font-mono font-bold text-emerald-700">{activeJoiner.empId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-semibold">{activeJoiner.dept}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Designation:</span>
                  <span className="font-semibold">{activeJoiner.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reporting To:</span>
                  <span className="font-semibold">{activeJoiner.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Joining Date:</span>
                  <span className="font-semibold">{activeJoiner.joiningDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-800">Assigned Equipment & Access</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 rounded-lg border border-gray-100 bg-white">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <Laptop className="w-3.5 h-3.5 text-emerald-700" />
                      Dell Latitude Core i7
                    </span>
                    <Badge variant="outline" className="text-[9px] bg-emerald-50 text-emerald-700">Allocated</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg border border-gray-100 bg-white">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <IdCard className="w-3.5 h-3.5 text-emerald-700" />
                      Plant RFID Badge & Key
                    </span>
                    <Badge variant="outline" className="text-[9px] bg-amber-50 text-amber-700">Pending</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg border border-gray-100 bg-white">
                    <span className="flex items-center gap-1.5 text-gray-700">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      Safety Helmet & Shoes
                    </span>
                    <Badge variant="outline" className="text-[9px] bg-emerald-50 text-emerald-700">Issued</Badge>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full bg-[#1B4332] text-xs h-9">
                <Link href={`/dashboard/employees/${activeJoiner.empId === 'IEL009' ? '1' : '2'}`}>
                  Open Full Employee Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

