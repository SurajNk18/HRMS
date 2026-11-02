'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  subtitle?: string
  trend?: string
  trendUp?: boolean
  color?: string // Tailwind bg class for the icon circle
}

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  trend,
  trendUp = true,
  color = 'bg-emerald-50 text-emerald-700',
}: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 border-gray-200/80">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold tracking-tight text-gray-900">{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          <div className={`p-2.5 rounded-xl flex items-center justify-center ${color}`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] ${
                trendUp
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'bg-rose-50 text-rose-700 font-semibold'
              }`}
            >
              {trendUp ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5 inline" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5 inline" />
              )}
              {trend}
            </span>
            <span className="text-gray-400 text-[11px]">vs previous month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

