"use client"
import React, { useState, useEffect } from 'react'
import { 
  InboxIcon, 
  UsersIcon, 
  ChartBarIcon, 
  BellIcon, 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ArrowUpRightIcon,
  // Icons from previous Inbox/Clients logic
  CheckCircleIcon,
  ClockIcon,
  FunnelIcon, 
  ChatBubbleLeftEllipsisIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
  CpuChipIcon,
  PaperAirplaneIcon,
  XCircleIcon,
  PauseCircleIcon,
  ArrowDownTrayIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

// ============================================================================
// 1. MOCK DATA
// ============================================================================

// Data for the Chart (Overview)
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

// Data for Inbox
const initialTicketsData = [
  { id: 1, client: 'Amine Benali', avatar: 'AB', subject: 'Erreur lors du paiement CB', message: 'Je reçois une erreur 404 quand je valide mon panier...', status: 'Nouveau', priority: 'Haute', date: 'Il y a 10 min', unread: true, isAiResolved: false },
  { id: 2, client: 'Sophie Martin', avatar: 'SM', subject: 'Demande de remboursement', message: 'Le produit reçu ne correspond pas à la description...', status: 'En cours', priority: 'Moyenne', date: 'Il y a 1h', unread: false, isAiResolved: false },
  { id: 3, client: 'Karim Ziani', avatar: 'KZ', subject: 'Bug affichage Dashboard', message: 'Les graphiques ne se chargent pas sur Safari...', status: 'En cours', priority: 'Basse', date: 'Il y a 3h', unread: false, isAiResolved: false },
  { id: 4, client: 'Tech Corp', avatar: 'TC', subject: 'Facture manquante Octobre', message: 'Nous avons besoin de la facture pour la comptabilité.', status: 'Résolu', priority: 'Moyenne', date: 'Hier', unread: false, isAiResolved: false },
  { id: 5, client: 'Lina Dou', avatar: 'LD', subject: 'Problème connexion API', message: 'Ma clé API semble invalide depuis ce matin.', status: 'Nouveau', priority: 'Critique', date: 'Hier', unread: true, isAiResolved: false },
  { id: 6, client: 'John Doe', avatar: 'JD', subject: 'Réinitialisation mot de passe', message: 'Fait automatiquement.', status: 'Résolu', priority: 'Basse', date: 'Hier', unread: false, isAiResolved: true },
]

// Data for Clients Page
const clientsData = [
  { id: 'CL-001', prenom: 'Amine', nom: 'Benali', societe: 'Tech Solutions', email: 'amine@tech.com', phone: '0550 12 34 56', date: '2023-10-15', status: 'Actif' },
  { id: 'CL-002', prenom: 'Sophie', nom: 'Martin', societe: 'Design Studio', email: 'sophie@design.com', phone: '0561 22 33 44', date: '2023-11-02', status: 'Actif' },
  { id: 'CL-003', prenom: 'Karim', nom: 'Ziani', societe: 'Freelance', email: 'karim.z@gmail.com', phone: '0770 99 88 77', date: '2023-09-10', status: 'Inactif' },
  { id: 'CL-004', prenom: 'Lina', nom: 'Dou', societe: 'StartUp Inc', email: 'lina@startup.io', phone: '0661 55 66 77', date: '2023-12-01', status: 'Actif' },
  { id: 'CL-005', prenom: 'John', nom: 'Doe', societe: '-', email: 'john.doe@test.com', phone: '0555 00 00 00', date: '2023-08-20', status: 'Suspendu' },
  { id: 'CL-006', prenom: 'Sarah', nom: 'Connor', societe: 'Cyberdyne', email: 'sarah@future.net', phone: '0540 11 22 33', date: '2024-01-05', status: 'Actif' },
]

// ============================================================================
// 2. COMPONENTS
// ============================================================================

// --- StatCard (New Design) ---
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

// --- Overview Page (New Design) ---
function OverviewPage() {
    return (
        <div className="animate-fade-in-up">
            {/* Search & Date Filter */}
            <div className="flex justify-end items-center gap-4 mb-8">
              <div className="relative">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="bg-white border-none rounded-md py-2 pl-10 pr-4 text-sm w-64 shadow-sm focus:ring-1 focus:ring-blue-500"
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

// --- Inbox Page (With Chat & Closure) ---
function InboxPage() {
  const [tickets, setTickets] = useState(initialTicketsData)
  const [filter, setFilter] = useState('Tous')
  const [showAiResolved, setShowAiResolved] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [chatMessage, setChatMessage] = useState('')
  const [showCloseModal, setShowCloseModal] = useState(false)

  const confirmCloseTicket = (status: 'Résolu' | 'Non résolu' | 'En attente') => {
    const updatedTickets = tickets.map(t => 
        t.id === selectedTicket.id 
        ? { ...t, status: 'Résolu', priority: status === 'Non résolu' ? 'Critique' : 'Basse' } 
        : t
    )
    setTickets(updatedTickets)
    setShowCloseModal(false)
    setSelectedTicket(null) 
  }

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'Non lus' && !ticket.unread) return false
    if (filter === 'En cours' && ticket.status !== 'En cours' && ticket.status !== 'Nouveau') return false
    if (filter === 'Résolus' && ticket.status !== 'Résolu') return false
    if (filter === 'Résolus' && showAiResolved && !ticket.isAiResolved) return false
    return true
  })

  // CHAT MODE
  if (selectedTicket) {
    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in-up relative">
            
            {showCloseModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-gray-100 animate-scale-in">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Clôturer le ticket</h3>
                        <p className="text-sm text-gray-500 mb-6">Sélectionnez le statut final.</p>
                        <div className="space-y-3">
                            <button onClick={() => confirmCloseTicket('Résolu')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-green-500 hover:bg-green-50 group transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-full text-green-600 group-hover:bg-green-200"><CheckCircleIcon className="w-5 h-5" /></div>
                                    <span className="font-bold text-gray-700 group-hover:text-green-800">Problème Résolu</span>
                                </div>
                            </button>
                            <button onClick={() => confirmCloseTicket('Non résolu')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-red-500 hover:bg-red-50 group transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-full text-red-600 group-hover:bg-red-200"><XCircleIcon className="w-5 h-5" /></div>
                                    <span className="font-bold text-gray-700 group-hover:text-red-800">Non Résolu</span>
                                </div>
                            </button>
                            <button onClick={() => confirmCloseTicket('En attente')} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50 group transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-full text-orange-600 group-hover:bg-orange-200"><PauseCircleIcon className="w-5 h-5" /></div>
                                    <span className="font-bold text-gray-700 group-hover:text-orange-800">Mettre en attente</span>
                                </div>
                            </button>
                        </div>
                        <button onClick={() => setShowCloseModal(false)} className="mt-6 w-full py-3 text-sm font-bold text-gray-500 hover:text-gray-900">Annuler</button>
                    </div>
                </div>
            )}

            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-white rounded-full border border-transparent hover:border-gray-200 transition-all text-gray-500">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <div>
                        <h3 className="font-bold text-gray-900">{selectedTicket.subject}</h3>
                        <p className="text-xs text-gray-500">Client: {selectedTicket.client} • Priorité: {selectedTicket.priority}</p>
                    </div>
                </div>
                <button onClick={() => setShowCloseModal(true)} className="flex items-center gap-2 px-6 py-2.5 bg-[#141516] text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-md">
                    Clôturer le ticket
                </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-white space-y-6">
                <div className="flex justify-start">
                    <div className="max-w-[70%]">
                        <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none text-sm text-gray-800">{selectedTicket.message}</div>
                        <span className="text-[10px] text-gray-400 mt-1 ml-2 block">Client • {selectedTicket.date}</span>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="max-w-[70%]">
                        <div className="bg-[#714BD2] p-4 rounded-2xl rounded-tr-none text-sm text-white">
                            Bonjour {selectedTicket.client.split(' ')[0]}, je prends en charge votre demande. Je vérifie cela immédiatement.
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 mr-2 block text-right">Moi • À l'instant</span>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-100">
                <div className="flex gap-3">
                    <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder="Écrire une réponse..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#714BD2]" />
                    <button className="p-3 bg-[#141516] text-white rounded-xl hover:bg-black">
                        <PaperAirplaneIcon className="w-5 h-5 -rotate-45 translate-x-[-1px] translate-y-[1px]" />
                    </button>
                </div>
            </div>
        </div>
    )
  }

  // LIST MODE
  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Boîte de réception</h2>
          <p className="text-gray-500 text-sm">Gérez les tickets et les demandes clients.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors">
            <FunnelIcon className="w-4 h-4" /> Filtrer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors">
            <ArrowPathIcon className="w-4 h-4" /> Actualiser
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 border-b border-gray-100 overflow-x-auto bg-gray-50/50">
            <div className="flex gap-6">
                {['Tous', 'Non lus', 'En cours', 'Résolus'].map((tab) => (
                    <button key={tab} onClick={() => { setFilter(tab); setShowAiResolved(false); }} className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${filter === tab ? 'border-[#714BD2] text-[#714BD2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    {tab}
                    </button>
                ))}
            </div>
            {filter === 'Résolus' && (
                <div className="flex items-center gap-2 py-2">
                    <button onClick={() => setShowAiResolved(!showAiResolved)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${showAiResolved ? 'bg-[#FCEE21] border-[#FCEE21] text-black' : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'}`}>
                        <CpuChipIcon className="w-4 h-4" /> Résolu par AI
                    </button>
                </div>
            )}
        </div>

        <div className="overflow-y-auto flex-1 p-2">
          {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} onClick={() => setSelectedTicket(ticket)} className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:border-gray-200 hover:bg-gray-50 ${ticket.unread ? 'bg-gray-50/50' : 'bg-white'}`}>
                  <input type="checkbox" onClick={(e) => e.stopPropagation()} className="w-4 h-4 rounded border-gray-300 text-[#714BD2] focus:ring-[#714BD2] ml-2" />
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0 relative">
                    {ticket.avatar}
                    {ticket.isAiResolved && (<div className="absolute -bottom-1 -right-1 bg-[#FCEE21] rounded-full p-0.5 border border-white" title="Résolu par IA"><CpuChipIcon className="w-3 h-3 text-black" /></div>)}
                  </div>
                  <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-5">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm font-bold ${ticket.unread ? 'text-gray-900' : 'text-gray-600'}`}>{ticket.subject}</span>
                        {ticket.unread && <span className="w-2 h-2 bg-[#FCEE21] rounded-full"></span>}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{ticket.message}</p>
                    </div>
                    <div className="md:col-span-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${ticket.status === 'Nouveau' ? 'bg-blue-50 text-blue-600' : ticket.status === 'En cours' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>{ticket.status}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${ticket.priority === 'Critique' ? 'border-red-200 text-red-600 bg-red-50' : ticket.priority === 'Haute' ? 'border-orange-200 text-orange-600 bg-orange-50' : 'border-gray-200 text-gray-500'}`}>{ticket.priority}</span>
                    </div>
                    <div className="md:col-span-3 text-right">
                       <p className="text-xs font-bold text-gray-900">{ticket.client}</p>
                       <p className="text-[10px] text-gray-400">{ticket.date}</p>
                    </div>
                    <div className="md:col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 hover:bg-white rounded-full shadow-sm text-gray-500 hover:text-[#714BD2]"><ChatBubbleLeftEllipsisIcon className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <InboxIcon className="w-12 h-12 mb-2 opacity-20" />
                  <p className="text-sm">Aucun ticket trouvé.</p>
              </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- Clients Page ---
function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [filteredClients, setFilteredClients] = useState(clientsData)

  useEffect(() => {
    let results = clientsData
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase()
      results = results.filter(client => 
        client.nom.toLowerCase().includes(lowerTerm) ||
        client.prenom.toLowerCase().includes(lowerTerm) ||
        client.societe.toLowerCase().includes(lowerTerm) ||
        client.id.toLowerCase().includes(lowerTerm) ||
        client.email.toLowerCase().includes(lowerTerm)
      )
    }
    if (startDate) results = results.filter(client => new Date(client.date) >= new Date(startDate))
    if (endDate) results = results.filter(client => new Date(client.date) <= new Date(endDate))
    setFilteredClients(results)
  }, [searchTerm, startDate, endDate])

  const handleReset = () => {
    setSearchTerm('')
    setStartDate('')
    setEndDate('')
  }

  return (
    <div className="flex flex-col h-full animate-fade-in-up space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Clients</h2>
          <p className="text-gray-500 text-sm">Consultez et gérez la base de données clients.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <ArrowDownTrayIcon className="w-5 h-5" /> Exporter CSV
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Rechercher</label>
            <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Nom, Société, ID, Email..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714BD2] transition-all text-sm" />
            </div>
        </div>
        <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Inscrit après le</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714BD2] text-sm text-gray-600" />
        </div>
        <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Inscrit avant le</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714BD2] text-sm text-gray-600" />
        </div>
        <div className="md:col-span-1">
            <button onClick={handleReset} className="w-full py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm font-bold flex items-center justify-center" title="Réinitialiser les filtres"><FunnelIcon className="w-5 h-5" /></button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Société</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date Inscription</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredClients.length > 0 ? (
                        filteredClients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><UserCircleIcon className="w-6 h-6" /></div>
                                        <div><p className="text-sm font-bold text-gray-900">{client.prenom} {client.nom}</p><p className="text-xs text-gray-400 font-mono">{client.id}</p></div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><p className="text-sm font-medium text-gray-700">{client.societe}</p></td>
                                <td className="px-6 py-4"><div className="flex flex-col"><span className="text-sm text-gray-600">{client.email}</span><span className="text-xs text-gray-400">{client.phone}</span></div></td>
                                <td className="px-6 py-4"><span className="text-sm text-gray-600">{client.date}</span></td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${client.status === 'Actif' ? 'bg-green-50 text-green-700 border-green-100' : client.status === 'Inactif' ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-red-50 text-red-700 border-red-100'}`}>{client.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right"><button className="text-xs font-bold text-[#714BD2] hover:underline">Voir profil</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400"><div className="flex flex-col items-center justify-center gap-2"><MagnifyingGlassIcon className="w-8 h-8 opacity-20" /><p>Aucun client ne correspond à votre recherche.</p></div></td></tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 3. MAIN APP SHELL
// ============================================================================
export default function AgentDashboard() {
  const [activeMenu, setActiveMenu] = useState('Overview')

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans text-slate-900">
      
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
        <main className="flex-1 p-10 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full">
            {activeMenu === 'Overview' && <OverviewPage />}
            {activeMenu === 'Inbox Tickets' && <InboxPage />}
            {activeMenu === 'Clients' && <ClientsPage />}
            {activeMenu === 'Statistics' && <div className="text-center text-gray-400 mt-20">Page Statistiques en construction...</div>}
          </div>
        </main>
      </div>
    </div>
  )
}
