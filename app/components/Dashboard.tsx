"use client"
import React, { useState } from 'react'
import { 
  InboxIcon, 
  UsersIcon, 
  ChartBarIcon, 
  BellIcon, 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ArrowUpRightIcon,
  Square2StackIcon
} from '@heroicons/react/24/outline'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'

// Mock data reflecting the chart in the image (Monthly trend)
const dataActivity = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 8000 },
  { name: 'Mar', value: 14000 },
  { name: 'Apr', value: 13000 },
  { name: 'May', value: 24000 },
  { name: 'Jun', value: 28000 },
  { name: 'Jul', value: 19000 },
  { name: 'Aug', value: 22000 },
  { name: 'Sep', value: 17000 },
  { name: 'Oct', value: 22000 },
]

function StatCard({ title, value, trend, color, textColor = "text-gray-500" }: any) {
  return (
    <div className={`${color} p-6 rounded-2xl shadow-sm flex flex-col justify-between h-40 relative overflow-hidden`}>
      <div>
        <p className={`${textColor} text-lg font-medium`}>{title}</p>
        <h3 className={`text-3xl font-bold mt-2 ${textColor === 'text-gray-500' ? 'text-slate-900' : 'text-white'}`}>
          {value}
        </h3>
      </div>
      <div className="flex items-center gap-1 self-end bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
        <span className={`text-xs font-bold ${textColor === 'text-gray-500' ? 'text-slate-900' : 'text-white'}`}>{trend}</span>
        <ArrowUpRightIcon className={`w-3 h-3 ${textColor === 'text-gray-500' ? 'text-slate-900' : 'text-white'}`} />
      </div>
    </div>
  )
}

export default function AgentDashboard() {
  const [activeMenu, setActiveMenu] = useState('Overview')

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans">
      
      {/* --- TOP NAV --- */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(4)].map((_,i) => <div key={i} className="w-1.5 h-6 bg-blue-700 rounded-full" style={{opacity: 1 - (i*0.2)}}></div>)}
              </div>
              <span className="font-bold text-xl tracking-tighter text-slate-800 uppercase leading-none">
                Client<br/><span className="font-light">Service</span>
              </span>
           </div>
           <nav className="hidden md:flex gap-6 text-gray-400 font-medium text-sm ml-4">
              <a href="#" className="hover:text-blue-600">Contact</a>
           </nav>
        </div>
        
        <div className="flex items-center gap-4">
           <BellIcon className="w-8 h-8 text-slate-800 stroke-[1.5]" />
           <div className="w-10 h-10 rounded-full border-2 border-slate-800 flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-slate-800" />
           </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col sticky top-20 h-[calc(100vh-5rem)]">
          <nav className="flex-1 py-8 flex flex-col gap-2">
            {[
              { id: 'Overview', label: 'Overview' },
              { id: 'Inbox Tickets', label: 'Inbox Tickets' },
              { id: 'Clients', label: 'Clients' },
              { id: 'Statistics', label: 'Statistics' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`mx-4 py-3 px-6 rounded-lg text-left font-medium transition-all
                ${activeMenu === item.id ? 'bg-[#FCEE21] text-slate-900' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Profile in Sidebar */}
          <div className="p-6 border-t border-gray-50">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
                   <UsersIcon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-800">John Smith</p>
                   <p className="text-xs text-gray-400">john@nibble.com</p>
                </div>
             </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-10">
          <div className="max-w-6xl mx-auto">
            
            {/* Search & Date Filter */}
            <div className="flex justify-end items-center gap-4 mb-8">
              <div className="relative">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-gray-100/50 border-none rounded-md py-2 pl-10 pr-4 text-sm w-64 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <span className="text-gray-400 font-normal">from :</span>
                <button className="bg-white border border-gray-200 px-3 py-1.5 rounded flex items-center gap-2">
                  10-06-2025 <ChevronDownIcon className="w-3 h-3" />
                </button>
                <span className="text-gray-400 font-normal">To :</span>
                <button className="bg-white border border-gray-200 px-3 py-1.5 rounded flex items-center gap-2">
                  10-10-2025 <ChevronDownIcon className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-gray-400 mt-1">Overview of support activity</p>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <StatCard title="total Tickets" value="1,240" trend="+12%" color="bg-[#C7CDD8]" />
              <StatCard title="En attente" value="14" trend="+5%" color="bg-[#04093D]" textColor="text-white" />
              <StatCard title="Resolved(24h)" value="28" trend="+18%" color="bg-[#FCEE21]" />
              <StatCard title="Active Clients" value="890" trend="+2%" color="bg-[#C7CDD8]" />
            </div>

            {/* BIG CHART */}
            <div className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-slate-800">Activity</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-xs font-bold text-slate-800">This year</span>
                </div>
              </div>
              
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dataActivity}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#9CA3AF', fontSize: 12}} 
                      dy={15}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#9CA3AF', fontSize: 12}} 
                      tickFormatter={(value) => `${value/1000}K`}
                    />
                    <Tooltip cursor={{ stroke: '#4F46E5', strokeWidth: 1 }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#4F46E5" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#colorVal)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* --- FOOTER --- */}
      
    </div>
  )
}