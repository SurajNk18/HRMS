'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  UserPlus,
  Users2,
  FolderOpen,
  Clock,
  CalendarDays,
  Banknote,
  TrendingUp,
  GraduationCap,
  Megaphone,
  LogOut,
  BarChart3,
  Zap,
} from 'lucide-react'

type NavItem = {
  label: string
  href: string
  icon: React.ReactNode
}

type NavSection = {
  title?: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard size={16} />,
      },
    ],
  },
  {
    title: 'RECRUITMENT',
    items: [
      { label: 'Job Openings', href: '/dashboard/recruitment', icon: <Briefcase size={16} /> },
      { label: 'Candidates', href: '/dashboard/candidates', icon: <Users size={16} /> },
      { label: 'Offer Letters', href: '/dashboard/offers', icon: <FileText size={16} /> },
    ],
  },
  {
    title: 'EMPLOYEE',
    items: [
      { label: 'Onboarding', href: '/dashboard/onboarding', icon: <UserPlus size={16} /> },
      { label: 'Employees', href: '/dashboard/employees', icon: <Users2 size={16} /> },
      { label: 'Documents', href: '/dashboard/documents', icon: <FolderOpen size={16} /> },
    ],
  },
  {
    title: 'WORKFORCE',
    items: [
      { label: 'Attendance', href: '/dashboard/attendance', icon: <Clock size={16} /> },
      { label: 'Leave', href: '/dashboard/leave', icon: <CalendarDays size={16} /> },
      { label: 'Payroll', href: '/dashboard/payroll', icon: <Banknote size={16} /> },
    ],
  },
  {
    title: 'GROWTH',
    items: [
      { label: 'Performance', href: '/dashboard/performance', icon: <TrendingUp size={16} /> },
      { label: 'Training', href: '/dashboard/training', icon: <GraduationCap size={16} /> },
    ],
  },
  {
    title: 'COMPANY',
    items: [
      { label: 'Announcements', href: '/dashboard/announcements', icon: <Megaphone size={16} /> },
      { label: 'Exit Management', href: '/dashboard/exit', icon: <LogOut size={16} /> },
      { label: 'Reports', href: '/dashboard/reports', icon: <BarChart3 size={16} /> },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 flex flex-col bg-white border-r border-gray-200 z-40 overflow-y-auto"
      style={{ width: 240 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-gray-100">
        <div
          className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0"
          style={{ backgroundColor: '#1B4332' }}
        >
          <Zap size={18} className="text-white fill-white" />
        </div>
        <div className="leading-tight">
          <p className="font-bold text-sm tracking-wide" style={{ color: '#1B4332' }}>
            ISOLATIVE
          </p>
          <p className="text-[10px] text-gray-500 font-medium">ELECTRICALS PVT LTD</p>
          <p className="text-[9px] text-gray-400">Khandala, Satara</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className={sIdx > 0 ? 'pt-3' : ''}>
            {section.title && (
              <p className="px-2 mb-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        active
                          ? 'text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      )}
                      style={
                        active
                          ? { backgroundColor: '#1B4332', color: '#fff' }
                          : undefined
                      }
                      onMouseEnter={(e) => {
                        if (!active) {
                          ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                            '#d1fae5'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                            'transparent'
                        }
                      }}
                    >
                      <span className={active ? 'text-white' : 'text-gray-400'}>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
