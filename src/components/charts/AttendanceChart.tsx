'use client'

import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { day: 'Mon 27', present: 7, absent: 1, late: 0 },
  { day: 'Tue 28', present: 8, absent: 0, late: 1 },
  { day: 'Wed 29', present: 7, absent: 1, late: 0 },
  { day: 'Thu 30', present: 6, absent: 2, late: 1 },
  { day: 'Fri 31', present: 8, absent: 0, late: 0 },
  { day: 'Sat 01', present: 7, absent: 1, late: 0 },
  { day: 'Today', present: 6, absent: 1, late: 1 },
]

export default function AttendanceChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-64 w-full flex items-center justify-center text-xs text-gray-400">Loading chart...</div>
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
          <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Bar dataKey="present" name="Present" fill="#1B4332" radius={[4, 4, 0, 0]} />
          <Bar dataKey="late" name="Late Arrival" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          <Bar dataKey="absent" name="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

