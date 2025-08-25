import React from 'react'
export function Switch({ checked, onCheckedChange }) {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={e => onCheckedChange?.(e.target.checked)} />
      <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-emerald-600 relative transition">
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`}></div>
      </div>
    </label>
  )
}
