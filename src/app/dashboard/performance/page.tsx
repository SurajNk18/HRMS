'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  Star,
  Target,
  Award,
  CheckCircle2,
  Clock,
  Plus,
  ChevronRight,
  MessageSquare,
  BarChart2,
} from 'lucide-react'
import { performanceReviews as initialReviews, PerformanceReview } from '@/lib/data'
import { statusColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
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

export default function PerformancePage() {
  const [reviews, setReviews] = useState<PerformanceReview[]>(initialReviews)
  const [selectedReview, setSelectedReview] = useState<PerformanceReview>(initialReviews[0])
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [goalTitle, setGoalTitle] = useState('')
  const [goalTarget, setGoalTarget] = useState('2026-12-31')

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!goalTitle) return
    alert(`Goal "${goalTitle}" successfully assigned to ${selectedReview.empName}!`)
    setIsAddGoalOpen(false)
    setGoalTitle('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              10. Performance Management & Appraisals
            </h2>
            <p className="text-xs text-gray-500">
              Encourage growth, conduct transparent quarterly appraisals, and track skill competencies
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
                <Plus className="w-4 h-4 mr-1.5" />
                Assign Performance Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base font-bold">Assign Performance Goal / OKR</DialogTitle>
                <DialogDescription className="text-xs">
                  Set measurable quarterly milestone for team members.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddGoal} className="space-y-3 py-2 text-xs">
                <div>
                  <Label className="text-xs">Select Employee</Label>
                  <select className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white">
                    <option>Rajesh Kumar (Senior Engineer)</option>
                    <option>Priya Sharma (HR Manager)</option>
                    <option>Amit Desai (Finance Analyst)</option>
                    <option>Vikas Mehta (Junior Engineer)</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Goal Title</Label>
                  <Input
                    placeholder="e.g. Complete substation commissioning with 0 safety incidents"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    required
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Target Completion Date</Label>
                  <Input
                    type="date"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                    required
                    className="text-xs mt-1"
                  />
                </div>
                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setIsAddGoalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                    Assign Goal
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Employee Review List */}
        <div className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-900">
                Q3 2026 Review Cycle
              </CardTitle>
              <CardDescription className="text-xs">
                Click an employee to view their performance scorecard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  onClick={() => setSelectedReview(rev)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedReview.id === rev.id
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900">{rev.empName}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(rev.status)}`}>
                      {rev.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{rev.department} • {rev.empId}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-600 mt-2 pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {rev.rating > 0 ? `${rev.rating} / 5.0` : 'Pending'}
                    </span>
                    <span>Goals: {rev.goalsAchieved} / {rev.goals} Done</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 2 Cols: Detailed Appraisal Scorecard (Matches Image 1 & 2) */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-bold text-gray-900">
                  Performance Scorecard — {selectedReview.empName}
                </CardTitle>
                <CardDescription className="text-xs">
                  Review Cycle: <span className="font-semibold text-gray-800">{selectedReview.period}</span> • Dept: {selectedReview.department}
                </CardDescription>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor(selectedReview.status)}`}>
                {selectedReview.status}
              </span>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Score Badge */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#1B4332] text-white flex flex-col items-center justify-center shadow-sm">
                    <span className="text-2xl font-black">{selectedReview.rating || '4.2'}</span>
                    <span className="text-[9px] text-emerald-300 font-medium">OUT OF 5.0</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Overall Appraisal Rating</h4>
                    <p className="text-xs text-gray-500">Exceeds standard engineering expectations</p>
                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= Math.floor(selectedReview.rating || 4)
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="text-gray-500 block">OKR Achievement Rate</span>
                  <span className="text-xl font-bold text-emerald-800 font-mono">
                    {Math.round(((selectedReview.goalsAchieved || 7) / (selectedReview.goals || 8)) * 100)}%
                  </span>
                  <p className="text-[10px] text-gray-400">{selectedReview.goalsAchieved} of {selectedReview.goals} goals met</p>
                </div>
              </div>

              {/* Core Skill Competencies (From Mockup Image 1 & 2) */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Skill Competency Evaluation
                </h4>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-700">Technical Skills & Safety Standards</span>
                      <span className="font-mono font-bold text-emerald-800">4.5 / 5.0 (90%)</span>
                    </div>
                    <Progress value={90} className="h-2 bg-slate-100" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-700">Project Execution & Timeline Adherence</span>
                      <span className="font-mono font-bold text-emerald-800">4.2 / 5.0 (84%)</span>
                    </div>
                    <Progress value={84} className="h-2 bg-slate-100" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-700">Team Collaboration & Mentorship</span>
                      <span className="font-mono font-bold text-emerald-800">4.0 / 5.0 (80%)</span>
                    </div>
                    <Progress value={80} className="h-2 bg-slate-100" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-gray-700">Shift Punctuality & Discipline</span>
                      <span className="font-mono font-bold text-emerald-800">4.8 / 5.0 (96%)</span>
                    </div>
                    <Progress value={96} className="h-2 bg-slate-100" />
                  </div>
                </div>
              </div>

              {/* Manager Feedback */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-gray-800 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  Manager Appraisal Comments (Suresh Patil)
                </p>
                <p className="text-gray-600 italic">
                  &ldquo;{selectedReview.managerFeedback || 'Consistent high performance in managing substation installations. Recommending for leadership training.'}&rdquo;
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

