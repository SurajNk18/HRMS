'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Banknote,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building2,
  Calendar,
  Zap,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react'
import { payrollRecords as initialPayroll, PayrollRecord } from '@/lib/data'
import { formatCurrency, statusColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>(initialPayroll)
  const [selectedPay, setSelectedPay] = useState<PayrollRecord>(initialPayroll[0])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcessAll = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setPayrolls(
        payrolls.map((p) => ({ ...p, status: 'Paid' }))
      )
      setIsProcessing(false)
      alert('Payroll for October 2026 successfully processed and disbursals marked Paid!')
    }, 1000)
  }

  const handlePrint = () => {
    window.print()
  }

  const totalGross = payrolls.reduce((a, b) => a + b.grossSalary, 0)
  const totalNet = payrolls.reduce((a, b) => a + b.netSalary, 0)
  const totalDeductions = payrolls.reduce((a, b) => a + b.totalDeductions, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <Banknote className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              9. Payroll Management & Payslip Generator
            </h2>
            <p className="text-xs text-gray-500">
              Accurate salary structure, monthly processing, PF/TDS statutory compliance and payslip disbursal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrint}
            className="text-xs"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5" />
            Print Current Payslip
          </Button>

          <Button
            size="sm"
            onClick={handleProcessAll}
            disabled={isProcessing}
            className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isProcessing ? 'Processing...' : 'Run October Payroll'}
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Gross Salary Disbursal</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalGross)}</p>
            <p className="text-[10px] text-gray-400">Total company expense</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Net Salary Payout</p>
            <p className="text-2xl font-bold text-emerald-800 mt-1">{formatCurrency(totalNet)}</p>
            <p className="text-[10px] text-emerald-600">Deposited to bank accounts</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Total Deductions</p>
            <p className="text-2xl font-bold text-rose-700 mt-1">{formatCurrency(totalDeductions)}</p>
            <p className="text-[10px] text-rose-600">PF + TDS + ESI compliance</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-xs">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-gray-500 uppercase">Payroll Cycle</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">Oct 2026</p>
            <p className="text-[10px] text-blue-600">Disbursed on 31st Oct</p>
          </CardContent>
        </Card>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Employee Payroll List */}
        <div className="space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-900">
                Staff Payroll Roster
              </CardTitle>
              <CardDescription className="text-xs">
                Select an employee to preview and print their official salary slip
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-3">
              {payrolls.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPay(p)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedPay.id === p.id
                      ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-gray-900">{p.empName}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">{p.department} • {p.empId}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-600 mt-2 pt-2 border-t border-gray-100">
                    <span>Gross: {formatCurrency(p.grossSalary)}</span>
                    <span className="font-bold text-emerald-800">Net: {formatCurrency(p.netSalary)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 2 Cols: Formatted Payslip View (Direct Match with Mockup in Image 1) */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-slate-200 rounded-2xl shadow-md p-6 sm:p-8 space-y-6 text-gray-800 font-sans">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b-2 border-[#1B4332] gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332] flex items-center justify-center text-white">
                  <Zap className="w-6 h-6 fill-white" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#1B4332] tracking-tight">
                    ISOLATIVE ELECTRICALS PRIVATE LIMITED
                  </h3>
                  <p className="text-xs text-gray-500">
                    Plot B-42, MIDC Khandala, Satara, MH - 412802
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase text-emerald-900">
                  Payslip — {selectedPay.month} {selectedPay.year}
                </p>
                <p className="text-[11px] text-gray-400">Doc Ref: IEL/PAY/{selectedPay.id}</p>
              </div>
            </div>

            {/* Employee Meta */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl text-xs border border-slate-200">
              <div>
                <span className="text-gray-400 text-[10px] block">Employee Name</span>
                <span className="font-bold text-gray-900">{selectedPay.empName}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Employee ID</span>
                <span className="font-mono font-bold text-emerald-800">{selectedPay.empId}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Department</span>
                <span className="font-semibold text-gray-800">{selectedPay.department}</span>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] block">Pay Period</span>
                <span className="font-semibold text-gray-800">{selectedPay.month} 2026</span>
              </div>
            </div>

            {/* Earnings and Deductions Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Earnings Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-emerald-50/80 px-3 py-2 border-b border-gray-200 font-bold text-emerald-950 flex justify-between">
                  <span>Earnings</span>
                  <span>Amount (₹)</span>
                </div>
                <div className="divide-y divide-gray-100 p-1">
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Basic Salary</span>
                    <span className="font-mono font-semibold">{formatCurrency(selectedPay.basicSalary)}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">House Rent Allowance (HRA)</span>
                    <span className="font-mono font-semibold">{formatCurrency(selectedPay.hra)}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Conveyance Allowance</span>
                    <span className="font-mono font-semibold">{formatCurrency(selectedPay.conveyance)}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Medical Allowance</span>
                    <span className="font-mono font-semibold">{formatCurrency(selectedPay.medical)}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Special & Production Allowance</span>
                    <span className="font-mono font-semibold">{formatCurrency(selectedPay.allowances)}</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 font-bold text-gray-900 border-t">
                    <span>Gross Earnings</span>
                    <span className="font-mono text-emerald-900">{formatCurrency(selectedPay.grossSalary)}</span>
                  </div>
                </div>
              </div>

              {/* Deductions Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-rose-50/80 px-3 py-2 border-b border-gray-200 font-bold text-rose-950 flex justify-between">
                  <span>Deductions</span>
                  <span>Amount (₹)</span>
                </div>
                <div className="divide-y divide-gray-100 p-1">
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Provident Fund (PF)</span>
                    <span className="font-mono font-semibold">{formatCurrency(selectedPay.pf)}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Employee State Insurance (ESI)</span>
                    <span className="font-mono font-semibold">{formatCurrency(selectedPay.esi)}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Tax Deducted at Source (TDS)</span>
                    <span className="font-mono font-semibold">{formatCurrency(selectedPay.tds)}</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Professional Tax (PT)</span>
                    <span className="font-mono font-semibold">₹200</span>
                  </div>
                  <div className="flex justify-between p-2">
                    <span className="text-gray-600">Other Deductions</span>
                    <span className="font-mono font-semibold">₹0</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-50 font-bold text-gray-900 border-t">
                    <span>Total Deductions</span>
                    <span className="font-mono text-rose-800">{formatCurrency(selectedPay.totalDeductions + 200)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Salary Highlight Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between shadow-xs">
              <div>
                <p className="text-xs text-emerald-200 uppercase tracking-wider font-semibold">
                  Net Salary Payable (In Bank Account)
                </p>
                <p className="text-2xl font-extrabold mt-0.5 font-mono">
                  {formatCurrency(selectedPay.netSalary - 200)}
                </p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-emerald-100">
                  {selectedPay.status.toUpperCase()}
                </span>
                <p className="text-[10px] text-emerald-200 mt-1">Direct NEFT Transfer</p>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="text-[10px] text-gray-400 text-center pt-4 border-t border-gray-100">
              This is a system generated document from Isolative Electricals Private Limited HRMS portal. No physical signature is required.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

