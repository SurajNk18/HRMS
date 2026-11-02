'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Megaphone,
  Bell,
  Calendar,
  AlertTriangle,
  Plus,
  ShieldCheck,
  Info,
  Clock,
  Pin,
} from 'lucide-react'
import { announcements as initialAnnouncements, Announcement } from '@/lib/data'
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

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>(initialAnnouncements)
  const [filterType, setFilterType] = useState('All')
  const [isOpen, setIsOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [type, setType] = useState<Announcement['type']>('General')
  const [priority, setPriority] = useState<Announcement['priority']>('Medium')
  const [content, setContent] = useState('')

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return
    const newNotice: Announcement = {
      id: `AN00${items.length + 1}`,
      title,
      type,
      priority,
      content,
      postedBy: 'Suresh Patil (GM)',
      postedOn: new Date().toISOString().split('T')[0],
    }
    setItems([newNotice, ...items])
    setIsOpen(false)
    setTitle('')
    setContent('')
  }

  const filtered = items.filter((ann) => filterType === 'All' || ann.type === filterType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              12. Announcements, Bulletins & Circulars
            </h2>
            <p className="text-xs text-gray-500">
              Broadcast plant notices, holiday schedules, HR policies and emergency alerts to all employees
            </p>
          </div>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
              <Plus className="w-4 h-4 mr-1.5" />
              Publish Circular
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Publish Plant Circular</DialogTitle>
              <DialogDescription className="text-xs">
                Broadcast an official announcement to all departments.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-3 py-2 text-xs">
              <div>
                <Label className="text-xs">Circular Title</Label>
                <Input
                  placeholder="e.g. Mandatory Safety Audit Schedule"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-xs mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Type</Label>
                  <select
                    className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                    value={type}
                    onChange={(e) => setType(e.target.value as Announcement['type'])}
                  >
                    <option>General</option>
                    <option>Holiday</option>
                    <option>Policy</option>
                    <option>Event</option>
                    <option>Alert</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Priority</Label>
                  <select
                    className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Announcement['priority'])}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-xs">Circular Description / Content</Label>
                <Textarea
                  placeholder="Write announcement details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={3}
                  className="text-xs mt-1"
                />
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                  Publish to Employees
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {['All', 'Holiday', 'Policy', 'Event', 'Alert', 'General'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filterType === t
                ? 'bg-[#1B4332] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-slate-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((ann) => (
          <Card
            key={ann.id}
            className={`border shadow-xs transition-all ${
              ann.priority === 'High' ? 'border-rose-200 bg-rose-50/20' : 'border-gray-200 bg-white'
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${statusColor(ann.priority)}`}>
                    {ann.priority} Priority
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                    {ann.type}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{formatDate(ann.postedOn)}</span>
              </div>
              <CardTitle className="text-base font-bold text-gray-900 mt-2">{ann.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <p className="text-gray-600 leading-relaxed">{ann.content}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-[11px] text-gray-400">
                <span>Authorized by: <strong className="text-gray-700">{ann.postedBy}</strong></span>
                <span className="text-emerald-800 font-semibold cursor-pointer hover:underline">
                  Acknowledge Notice &rarr;
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

