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
  UserCircleIcon,
  HomeIcon,
  TicketIcon,
  ShieldCheckIcon,
  UserPlusIcon, 
  TrashIcon, 
  PencilSquareIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts'

// ============================================================================
// 1. DONNÉES (MOCK DATA)
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

const weeklyData = [
  { name: 'Lun', tickets: 40 },
  { name: 'Mar', tickets: 30 },
  { name: 'Mer', tickets: 55 },
  { name: 'Jeu', tickets: 45 },
  { name: 'Ven', tickets: 60 },
  { name: 'Sam', tickets: 20 },
  { name: 'Dim', tickets: 15 },
]

const satisfactionData = [
  { name: 'Satisfait', value: 65, color: '#4ADE80' },
  { name: 'Neutre', value: 25, color: '#FACC15' },
  { name: 'Insatisfait', value: 10, color: '#F87171' },
]

const initialTicketsData = [
  { id: 1, client: 'Amine Benali', avatar: 'AB', subject: 'Erreur lors du paiement CB', message: 'Je reçois une erreur 404 quand je valide mon panier...', status: 'Nouveau', priority: 'Haute', date: 'Il y a 10 min', unread: true, isAiResolved: false },
  { id: 2, client: 'Sophie Martin', avatar: 'SM', subject: 'Demande de remboursement', message: 'Le produit reçu ne correspond pas à la description...', status: 'En cours', priority: 'Moyenne', date: 'Il y a 1h', unread: false, isAiResolved: false },
  { id: 3, client: 'Karim Ziani', avatar: 'KZ', subject: 'Bug affichage Dashboard', message: 'Les graphiques ne se chargent pas sur Safari...', status: 'En cours', priority: 'Basse', date: 'Il y a 3h', unread: false, isAiResolved: false },
  { id: 4, client: 'Tech Corp', avatar: 'TC', subject: 'Facture manquante Octobre', message: 'Nous avons besoin de la facture pour la comptabilité.', status: 'Résolu', priority: 'Moyenne', date: 'Hier', unread: false, isAiResolved: false },
  { id: 5, client: 'Lina Dou', avatar: 'LD', subject: 'Problème connexion API', message: 'Ma clé API semble invalide depuis ce matin.', status: 'Nouveau', priority: 'Critique', date: 'Hier', unread: true, isAiResolved: false },
  { id: 6, client: 'John Doe', avatar: 'JD', subject: 'Réinitialisation mot de passe', message: 'Fait automatiquement.', status: 'Résolu', priority: 'Basse', date: 'Hier', unread: false, isAiResolved: true },
]

const clientsData = [
  { id: 'CL-001', prenom: 'Amine', nom: 'Benali', societe: 'Tech Solutions', email: 'amine@tech.com', phone: '0550 12 34 56', date: '2023-10-15', status: 'Actif' },
  { id: 'CL-002', prenom: 'Sophie', nom: 'Martin', societe: 'Design Studio', email: 'sophie@design.com', phone: '0561 22 33 44', date: '2023-11-02', status: 'Actif' },
  { id: 'CL-003', prenom: 'Karim', nom: 'Ziani', societe: 'Freelance', email: 'karim.z@gmail.com', phone: '0770 99 88 77', date: '2023-09-10', status: 'Inactif' },
  { id: 'CL-004', prenom: 'Lina', nom: 'Dou', societe: 'StartUp Inc', email: 'lina@startup.io', phone: '0661 55 66 77', date: '2023-12-01', status: 'Actif' },
  { id: 'CL-005', prenom: 'John', nom: 'Doe', societe: '-', email: 'john.doe@test.com', phone: '0555 00 00 00', date: '2023-08-20', status: 'Suspendu' },
  { id: 'CL-006', prenom: 'Sarah', nom: 'Connor', societe: 'Cyberdyne', email: 'sarah@future.net', phone: '0540 11 22 33', date: '2024-01-05', status: 'Actif' },
]

