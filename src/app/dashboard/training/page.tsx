'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Award,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Plus,
  Download,
  BookOpen,
  Sparkles,
  Zap,
} from 'lucide-react'
import { trainingPrograms as initialPrograms, TrainingProgram } from '@/lib/data'
import { formatDate, statusColor } from '@/lib/utils'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function TrainingPage() {
  const [programs, setPrograms] = useState<TrainingProgram[]>(initialPrograms)
  const [isNewOpen, setIsNewOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Technical')
  const [trainer, setTrainer] = useState('Suresh Patil')
  const [startDate, setStartDate] = useState('2026-11-20')
  const [duration, setDuration] = useState('3 days')
  const [capacity, setCapacity] = useState('20')
  const [desc, setDesc] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return
    const newProg: TrainingProgram = {
      id: `T00${programs.length + 1}`,
      title,
      category,
      trainer,
      startDate,
      endDate: '2026-11-23',
      duration,
      enrolled: 1,
      capacity: Number(capacity) || 15,
      status: 'Upcoming',
      description: desc || 'Certified plant training workshop.',
    }
    setPrograms([newProg, ...programs])
    setIsNewOpen(false)
    setTitle('')
  }

  const handleEnroll = (id: string) => {
    setPrograms(
      programs.map((p) =>
        p.id === id ? { ...p, enrolled: Math.min(p.capacity, p.enrolled + 1) } : p
      )
    )
    alert('Successfully enrolled in training program!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-800">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              11. Training & Skill Development Center
            </h2>
            <p className="text-xs text-gray-500">
              Technical certifications, electrical safety drills, and managerial skill development
            </p>
          </div>
        </div>

        <Dialog open={isNewOpen} onOpenChange={setIsNewOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
              <Plus className="w-4 h-4 mr-1.5" />
              New Training Workshop
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Schedule Training Workshop</DialogTitle>
              <DialogDescription className="text-xs">
                Organize internal or certified third-party technical training.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3 py-2 text-xs">
              <div>
                <Label className="text-xs">Workshop Title</Label>
                <Input
                  placeholder="e.g. High Voltage Switchgear Operations"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-xs mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Category</Label>
                  <select
                    className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Technical</option>
                    <option>Safety</option>
                    <option>Soft Skills</option>
                    <option>Compliance</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Trainer / Faculty</Label>
                  <Input
                    value={trainer}
                    onChange={(e) => setTrainer(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Start Date</Label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Max Capacity</Label>
                  <Input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="text-xs mt-1"
                  />
                </div>
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsNewOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                  Schedule Program
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="bg-slate-100 p-1">
          <TabsTrigger value="programs" className="text-xs">All Programs ({programs.length})</TabsTrigger>
          <TabsTrigger value="certificates" className="text-xs">Earned Certifications</TabsTrigger>
        </TabsList>

        {/* Tab 1: Programs Grid */}
        <TabsContent value="programs" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map((p) => (
              <Card key={p.id} className="border-gray-200 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {p.category}
                      </span>
                      <CardTitle className="text-sm font-bold text-gray-900 mt-1">{p.title}</CardTitle>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                  <CardDescription className="text-xs line-clamp-2 mt-1">{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-2 text-xs">
                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg text-gray-600">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Trainer</span>
                      <span className="font-semibold text-gray-800">{p.trainer}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Duration & Date</span>
                      <span className="font-semibold text-gray-800">{p.duration} • {formatDate(p.startDate)}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-500">Seat Occupancy:</span>
                      <span className="font-bold text-gray-800">{p.enrolled} / {p.capacity} Enrolled</span>
                    </div>
                    <Progress value={(p.enrolled / p.capacity) * 100} className="h-1.5 bg-slate-100" />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-[10px] text-gray-400">Accredited by ISO 9001:2015</span>
                    <Button
                      size="sm"
                      className="bg-[#1B4332] text-xs h-7"
                      onClick={() => handleEnroll(p.id)}
                      disabled={p.enrolled >= p.capacity}
                    >
                      {p.enrolled >= p.capacity ? 'Class Full' : 'Enroll Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: Certificate Showcase */}
        <TabsContent value="certificates" className="mt-4">
          <div className="max-w-2xl mx-auto bg-white border-4 border-double border-[#1B4332] rounded-2xl p-8 text-center space-y-4 shadow-lg">
            <div className="flex items-center justify-center gap-2 text-[#1B4332]">
              <Zap className="w-8 h-8 fill-[#1B4332]" />
              <h3 className="text-lg font-black tracking-widest uppercase">
                ISOLATIVE ELECTRICALS PRIVATE LIMITED
              </h3>
            </div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
              Certificate of Technical Competency
            </p>
            <div className="py-2">
              <p className="text-xs text-gray-500">This is proudly conferred upon</p>
              <h2 className="text-2xl font-black text-gray-900 mt-1 font-serif underline decoration-amber-400 decoration-2">
                Rajesh Kumar (Senior Engineer)
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                for successfully completing with distinction the specialized program on
              </p>
              <h4 className="text-base font-bold text-emerald-900 mt-1">
                Advanced PLC Programming & Substation Automation
              </h4>
            </div>
            <div className="flex justify-between items-end pt-6 border-t border-gray-200 text-xs text-gray-500">
              <div>
                <p className="font-bold text-gray-800">Date: 25 Oct 2026</p>
                <p className="text-[10px]">Certificate No: IEL-CERT-0412</p>
              </div>
              <div>
                <p className="font-bold text-gray-900 italic font-script text-sm">Suresh Patil</p>
                <p className="text-[10px] font-semibold">General Manager - HR & Operations</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

