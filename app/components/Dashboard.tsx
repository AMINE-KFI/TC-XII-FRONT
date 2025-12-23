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
  HomeIcon,
  TicketIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts'

// IMPORT DES FUTURS COMPOSANTS (Ces fichiers seront créés dans les étapes suivantes)
// Vous aurez des erreurs d'import tant que nous n'avons pas créé les autres fichiers.
import InboxTicket from './InboxTicket'
import AllTicket from './AllTicket'
import Clients from './Clients'
import Statistique from './Statistique.tsx'
import Administration from './Administration'

// ============================================================================
// DONNÉES & COMPOSANTS SPÉCIFIQUES À L'OVERVIEW (GARDÉS ICI)
// ============================================================================

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
    <div className={`${color} p-6 rounded-2xl shadow-sm flex flex-col justify-between h-40 relative overflow-hidden transition-transform hover:scale-[1.02]`}>
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

function OverviewPage() {
    return (
        <div className="animate-fade-in-up">
            <div className="flex justify-end items-center gap-4 mb-8">
              <div className="relative">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search" className="bg-white border-none rounded-md py-2 pl-10 pr-4 text-sm w-64 shadow-sm focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <span className="text-gray-400 font-normal">from :</span>
                <button className="bg-white border border-gray-200 px-3 py-1.5 rounded flex items-center gap-2">10-06-2025 <ChevronDownIcon className="w-3 h-3" /></button>
                <span className="text-gray-400 font-normal">To :</span>
                <button className="bg-white border border-gray-200 px-3 py-1.5 rounded flex items-center gap-2">10-10-2025 <ChevronDownIcon className="w-3 h-3" /></button>
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-gray-400 mt-1">Overview of support activity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <StatCard title="Total Tickets" value="1,240" trend="+12%" color="bg-[#C7CDD8]" />
              <StatCard title="En attente" value="14" trend="+5%" color="bg-[#04093D]" textColor="text-white" />
              <StatCard title="Resolved (24h)" value="28" trend="+18%" color="bg-[#FCEE21]" />
              <StatCard title="Active Clients" value="890" trend="+2%" color="bg-[#C7CDD8]" />
            </div>

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
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} tickFormatter={(value) => `${value/1000}K`} />
                    <Tooltip cursor={{ stroke: '#4F46E5', strokeWidth: 1 }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    <Area type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
        </div>
    )
}

// ============================================================================
// MAIN APP SHELL
// ============================================================================
export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('Overview')

  const renderContent = () => {
    switch (activeMenu) {
      case 'Overview':
        return <OverviewPage />
      case 'Inbox Tickets':
        return <InboxTicket />
      case 'All Tickets':
        return <AllTicket />
      case 'Clients':
        return <Clients />
      case 'Statistics':
        return <Statistique />
      case 'Admin':
        return <Administration />
      default:
        return <OverviewPage />
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans text-slate-900">
      
      {/* --- TOP NAV --- */}
      <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveMenu('Overview')}>
              <div className="flex gap-1">{[...Array(4)].map((_,i) => (<div key={i} className="w-1.5 h-6 bg-[#FCEE21] rounded-full" style={{opacity: 1 - (i*0.2)}}></div>))}</div>
              <span className="font-bold text-xl tracking-tighter text-slate-800 uppercase leading-none">Doxa<br/><span className="font-light text-sm normal-case tracking-normal">Agent Portal</span></span>
           </div>
           <nav className="hidden md:flex gap-6 text-gray-400 font-medium text-sm ml-4">
              <button className="hover:text-black transition-colors">Help Center</button>
              <button className="hover:text-black transition-colors">Settings</button>
           </nav>
        </div>
        <div className="flex items-center gap-6">
           <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors"><BellIcon className="w-6 h-6 text-slate-600" /><span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span></button>
           <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
              <div className="text-right hidden md:block"><p className="text-sm font-bold text-slate-800 leading-none">John Smith</p><p className="text-xs text-gray-400 mt-1">Support Lead</p></div>
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold border-2 border-white shadow-md">JS</div>
           </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* --- SIDEBAR --- */}
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-[calc(100vh-5rem)] sticky top-20 overflow-y-auto">
          <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
            {[
              { id: 'Overview', label: 'Overview', icon: HomeIcon },
              { id: 'Inbox Tickets', label: 'Inbox Tickets', icon: InboxIcon, badge: 5 },
              { id: 'All Tickets', label: 'All Tickets', icon: TicketIcon },
              { id: 'Clients', label: 'Clients', icon: UsersIcon },
              { id: 'Statistics', label: 'Statistics', icon: ChartBarIcon },
              { id: 'Admin', label: 'Administration', icon: ShieldCheckIcon },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button key={item.id} onClick={() => setActiveMenu(item.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all duration-200 group ${activeMenu === item.id ? 'bg-[#141516] text-white shadow-md shadow-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-slate-900'}`}>
                  <div className="flex items-center gap-3"><Icon className={`w-5 h-5 ${activeMenu === item.id ? 'text-[#FCEE21]' : 'text-gray-400 group-hover:text-slate-900'}`} /><span>{item.label}</span></div>
                  {item.badge && (<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeMenu === item.id ? 'bg-[#FCEE21] text-black' : 'bg-gray-100 text-gray-600'}`}>{item.badge}</span>)}
                </button>
              )
            })}
          </nav>
          <div className="p-6 border-t border-gray-50"><div className="bg-gray-50 rounded-xl p-4"><p className="text-xs font-bold text-gray-400 uppercase mb-2">Performance</p><div className="flex justify-between items-end mb-1"><span className="text-2xl font-bold text-slate-900">98%</span><span className="text-xs text-green-600 font-bold">+2.4%</span></div><div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-[#FCEE21] w-[98%]"></div></div><p className="text-[10px] text-gray-400 mt-2">Satisfaction client</p></div></div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 p-8 lg:p-10 overflow-y-auto h-[calc(100vh-5rem)] bg-[#F8F9FB]">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}