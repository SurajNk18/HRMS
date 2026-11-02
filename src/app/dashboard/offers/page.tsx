'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Download,
  Mail,
  Printer,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Send,
  Zap,
} from 'lucide-react'
import { candidates } from '@/lib/data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function OfferLettersPage() {
  const [selectedOfferCandidate, setSelectedOfferCandidate] = useState({
    name: 'Sanjay Gupta',
    position: 'Electrical Engineer',
    department: 'Electrical Projects',
    email: 'sanjay.gupta@email.com',
    ctc: 650000,
    basic: 325000,
    hra: 130000,
    specialAllowance: 147000,
    pf: 48000,
    joiningDate: '2026-12-01',
    status: 'Accepted',
    offerDate: '2026-10-15',
  })

  const [activeTab, setActiveTab] = useState<'preview' | 'create'>('preview')
  const [emailSent, setEmailSent] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  const handleSendEmail = () => {
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              3. Offer Letter & Joining Letter Management
            </h2>
            <p className="text-xs text-gray-500">
              Generate standardized employment contracts, track approvals and formalize joinings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrint}
            className="text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            Print / PDF
          </Button>
          <Button
            size="sm"
            onClick={handleSendEmail}
            className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            {emailSent ? 'Dispatched to Candidate!' : 'Email Offer Letter'}
          </Button>
        </div>
      </div>

      {/* Feature Checklist from Image 1 & 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
        {[
          { label: 'Template Builder', status: 'Active' },
          { label: 'CTC & Allowances', status: 'Ready' },
          { label: 'Automated Workflows', status: 'Synced' },
          { label: 'Candidate Acceptance', status: 'Tracked' },
          { label: 'Joining Letters', status: 'Auto-Gen' },
          { label: 'Legal Terms & Non-Compete', status: 'Standard' },
        ].map((feat, idx) => (
          <div key={idx} className="p-2.5 rounded-lg border border-gray-200 bg-white flex items-center justify-between">
            <span className="font-medium text-gray-700">{feat.label}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Offer History & Selection */}
        <div className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-gray-900">
                Recent Offers Issued
              </CardTitle>
              <CardDescription className="text-xs">
                Select a candidate to inspect and preview offer terms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              {[
                {
                  name: 'Sanjay Gupta',
                  position: 'Electrical Engineer',
                  department: 'Electrical Projects',
                  email: 'sanjay.gupta@email.com',
                  ctc: 650000,
                  basic: 325000,
                  hra: 130000,
                  specialAllowance: 147000,
                  pf: 48000,
                  joiningDate: '2026-12-01',
                  status: 'Accepted',
                  offerDate: '2026-10-15',
                },
                {
                  name: 'Arjun Nair',
                  position: 'Junior Electrical Engineer',
                  department: 'Electrical Substation',
                  email: 'arjun.nair@email.com',
                  ctc: 480000,
                  basic: 240000,
                  hra: 96000,
                  specialAllowance: 104000,
                  pf: 40000,
                  joiningDate: '2026-12-15',
                  status: 'Pending Acceptance',
                  offerDate: '2026-10-24',
                },
                {
                  name: 'Pooja Reddy',
                  position: 'HR Executive',
                  department: 'Human Resources',
                  email: 'pooja.reddy@email.com',
                  ctc: 420000,
                  basic: 210000,
                  hra: 84000,
                  specialAllowance: 90000,
                  pf: 36000,
                  joiningDate: '2026-12-01',
                  status: 'In Review',
                  offerDate: '2026-10-28',
                },
              ].map((cand, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedOfferCandidate(cand)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedOfferCandidate.name === cand.name
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900">{cand.name}</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        cand.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {cand.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">{cand.position}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 mt-2 pt-2 border-t border-gray-100">
                    <span>CTC: {formatCurrency(cand.ctc)}</span>
                    <span>Joining: {formatDate(cand.joiningDate)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Offer Setup Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold text-gray-900">
                Quick Adjust Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <Label className="text-[11px]">Proposed Annual CTC (INR)</Label>
                <Input
                  type="number"
                  value={selectedOfferCandidate.ctc}
                  onChange={(e) =>
                    setSelectedOfferCandidate({
                      ...selectedOfferCandidate,
                      ctc: Number(e.target.value),
                    })
                  }
                  className="text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-[11px]">Joining Date</Label>
                <Input
                  type="date"
                  value={selectedOfferCandidate.joiningDate}
                  onChange={(e) =>
                    setSelectedOfferCandidate({
                      ...selectedOfferCandidate,
                      joiningDate: e.target.value,
                    })
                  }
                  className="text-xs mt-1"
                />
              </div>
              <Button asChild className="w-full bg-[#1B4332] text-xs h-8">
                <Link href="/dashboard/onboarding">
                  Proceed to Onboarding &rarr;
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Professional Formal Offer Letter Document Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-md p-6 sm:p-8 space-y-6 text-gray-800 font-sans">
            {/* Letterhead */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-[#1B4332] gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1B4332] flex items-center justify-center text-white">
                  <Zap className="w-7 h-7 fill-white" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-[#1B4332]">
                    ISOLATIVE ELECTRICALS PRIVATE LIMITED
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Plot No. B-42, MIDC Industrial Area, Khandala, Satara, Maharashtra - 412802
                  </p>
                  <p className="text-[10px] text-gray-400">
                    CIN: U31909PN2015PTC154210 • info@isolative.in • +91 (02169) 245890
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full border border-emerald-200">
                  STATUS: {selectedOfferCandidate.status.toUpperCase()}
                </span>
                <p className="text-xs text-gray-500 mt-1">Ref: IEL/HR/OFFER/2026/088</p>
                <p className="text-xs text-gray-500">Date: {formatDate(selectedOfferCandidate.offerDate)}</p>
              </div>
            </div>

            {/* Recipient */}
            <div className="text-xs space-y-1">
              <p className="font-bold text-gray-900 text-sm">To,</p>
              <p className="font-semibold text-gray-900">{selectedOfferCandidate.name}</p>
              <p className="text-gray-600">{selectedOfferCandidate.email}</p>
              <p className="text-gray-500">Subject: Offer of Employment as {selectedOfferCandidate.position}</p>
            </div>

            {/* Letter Body */}
            <div className="text-xs leading-relaxed space-y-3 text-gray-700">
              <p>
                Dear <span className="font-bold text-gray-900">{selectedOfferCandidate.name}</span>,
              </p>
              <p>
                With reference to your interview and technical assessment, we are delighted to offer you the position of{' '}
                <span className="font-bold text-emerald-900">{selectedOfferCandidate.position}</span> in the{' '}
                <span className="font-semibold">{selectedOfferCandidate.department}</span> department of{' '}
                <span className="font-bold">Isolative Electricals Private Limited</span>.
              </p>
              <p>
                Your scheduled date of joining will be{' '}
                <span className="font-bold text-gray-900">{formatDate(selectedOfferCandidate.joiningDate)}</span> at our Khandala plant.
              </p>
            </div>

            {/* Salary Breakdown Table */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-900">Annexure A: Annual Compensation Breakdown (CTC)</p>
              <div className="border border-gray-200 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-gray-700 font-semibold border-b">
                    <tr>
                      <th className="p-2.5">Salary Component</th>
                      <th className="p-2.5 text-right">Monthly (₹)</th>
                      <th className="p-2.5 text-right">Annual (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-2.5">Basic Salary</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.basic / 12)}</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.basic)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">House Rent Allowance (HRA)</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.hra / 12)}</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.hra)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">Special & Plant Allowance</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.specialAllowance / 12)}</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.specialAllowance)}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5">Provident Fund (Employer Share)</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.pf / 12)}</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.pf)}</td>
                    </tr>
                    <tr className="bg-emerald-50 font-bold text-emerald-950">
                      <td className="p-2.5">Total Cost to Company (CTC)</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.ctc / 12)}</td>
                      <td className="p-2.5 text-right font-mono">{formatCurrency(selectedOfferCandidate.ctc)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terms Signatures */}
            <div className="grid grid-cols-2 pt-6 border-t border-gray-200 text-xs">
              <div>
                <p className="font-semibold text-gray-800">For Isolative Electricals Pvt Ltd,</p>
                <div className="h-12 flex items-end">
                  <p className="font-script text-emerald-800 font-bold text-sm italic">Suresh Patil</p>
                </div>
                <p className="font-bold text-gray-900">Suresh Patil</p>
                <p className="text-gray-500 text-[11px]">General Manager - Operations & HR</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-800">Accepted & Confirmed by Candidate,</p>
                <div className="h-12 flex items-end justify-end">
                  <p className="text-gray-400 italic text-[11px] border-b border-gray-300 w-36 text-center">
                    {selectedOfferCandidate.status === 'Accepted' ? selectedOfferCandidate.name : 'Signature Required'}
                  </p>
                </div>
                <p className="font-bold text-gray-900">{selectedOfferCandidate.name}</p>
                <p className="text-gray-500 text-[11px]">Date: {formatDate(selectedOfferCandidate.joiningDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

