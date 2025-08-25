import React from 'react'

export function Card({ children, className='' }) {
  return <div className={`bg-white border border-slate-200 shadow-sm ${className}`}>{children}</div>
}
export function CardHeader({ children, className='' }) {
  return <div className={`p-4 border-b border-slate-100 ${className}`}>{children}</div>
}
export function CardTitle({ children, className='' }) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}
export function CardDescription({ children, className='' }) {
  return <p className={`text-sm text-slate-500 ${className}`}>{children}</p>
}
export function CardContent({ children, className='' }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}
export function CardFooter({ children, className='' }) {
  return <div className={`p-4 border-t border-slate-100 ${className}`}>{children}</div>
}
