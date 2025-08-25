import React from 'react'

export function Button({ children, className = '', variant = 'default', size='md', ...props }) {
  const base = 'inline-flex items-center justify-center font-medium transition rounded-xl focus:outline-none focus:ring disabled:opacity-60 disabled:pointer-events-none';
  const variants = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-400',
    outline: 'border border-slate-300 hover:bg-slate-50',
    secondary: 'bg-slate-100 hover:bg-slate-200',
  };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2', lg: 'px-5 py-2.5 text-base' };
  return <button className={`${base} ${variants[variant]||variants.default} ${sizes[size]||sizes.md} ${className}`} {...props}>{children}</button>
}
