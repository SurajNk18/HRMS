'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  Search,
  ChevronDown,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

export default function Header() {
  const [notifications] = useState([
    { id: 1, text: 'Rajesh Kumar applied for leave', time: '10m ago', unread: true },
    { id: 2, text: 'New applicant for Electrical Engineer', time: '1h ago', unread: true },
    { id: 3, text: 'October payroll processed successfully', time: '1d ago', unread: false },
  ])

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <span>HRMS Portal</span>
            <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified Enterprise
            </span>
          </h1>
          <p className="text-xs text-gray-500 hidden sm:block">
            Isolative Electricals Pvt Ltd • Khandala, Satara Plant
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden lg:flex items-center relative w-80 max-w-sm">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search employees, jobs, payslips..."
          className="w-full pl-9 pr-4 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Portal Home Link */}
        <Link
          href="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 hover:text-emerald-800 px-2.5 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
          title="Back to Corporate Showcase"
        >
          <Building2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Public Portal</span>
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </Link>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2">
            <div className="flex items-center justify-between px-2 py-1.5">
              <p className="text-xs font-semibold text-gray-900">Notifications</p>
              <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">
                2 new
              </Badge>
            </div>
            <DropdownMenuSeparator />
            <div className="space-y-1 py-1">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex flex-col gap-0.5 p-2 rounded-md text-xs cursor-pointer hover:bg-gray-50 transition-colors ${
                    n.unread ? 'bg-emerald-50/50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between font-medium text-gray-800">
                    <span>{n.text}</span>
                    {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />}
                  </div>
                  <span className="text-[10px] text-gray-400">{n.time}</span>
                </div>
              ))}
            </div>
            <DropdownMenuSeparator />
            <Link
              href="/dashboard/announcements"
              className="block text-center py-1.5 text-xs font-medium text-emerald-700 hover:text-emerald-800"
            >
              View all announcements
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none">
              <Avatar className="h-8 w-8 border border-emerald-200">
                <AvatarFallback className="bg-emerald-900 text-white text-xs font-bold">
                  SP
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-xs font-semibold text-gray-800 leading-tight">Suresh Patil</p>
                <p className="text-[10px] text-gray-500">General Manager (HR)</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-xs font-semibold text-gray-900">Suresh Patil</p>
              <p className="text-[11px] text-gray-500 font-normal">suresh.patil@isolative.in</p>
              <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-medium">
                Admin / HR Executive
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/employees/7" className="cursor-pointer text-xs">
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/reports" className="cursor-pointer text-xs">
                Analytics & Reports
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/announcements" className="cursor-pointer text-xs">
                Announcements
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/" className="cursor-pointer text-xs text-red-600 flex items-center justify-between">
                <span>Sign Out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

