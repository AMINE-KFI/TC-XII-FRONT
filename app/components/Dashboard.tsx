"use client"
import React, { useState } from 'react'
import { 
  HomeIcon, 
  InboxIcon, 
  UsersIcon, 
  ChartBarIcon, 
  BellIcon, 
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'

const dataActivity = [
  { name: 'Lun', tickets: 12, resolus: 8 },
  { name: 'Mar', tickets: 19, resolus: 15 },
  { name: 'Mer', tickets: 15, resolus: 12 },
  { name: 'Jeu', tickets: 25, resolus: 20 },
  { name: 'Ven', tickets: 32, resolus: 28 },
  { name: 'Sam', tickets: 10, resolus: 9 },
  { name: 'Dim', tickets: 5, resolus: 4 },
]
const recentTickets = [
  { id: 101, client: 'Amine Benali', subject: 'Erreur Paiement', status: 'Nouveau', priority: 'Haute', time: '10 min' },
  { id: 102, client: 'Sophie Martin', subject: 'Accès compte', status: 'En cours', priority: 'Moyenne', time: '1h' },
  { id: 103, client: 'Karim Ziani', subject: 'Bug affichage', status: 'En cours', priority: 'Basse', time: '3h' },
  { id: 104, client: 'Entreprise X', subject: 'Facture manquante', status: 'Résolu', priority: 'Moyenne', time: '1j' },
]

function StatCard({ title, value, trend, icon: Icon, color }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{trend}</span>
                    <span className="text-gray-400 font-normal">vs hier</span>
                </div>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
    )
}


export default function AgentDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard')

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex font-sans text-gray-900 pt-24">

      <aside className="w-20 lg:w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-24 h-[calc(100vh-6rem)] z-20 transition-all duration-300 overflow-y-auto">
        
       <div className="h-16 flex items-center justify-center lg:justify-start lg:px-8 border-b border-gray-100 shrink-0">
             <span className="hidden lg:block font-extrabold text-xl tracking-tight text-gray-400">MENU</span>
        </div>


        <nav className="flex-1 py-6 px-4 space-y-2">
            {[
                { id: 'dashboard', label: 'Vue d\'ensemble', icon: HomeIcon },
                { id: 'inbox', label: 'Inbox Tickets', icon: InboxIcon, badge: 3 },
                { id: 'clients', label: 'Clients', icon: UsersIcon },
                { id: 'analytics', label: 'Statistiques', icon: ChartBarIcon },
            ].map((item) => (
                <button 
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                    ${activeMenu === item.id 
                        ? 'bg-[#141516] text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-[#714BD2]'}`}
                >
                    <item.icon className="w-6 h-6" />
                    <span className="hidden lg:block font-medium">{item.label}</span>
                    {item.badge && (
                        <span className="hidden lg:flex absolute right-3 w-5 h-5 bg-[#FCEE21] text-black text-xs font-bold rounded-full items-center justify-center">
                            {item.badge}
                        </span>
                    )}
                </button>
            ))}
        </nav>


        <div className="p-4 border-t border-gray-100 shrink-0">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                    <div className="w-full h-full bg-[#714BD2] flex items-center justify-center text-white font-bold">A</div>
                </div>
                <div className="hidden lg:block">
                    <p className="text-sm font-bold text-gray-900">Agent Doxa</p>
                    <p className="text-xs text-gray-400">Support N2</p>
                </div>
            </div>
        </div>
      </aside>

      {/* 2. CONTENU PRINCIPAL */}
      {/* Pas besoin de changer grand chose ici, le padding du parent (pt-24) gère la descente */}
      <main className="flex-1 ml-20 lg:ml-64 p-6 lg:p-10 transition-all duration-300">
        
        {/* Header Dashboard */}
        <header className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                <p className="text-gray-500 text-sm">Aperçu de l'activité du support.</p>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center bg-white px-4 py-2.5 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-[#FCEE21] transition-all">
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
                    <input type="text" placeholder="Rechercher un ticket..." className="bg-transparent outline-none text-sm w-48" />
                </div>
                <button className="p-2.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 relative">
                    <BellIcon className="w-6 h-6 text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>


        {/* STATISTIQUES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard title="Tickets Total" value="1,240" trend="+12%" icon={InboxIcon} color="bg-blue-500" />
            <StatCard title="En attente" value="14" trend="+5%" icon={ClockIcon} color="bg-[#FCEE21] !text-black" />
            <StatCard title="Résolus (24h)" value="28" trend="+18%" icon={CheckCircleIcon} color="bg-green-500" />
            <StatCard title="Clients Actifs" value="890" trend="+2%" icon={UsersIcon} color="bg-[#714BD2]" />
        </div>


        {/* GRAPHIQUES & INBOX */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* GRAPHE */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Activité</h3>
                    <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-3 py-1">
                        <option>Cette semaine</option>
                    </select>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dataActivity}>
                            <defs>
                                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#714BD2" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#714BD2" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Area type="monotone" dataKey="tickets" stroke="#714BD2" strokeWidth={3} fillOpacity={1} fill="url(#colorTickets)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* INBOX */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg">Inbox (Urgent)</h3>
                    <button className="text-xs font-bold text-[#714BD2] hover:underline">Voir tout</button>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[300px]">
                    {recentTickets.map((ticket) => (
                        <div key={ticket.id} className="p-4 rounded-xl border border-gray-100 hover:border-[#FCEE21] hover:bg-gray-50 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${ticket.priority === 'Haute' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {ticket.priority}
                                </span>
                                <span className="text-xs text-gray-400">{ticket.time}</span>
                            </div>
                            <h4 className="font-bold text-sm text-gray-900 mb-1 group-hover:text-[#714BD2]">{ticket.subject}</h4>
                            <p className="text-xs text-gray-500">{ticket.client}</p>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 bg-[#141516] text-white font-bold py-3 rounded-xl hover:bg-black transition-all">
                    Traiter le prochain ticket
                </button>
            </div>
        </div>
      </main>
    </div>
  )
}