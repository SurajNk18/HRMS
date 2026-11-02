'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  FolderOpen,
  Search,
  Upload,
  Download,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  ShieldCheck,
  FileCheck,
  Plus,
} from 'lucide-react'
import { documents as initialDocs, Document } from '@/lib/data'
import { formatDate, statusColor } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { Label } from '@/components/ui/label'

export default function DocumentsPage() {
  const [docList, setDocList] = useState<Document[]>(initialDocs)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  // Upload state
  const [empName, setEmpName] = useState('Rajesh Kumar')
  const [docType, setDocType] = useState<Document['type']>('ID Proof')
  const [fileName, setFileName] = useState('')

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fileName) return
    const newDoc: Document = {
      id: `D00${docList.length + 1}`,
      empId: 'IEL001',
      empName,
      type: docType,
      name: fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`,
      uploadedOn: new Date().toISOString().split('T')[0],
      size: '1.4 MB',
      status: 'Verified',
    }
    setDocList([newDoc, ...docList])
    setIsUploadOpen(false)
    setFileName('')
  }

  const filtered = docList.filter((doc) => {
    const matchSearch =
      doc.empName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.empId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchType = typeFilter === 'All' || doc.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
            <FolderOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              Employee Document Management
            </h2>
            <p className="text-xs text-gray-500">
              Secure digital repository for employee KYC, certifications, appointments and statutory compliance
            </p>
          </div>
        </div>

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#1B4332] hover:bg-[#2D6A4F] text-xs">
              <Upload className="w-4 h-4 mr-1.5" />
              Upload Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base font-bold">Upload Employee Document</DialogTitle>
              <DialogDescription className="text-xs">
                Attach identity proof, educational certificate or tax record.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-3 py-2 text-xs">
              <div>
                <Label className="text-xs">Employee</Label>
                <select
                  className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                >
                  <option>Rajesh Kumar (IEL001)</option>
                  <option>Priya Sharma (IEL002)</option>
                  <option>Amit Desai (IEL003)</option>
                  <option>Sneha Patil (IEL004)</option>
                  <option>Vikas Mehta (IEL005)</option>
                  <option>Sanjay Gupta (IEL009)</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Document Category</Label>
                <select
                  className="w-full mt-1 border border-gray-200 rounded-md p-2 text-xs bg-white"
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as Document['type'])}
                >
                  <option>ID Proof</option>
                  <option>Address Proof</option>
                  <option>Qualification</option>
                  <option>Experience</option>
                  <option>Tax</option>
                  <option>Payslip</option>
                  <option>Policy</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Document File Name</Label>
                <Input
                  placeholder="e.g. BTech_Degree_Rajesh_Kumar.pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  required
                  className="text-xs mt-1"
                />
              </div>
              <div className="p-4 border-2 border-dashed border-gray-200 rounded-xl text-center space-y-1 bg-slate-50">
                <Upload className="w-6 h-6 text-gray-400 mx-auto" />
                <p className="text-xs font-semibold text-gray-700">Choose file or drag & drop</p>
                <p className="text-[10px] text-gray-400">PDF, PNG, JPG up to 10MB (Encrypted storage)</p>
              </div>
              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#1B4332] text-xs">
                  Upload & Secure
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <Input
                placeholder="Search by employee name or document..."
                className="pl-9 text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {['All', 'ID Proof', 'Qualification', 'Tax', 'Experience'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    typeFilter === t
                      ? 'bg-[#1B4332] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Records Table */}
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-gray-200 text-gray-600 font-semibold">
                <tr>
                  <th className="p-3">Document Title</th>
                  <th className="p-3">Employee</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">File Size</th>
                  <th className="p-3">Uploaded Date</th>
                  <th className="p-3">Verification</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-red-50 text-red-700">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{doc.name}</p>
                          <p className="text-[10px] text-gray-400">ID: {doc.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="font-semibold text-gray-800">{doc.empName}</p>
                      <p className="text-[10px] text-gray-400">{doc.empId}</p>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {doc.type}
                      </span>
                    </td>
                    <td className="p-3 text-gray-500 font-mono text-[11px]">{doc.size}</td>
                    <td className="p-3 text-gray-500">{formatDate(doc.uploadedOn)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs text-emerald-800 hover:bg-emerald-50"
                          onClick={() => alert(`Downloading ${doc.name}...`)}
                        >
                          <Download className="w-3.5 h-3.5 mr-1" />
                          Download
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
    </div>
  )
}