const allTicketsList = [
  { id: 'TKT-1024', subject: 'Erreur Paiement', client: 'Amine Benali', priority: 'Haute', status: 'Nouveau', date: '22/12/2025', agent: 'IA' },
  { id: 'TKT-1025', subject: 'Accès compte bloqué', client: 'Sophie Martin', priority: 'Moyenne', status: 'En cours', date: '21/12/2025', agent: 'John Smith' },
  { id: 'TKT-1026', subject: 'Bug affichage mobile', client: 'Karim Ziani', priority: 'Basse', status: 'Résolu', date: '20/12/2025', agent: 'IA' },
  { id: 'TKT-1027', subject: 'Facture manquante', client: 'Tech Corp', priority: 'Moyenne', status: 'Résolu', date: '19/12/2025', agent: 'John Smith' },
  { id: 'TKT-1028', subject: 'API Key invalide', client: 'Lina Dou', priority: 'Critique', status: 'Nouveau', date: '22/12/2025', agent: '-' },
]

const initialAgents = [
  { id: 1, nom: 'Smith', prenom: 'John', fonction: 'Support N2', identifiant: 'john.s' },
  { id: 2, nom: 'Doe', prenom: 'Jane', fonction: 'Admin', identifiant: 'jane.d' },
  { id: 3, nom: 'Wayne', prenom: 'Bruce', fonction: 'Support N1', identifiant: 'batman' },
]

// ============================================================================
// 2. SOUS-COMPOSANTS (PAGES INTERNES)
// ============================================================================

// --- PAGE 1: OVERVIEW ---
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

