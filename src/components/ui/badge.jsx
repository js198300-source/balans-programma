import React from 'react'
export function Badge({children, className='', variant='default'}) {
  const variants = {
    default: 'bg-emerald-600 text-white',
    secondary: 'bg-slate-100 text-slate-700 border border-slate-200',
  };
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]||variants.default} ${className}`}>{children}</span>
}
