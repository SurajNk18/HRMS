'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Users2,
  CalendarDays,
  Clock,
  Banknote,
  Briefcase,
  TrendingUp,
  GraduationCap,
  FolderOpen,
  LogOut,
  Megaphone,
  BarChart3,
  FileCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Lock,
  Cloud,
  Layers,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'recruit' | 'workforce' | 'growth'>('all')

  const lifecycleSteps = [
    { num: '1', title: 'Recruitment & Job Opening', desc: 'Identify vacancies & post roles', color: 'bg-emerald-700' },
    { num: '2', title: 'Application & Screening', desc: 'Resume shortlisting & intake', color: 'bg-teal-700' },
    { num: '3', title: 'Interview & Selection', desc: 'Tech & HR evaluation panel', color: 'bg-cyan-700' },
    { num: '4', title: 'Offer Letter & Acceptance', desc: 'CTC package & formal contracts', color: 'bg-amber-600' },
    { num: '5', title: 'Joining & Onboarding', desc: 'KYC, IT setup & induction', color: 'bg-orange-600' },
    { num: '6', title: 'Active Employment', desc: 'Attendance, payroll & reviews', color: 'bg-emerald-800' },
    { num: '7', title: 'Exit Management', desc: 'Smooth handover & clearances', color: 'bg-slate-700' },
  ]

  const modules = [
    {
      num: '1',
      title: 'Recruitment & Hiring',
      subtitle: 'Find, Evaluate and Hire the Best Talent',
      desc: 'Create job openings, manage applicant pipeline, schedule interviews, and record hiring decisions.',
      features: ['Create & publish openings', 'Application tracking pipeline', 'Screen & shortlist candidates', 'Interview scheduling & feedback'],
      href: '/dashboard/recruitment',
      cat: 'recruit',
    },
    {
      num: '2',
      title: 'Offer Letter & Joining Letter',
      subtitle: 'Automate and Simplify the Process',
      desc: 'Standardized offer templates with salary annexures, automated email dispatch and acceptance tracking.',
      features: ['Generate offer letters from template', 'Add salary, designation & terms', 'Email delivery to candidate', 'Track acceptance & joining date'],
      href: '/dashboard/offers',
      cat: 'recruit',
    },
    {
      num: '3',
      title: 'Employee Onboarding',
      subtitle: 'From Joining to Productivity',
      desc: 'Digital document verification, asset provisioning, employee ID generation and structured induction.',
      features: ['Collect required KYC documents', 'Verify background & references', 'Assign department & manager', 'Complete onboarding checklist'],
      href: '/dashboard/onboarding',
      cat: 'recruit',
    },
    {
      num: '4',
      title: 'Employee Management',
      subtitle: 'Build and Manage Your Workforce',
      desc: 'Centralized employee repository, searchable personnel directory, transfers, and promotion records.',
      features: ['Complete employee master profiles', 'Department & designation management', 'Reporting hierarchy tree', 'Employee directory with filters'],
      href: '/dashboard/employees',
      cat: 'workforce',
    },
    {
      num: '5',
      title: 'Attendance Management',
      subtitle: 'Track Work Hours and Productivity',
      desc: 'Real-time biometric terminal integration, shift rosters, overtime calculations and correction workflows.',
      features: ['Biometric check-in / check-out', 'View daily & monthly attendance', 'Late arrival & early alerts', 'Overtime & correction requests'],
      href: '/dashboard/attendance',
      cat: 'workforce',
    },
    {
      num: '6',
      title: 'Leave Management',
      subtitle: 'Manage Leaves with Ease',
      desc: 'Automated leave requests, holiday calendars, entitlement balances (CL/SL/EL) and multi-level approvals.',
      features: ['One-click leave application', 'Instant leave approval workflow', 'Entitlement balance tracking', 'Official plant holiday calendar'],
      href: '/dashboard/leave',
      cat: 'workforce',
    },
    {
      num: '7',
      title: 'Payroll Management',
      subtitle: 'Accurate, Secure and Transparent',
      desc: 'End-to-end salary processing, customizable allowances/deductions, PF/ESI/TDS and printable payslips.',
      features: ['Salary structure setup & components', 'Allowances & statutory deductions', 'Monthly one-click payroll run', 'Printable PDF payslip generation'],
      href: '/dashboard/payroll',
      cat: 'workforce',
    },
    {
      num: '8',
      title: 'Performance Management',
      subtitle: 'Encourage Growth and Excellence',
      desc: 'Goal setting (OKRs), periodic appraisals, 360-degree feedback and core technical skill matrices.',
      features: ['Set quarterly goals & targets', 'Manager & self appraisals', 'Performance review history', 'Skill ratings & career roadmap'],
      href: '/dashboard/performance',
      cat: 'growth',
    },
    {
      num: '9',
      title: 'Training & Development',
      subtitle: 'Learn Today, Lead Tomorrow',
      desc: 'Plant safety training, electrical engineering certifications, workshop schedules and attendee tracking.',
      features: ['Catalog of technical programs', 'Skill competency tracking', 'Official completion certificates', 'Training history & seat quotas'],
      href: '/dashboard/training',
      cat: 'growth',
    },
    {
      num: '10',
      title: 'Document Management',
      subtitle: 'Keep Important Records Safe',
      desc: 'Encrypted document vault for identity proofs, appointment letters, degrees and tax filings.',
      features: ['Upload & store digital records', 'Organize by category', 'Secure role-based access', 'Instant download anytime'],
      href: '/dashboard/documents',
      cat: 'workforce',
    },
    {
      num: '11',
      title: 'Exit Management',
      subtitle: 'Smooth and Compliant Offboarding',
      desc: 'Resignation tracking, notice periods, multi-department NOC clearance, and Full & Final settlements.',
      features: ['Resignation submission & notice log', 'Handover & asset retrieval', 'Departmental clearance checklist', 'Relieving letter & F&F settlement'],
      href: '/dashboard/exit',
      cat: 'growth',
    },
    {
      num: '12',
      title: 'Notifications & Announcements',
      subtitle: 'Stay Informed, Stay Ahead',
      desc: 'Broadcast plant bulletins, policy updates, festive holidays and emergency circulars across all units.',
      features: ['Company circular announcements', 'Holiday schedule broadcasts', 'Policy revision alerts', 'Instant system notifications'],
      href: '/dashboard/announcements',
      cat: 'growth',
    },
    {
      num: '13',
      title: 'Reports & Analytics',
      subtitle: 'Data for Better Decisions',
      desc: 'Comprehensive charts, headcount analytics, payroll trends, muster rolls and compliance exports.',
      features: ['Headcount & department reports', 'Attendance & leave analytics', 'Monthly wage bill trends', 'Excel & PDF data exports'],
      href: '/dashboard/reports',
      cat: 'growth',
    },
  ]

  const filteredModules = modules.filter(
    (m) => activeTab === 'all' || m.cat === activeTab
  )

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-emerald-900 selection:text-white">
      {/* ── TOP HEADER / NAVIGATION (Exact match to Image 1) ────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#1B4332] text-white border-b border-emerald-800/60 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1B4332] shadow-sm">
              <Zap className="w-6 h-6 fill-[#1B4332]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white">
                  ISOLATIVE
                </span>
                <span className="hidden sm:inline-block text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                  PORTAL
                </span>
              </div>
              <p className="text-[10px] text-emerald-200 uppercase tracking-wider font-medium">
                ELECTRICALS PRIVATE LIMITED • Khandala, Satara
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-emerald-100">
            <a href="#hero" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#lifecycle" className="hover:text-white transition-colors">
              Employee Lifecycle
            </a>
            <a href="#modules" className="hover:text-white transition-colors">
              HRMS Modules
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2 rounded-xl shadow-md transition-all hover:scale-105"
            >
              <Link href="/dashboard">
                Employee Login &rarr;
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER (Matches Image 1 dark electrical factory hero) ──────────── */}
      <section id="hero" className="relative bg-[#0d2319] text-white py-16 sm:py-24 overflow-hidden border-b border-emerald-950">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 7 Cols: Hero Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-xs font-semibold text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Next-Gen Enterprise Human Resource System</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Empowering People.{' '}
                <span className="text-amber-400 block sm:inline">
                  Building a Stronger Tomorrow.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
                A modern HRMS platform to manage your people, processes, factory attendance and payroll performance — all unified in one seamless plant workspace.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 rounded-xl shadow-lg"
                >
                  <Link href="/dashboard">
                    Explore Live HRMS &rarr;
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-xl"
                >
                  <a href="#lifecycle">
                    Learn More
                  </a>
                </Button>
              </div>

              {/* 3 Trust Badges from Mockup Image 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-emerald-900/60 text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900/90 flex items-center justify-center text-amber-400">
                    <Users2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Smart Workforce</p>
                    <p className="text-[10px] text-emerald-300/80">Automated shift management</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900/90 flex items-center justify-center text-amber-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Secure & Reliable</p>
                    <p className="text-[10px] text-emerald-300/80">Encrypted compliance vault</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-900/90 flex items-center justify-center text-amber-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Scalable for Growth</p>
                    <p className="text-[10px] text-emerald-300/80">Ready for multiple plants</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Quick Portal Access Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-gray-900 border border-emerald-100">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center font-bold">
                      <Zap className="w-4 h-4 fill-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#1B4332]">HRMS Portal Access</p>
                      <p className="text-[10px] text-gray-400">Isolative Electricals Plant 1</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Live System
                  </span>
                </div>

                <div className="py-4 space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-gray-600">Enterprise Plant Unit:</span>
                    <span className="font-bold text-gray-800">Khandala MIDC, Satara</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-gray-600">Active Workforce:</span>
                    <span className="font-bold text-emerald-800">124 Personnel Active</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-gray-600">Biometric Attendance:</span>
                    <span className="font-bold text-emerald-800">90.3% Today</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Button asChild className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-sm py-5 rounded-xl font-bold">
                    <Link href="/dashboard">
                      Launch HR Management Console &rarr;
                    </Link>
                  </Button>
                  <p className="text-[11px] text-center text-gray-400">
                    Single Sign-On enabled for all verified supervisors & staff
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE COMPLETE EMPLOYEE LIFECYCLE (Exact from Image 1 & 2) ────────── */}
      <section id="lifecycle" className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              End-to-End Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              The Complete Employee Lifecycle
            </h2>
            <p className="text-sm text-gray-500">
              From Candidate to Exit — Manage every step with transparency and industrial compliance
            </p>
          </div>

          {/* Horizontal Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {lifecycleSteps.map((step) => (
              <div
                key={step.num}
                className="p-4 rounded-2xl border border-gray-200 bg-slate-50/70 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-8 h-8 rounded-xl text-white font-extrabold text-xs flex items-center justify-center mb-2 shadow-xs ${step.color}`}
                  >
                    {step.num}
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 leading-snug">{step.title}</h3>
                  <p className="text-[11px] text-gray-500 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Benefits Callout (From Image 1) */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                Key Enterprise Benefits
              </h3>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>Streamlined hiring process:</strong> Shortlist and issue offers in record time
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>Centralized employee data:</strong> Safe digital vault for all plant personnel
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>Automated workflows:</strong> Instant approvals for leaves, corrections and assets
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>Real-time tracking and reports:</strong> Live biometric and shift insights
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <strong>Improved productivity:</strong> Transparent appraisals and goal setting
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right space-y-3">
              <p className="font-serif italic text-2xl font-bold text-emerald-900">
                &ldquo;Better HR Management for a Brighter Future&rdquo;
              </p>
              <p className="text-xs text-gray-500">
                Tailored for engineering precision at Isolative Electricals Private Limited
              </p>
              <Button asChild className="bg-[#1B4332] text-xs font-semibold">
                <Link href="/dashboard">
                  Explore Enterprise Modules &rarr;
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALL 13 INTERACTIVE MODULE CARDS (Exact match to Image 1 & 2) ────────── */}
      <section id="modules" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200">
                Core Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
                HRMS Overview — Powerful Modules
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Everything required for complete factory & corporate human resource management
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 text-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'all' ? 'bg-[#1B4332] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Modules ({modules.length})
              </button>
              <button
                onClick={() => setActiveTab('recruit')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'recruit' ? 'bg-[#1B4332] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Recruit
              </button>
              <button
                onClick={() => setActiveTab('workforce')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'workforce' ? 'bg-[#1B4332] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Workforce
              </button>
              <button
                onClick={() => setActiveTab('growth')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeTab === 'growth' ? 'bg-[#1B4332] text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Growth & Exit
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((mod) => (
              <Card
                key={mod.num}
                className="border-gray-200 shadow-xs hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group bg-white"
              >
                <div>
                  <div className="p-5 border-b border-gray-100 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white font-extrabold text-xs flex items-center justify-center">
                        {mod.num}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 group-hover:text-emerald-800 transition-colors">
                          {mod.title}
                        </h3>
                        <p className="text-[11px] text-gray-400">{mod.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed">{mod.desc}</p>
                    <div className="space-y-1.5 pt-1">
                      {mod.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-[11px] text-gray-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-gray-100">
                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-[#1B4332] hover:bg-[#2D6A4F] text-xs font-semibold h-8"
                  >
                    <Link href={mod.href}>
                      Launch {mod.title} &rarr;
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY & TRUST FOOTER (From Image 2) ────────────────────────────── */}
      <footer id="contact" className="bg-[#0f281e] text-white border-t border-emerald-950 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-8 border-b border-emerald-900/60 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure & Reliable</span>
              </div>
              <p className="text-gray-400 text-[11px]">Your data, our priority with 256-bit AES encryption</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Lock className="w-4 h-4" />
                <span>Role-Based Access</span>
              </div>
              <p className="text-gray-400 text-[11px]">Right data for the right people with audit trails</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Cloud className="w-4 h-4" />
                <span>Cloud Ready</span>
              </div>
              <p className="text-gray-400 text-[11px]">Access anytime, anywhere across plants and mobile</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Layers className="w-4 h-4" />
                <span>Scalable & Flexible</span>
              </div>
              <p className="text-gray-400 text-[11px]">Grows with your engineering and manufacturing business</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              <div>
                <p className="font-bold text-white text-sm">ISOLATIVE ELECTRICALS PRIVATE LIMITED</p>
                <p className="text-[11px] text-gray-400">Plot B-42, MIDC Industrial Area, Khandala, Satara, Maharashtra - 412802</p>
              </div>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="font-serif italic text-amber-300 font-semibold text-sm">
                &ldquo;Your People, Our Greatest Strength&rdquo;
              </p>
              <p className="text-[10px] text-gray-500">
                © 2026 Isolative Electricals Pvt Ltd. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