// --- PAGE 2: INBOX ---
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

  // MODE CHAT
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
                    <button onClick={() => setSelectedTicket(null)} className="p-2 hover:bg-white rounded-full border border-transparent hover:border-gray-200 transition-all text-gray-500"><ArrowLeftIcon className="w-5 h-5" /></button>
                    <div><h3 className="font-bold text-gray-900">{selectedTicket.subject}</h3><p className="text-xs text-gray-500">Client: {selectedTicket.client} • Priorité: {selectedTicket.priority}</p></div>
                </div>
                <button onClick={() => setShowCloseModal(true)} className="flex items-center gap-2 px-6 py-2.5 bg-[#141516] text-white text-sm font-bold rounded-xl hover:bg-black transition-all shadow-md">Clôturer le ticket</button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-white space-y-6">
                <div className="flex justify-start"><div className="max-w-[70%]"><div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none text-sm text-gray-800">{selectedTicket.message}</div><span className="text-[10px] text-gray-400 mt-1 ml-2 block">Client • {selectedTicket.date}</span></div></div>
                <div className="flex justify-end"><div className="max-w-[70%]"><div className="bg-[#714BD2] p-4 rounded-2xl rounded-tr-none text-sm text-white">Bonjour {selectedTicket.client.split(' ')[0]}, je prends en charge votre demande.</div><span className="text-[10px] text-gray-400 mt-1 mr-2 block text-right">Moi • À l'instant</span></div></div>
            </div>

            <div className="p-4 border-t border-gray-100"><div className="flex gap-3"><input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder="Écrire une réponse..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#714BD2]" /><button className="p-3 bg-[#141516] text-white rounded-xl hover:bg-black"><PaperAirplaneIcon className="w-5 h-5 -rotate-45 translate-x-[-1px] translate-y-[1px]" /></button></div></div>
        </div>
    )
  }

  // MODE LISTE
  return (
    <div className="flex flex-col h-full animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div><h2 className="text-2xl font-bold text-gray-900">Boîte de réception</h2><p className="text-gray-500 text-sm">Gérez les tickets et les demandes clients.</p></div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors"><FunnelIcon className="w-4 h-4" /> Filtrer</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors"><ArrowPathIcon className="w-4 h-4" /> Actualiser</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 border-b border-gray-100 overflow-x-auto bg-gray-50/50">
            <div className="flex gap-6">
                {['Tous', 'Non lus', 'En cours', 'Résolus'].map((tab) => (
                    <button key={tab} onClick={() => { setFilter(tab); setShowAiResolved(false); }} className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${filter === tab ? 'border-[#714BD2] text-[#714BD2]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{tab}</button>
                ))}
            </div>
            {filter === 'Résolus' && (<div className="flex items-center gap-2 py-2"><button onClick={() => setShowAiResolved(!showAiResolved)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${showAiResolved ? 'bg-[#FCEE21] border-[#FCEE21] text-black' : 'bg-white border-gray-300 text-gray-500 hover:border-gray-400'}`}><CpuChipIcon className="w-4 h-4" /> Résolu par AI</button></div>)}
        </div>

        <div className="overflow-y-auto flex-1 p-2">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} onClick={() => setSelectedTicket(ticket)} className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border border-transparent hover:border-gray-200 hover:bg-gray-50 ${ticket.unread ? 'bg-gray-50/50' : 'bg-white'}`}>
              <input type="checkbox" onClick={(e) => e.stopPropagation()} className="w-4 h-4 rounded border-gray-300 text-[#714BD2] focus:ring-[#714BD2] ml-2" />
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0 relative">
                {ticket.avatar}
                {ticket.isAiResolved && (<div className="absolute -bottom-1 -right-1 bg-[#FCEE21] rounded-full p-0.5 border border-white" title="Résolu par IA"><CpuChipIcon className="w-3 h-3 text-black" /></div>)}
              </div>
              <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-5">
                  <div className="flex items-center gap-2 mb-0.5"><span className={`text-sm font-bold ${ticket.unread ? 'text-gray-900' : 'text-gray-600'}`}>{ticket.subject}</span>{ticket.unread && <span className="w-2 h-2 bg-[#FCEE21] rounded-full"></span>}</div>
                  <p className="text-xs text-gray-500 truncate">{ticket.message}</p>
                </div>
                <div className="md:col-span-3 flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${ticket.status === 'Nouveau' ? 'bg-blue-50 text-blue-600' : ticket.status === 'En cours' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>{ticket.status}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${ticket.priority === 'Critique' ? 'border-red-200 text-red-600 bg-red-50' : ticket.priority === 'Haute' ? 'border-orange-200 text-orange-600 bg-orange-50' : 'border-gray-200 text-gray-500'}`}>{ticket.priority}</span>
                </div>
                <div className="md:col-span-3 text-right"><p className="text-xs font-bold text-gray-900">{ticket.client}</p><p className="text-[10px] text-gray-400">{ticket.date}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- PAGE 3: CLIENTS ---
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
        client.nom.toLowerCase().includes(lowerTerm) || client.prenom.toLowerCase().includes(lowerTerm) || client.societe.toLowerCase().includes(lowerTerm) || client.id.toLowerCase().includes(lowerTerm) || client.email.toLowerCase().includes(lowerTerm)
      )
    }
    if (startDate) results = results.filter(client => new Date(client.date) >= new Date(startDate))
    if (endDate) results = results.filter(client => new Date(client.date) <= new Date(endDate))
    setFilteredClients(results)
  }, [searchTerm, startDate, endDate])

  const handleReset = () => { setSearchTerm(''); setStartDate(''); setEndDate(''); }

  return (
    <div className="flex flex-col h-full animate-fade-in-up space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div><h2 className="text-2xl font-bold text-gray-900">Gestion des Clients</h2><p className="text-gray-500 text-sm">Consultez et gérez la base de données clients.</p></div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"><ArrowDownTrayIcon className="w-5 h-5" /> Exporter CSV</button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-bold text-gray-500 ml-1">Rechercher</label>
            <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Nom, Société, ID..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714BD2] transition-all text-sm" />
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
        <div className="md:col-span-1"><button onClick={handleReset} className="w-full py-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors text-sm font-bold flex items-center justify-center"><FunnelIcon className="w-5 h-5" /></button></div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Client</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Société</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Contact</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Statut</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredClients.map((client) => (
                        <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><UserCircleIcon className="w-6 h-6" /></div><div><p className="text-sm font-bold text-gray-900">{client.prenom} {client.nom}</p><p className="text-xs text-gray-400 font-mono">{client.id}</p></div></div></td>
                            <td className="px-6 py-4"><p className="text-sm font-medium text-gray-700">{client.societe}</p></td>
                            <td className="px-6 py-4"><div className="flex flex-col"><span className="text-sm text-gray-600">{client.email}</span><span className="text-xs text-gray-400">{client.phone}</span></div></td>
                            <td className="px-6 py-4"><span className="text-sm text-gray-600">{client.date}</span></td>
                            <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold border ${client.status === 'Actif' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>{client.status}</span></td>
                            <td className="px-6 py-4 text-right"><button className="text-xs font-bold text-[#714BD2] hover:underline">Voir profil</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

// --- PAGE 4: STATISTICS ---
function KPICard({ title, value, change, isPositive }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <div className="flex items-end gap-3 mt-2">
                <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {isPositive ? <ArrowUpIcon className="w-3 h-3 mr-1"/> : <ArrowDownIcon className="w-3 h-3 mr-1"/>}{change}
                </span>
            </div>
        </div>
    )
}

function StatisticsPage() {
  return (
    <div className="flex flex-col h-full animate-fade-in-up space-y-8">
      <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-900">Statistiques</h2><select className="bg-white border border-gray-200 text-sm rounded-lg px-4 py-2 font-medium"><option>Ce mois-ci</option></select></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard title="Temps Moyen Résolution" value="1h 45m" change="-12%" isPositive={true} />
        <KPICard title="Taux de Satisfaction" value="4.8/5" change="+0.2" isPositive={true} />
        <KPICard title="Tickets Réouverts" value="5%" change="+1%" isPositive={false} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Volume Hebdomadaire</h3>
            <div className="h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={weeklyData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} /><Tooltip cursor={{fill: '#F3F4F6'}} contentStyle={{ borderRadius: '12px', border: 'none' }} /><Bar dataKey="tickets" fill="#714BD2" radius={[6, 6, 0, 0]} barSize={40} /></BarChart></ResponsiveContainer></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Satisfaction Client</h3>
            <div className="h-[300px] w-full relative"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={satisfactionData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">{satisfactionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}</Pie><Tooltip /><Legend verticalAlign="bottom" height={36} /></PieChart></ResponsiveContainer><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -mt-4"><span className="text-3xl font-bold text-slate-800">1,240</span><p className="text-xs text-gray-400">Avis</p></div></div>
        </div>
      </div>
    </div>
  )
}

// --- PAGE 5: TICKETS (LISTE GLOBALE) ---
function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTickets, setFilteredTickets] = useState(allTicketsList)

  useEffect(() => {
    if (searchTerm) {
        const lower = searchTerm.toLowerCase()
        setFilteredTickets(allTicketsList.filter(t => t.subject.toLowerCase().includes(lower) || t.client.toLowerCase().includes(lower) || t.id.toLowerCase().includes(lower)))
    } else { setFilteredTickets(allTicketsList) }
  }, [searchTerm])

  const getStatusColor = (s: string) => s === 'Nouveau' ? 'bg-blue-50 text-blue-700' : s === 'En cours' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'
  const getPriorityColor = (p: string) => p === 'Critique' || p === 'Haute' ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50'

  return (
    <div className="flex flex-col h-full animate-fade-in-up space-y-6">
      <div className="flex justify-between items-center"><h2 className="text-2xl font-bold text-gray-900">Tous les Tickets</h2><button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg shadow-sm"><ArrowDownTrayIcon className="w-5 h-5" /> Exporter</button></div>
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4"><div className="relative flex-1"><MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714BD2]" /></div></div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1"><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-gray-50/50 border-b border-gray-100"><tr><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">ID</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Sujet</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Client</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Priorité</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Statut</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Agent</th></tr></thead><tbody className="divide-y divide-gray-100">{filteredTickets.map((ticket) => (<tr key={ticket.id} className="hover:bg-gray-50 transition-colors"><td className="px-6 py-4 text-xs font-mono text-gray-500">{ticket.id}</td><td className="px-6 py-4 font-bold text-gray-900 text-sm">{ticket.subject}</td><td className="px-6 py-4 text-sm text-gray-600">{ticket.client}</td><td className="px-6 py-4"><span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span></td><td className="px-6 py-4"><span className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(ticket.status)}`}>{ticket.status}</span></td><td className="px-6 py-4 text-sm text-gray-500">{ticket.agent}</td></tr>))}</tbody></table></div></div>
    </div>
  )
}

// --- PAGE 6: ADMIN ---
function AdminPage() {
  const [agents, setAgents] = useState(initialAgents)
  const [formData, setFormData] = useState({ nom: '', prenom: '', fonction: 'Support N1', identifiant: '', mdp: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!formData.nom) return; setAgents([...agents, { id: Date.now(), ...formData } as any]); setFormData({ nom: '', prenom: '', fonction: 'Support N1', identifiant: '', mdp: '' }) }
  const handleDelete = (id: number) => { setAgents(agents.filter(a => a.id !== id)) }

  return (
    <div className="flex flex-col h-full animate-fade-in-up space-y-6">
      <div className="mb-2"><h2 className="text-2xl font-bold text-gray-900">Administration</h2><p className="text-gray-500 text-sm">Gérez les comptes employés.</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit sticky top-6">
            <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2"><UserPlusIcon className="w-5 h-5" /> Ajouter un agent</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4"><div><label className="text-xs font-bold text-gray-500">Prénom</label><input name="prenom" value={formData.prenom} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div><div><label className="text-xs font-bold text-gray-500">Nom</label><input name="nom" value={formData.nom} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div></div>
                <div><label className="text-xs font-bold text-gray-500">Fonction</label><select name="fonction" value={formData.fonction} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"><option>Support N1</option><option>Support N2</option><option>Admin</option></select></div>
                <div><label className="text-xs font-bold text-gray-500">Identifiant</label><input name="identifiant" value={formData.identifiant} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <div><label className="text-xs font-bold text-gray-500">Mot de passe</label><input name="mdp" type="password" value={formData.mdp} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" /></div>
                <button type="submit" className="w-full mt-4 bg-[#141516] text-white font-bold py-3 rounded-xl hover:bg-black transition-all shadow-md">Créer le compte</button>
            </form>
        </div>
        <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center"><h3 className="font-bold text-lg text-slate-800 flex items-center gap-2"><ShieldCheckIcon className="w-5 h-5" /> Liste des agents</h3><span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">{agents.length} users</span></div>
            <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead className="bg-gray-50 border-b border-gray-100"><tr><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Identité</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Fonction</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">ID Connexion</th><th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th></tr></thead><tbody className="divide-y divide-gray-100">{agents.map((agent) => (<tr key={agent.id} className="hover:bg-gray-50 transition-colors"><td className="px-6 py-4"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">{agent.prenom.charAt(0)}{agent.nom.charAt(0)}</div><span className="text-sm font-bold text-gray-900">{agent.prenom} {agent.nom}</span></div></td><td className="px-6 py-4 text-sm text-gray-600"><span className="px-2 py-1 rounded text-xs font-bold border bg-gray-50 border-gray-200">{agent.fonction}</span></td><td className="px-6 py-4 text-sm font-mono text-gray-500">{agent.identifiant}</td><td className="px-6 py-4 text-right flex justify-end gap-2"><button className="p-1.5 text-gray-400 hover:text-blue-600"><PencilSquareIcon className="w-4 h-4" /></button><button onClick={() => handleDelete(agent.id)} className="p-1.5 text-gray-400 hover:text-red-600"><TrashIcon className="w-4 h-4" /></button></td></tr>))}</tbody></table></div>
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
            {activeMenu === 'Overview' && <OverviewPage />}
            {activeMenu === 'Inbox Tickets' && <InboxPage />}
            {activeMenu === 'All Tickets' && <TicketsPage />}
            {activeMenu === 'Clients' && <ClientsPage />}
            {activeMenu === 'Statistics' && <StatisticsPage />}
            {activeMenu === 'Admin' && <AdminPage />}
          </div>
        </main>
      </div>
    </div>
  )
}