import React from 'react'
export function Input(props) {
  return <input {...props} className={`w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${props.className||''}`} />
}
