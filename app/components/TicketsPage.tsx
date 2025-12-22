"use client"
import React, { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon, TicketIcon } from '@heroicons/react/24/outline'

const allTickets = [
  { id: 'TKT-1024', subject: 'Erreur Paiement', client: 'Amine Benali', priority: 'Haute', status: 'Nouveau', date: '22/12/2025', agent: 'IA' },
  { id: 'TKT-1025', subject: 'Accès compte bloqué', client: 'Sophie Martin', priority: 'Moyenne', status: 'En cours', date: '21/12/2025', agent: 'John Smith' },
  { id: 'TKT-1026', subject: 'Bug affichage mobile', client: 'Karim Ziani', priority: 'Basse', status: 'Résolu', date: '20/12/2025', agent: 'IA' },
  { id: 'TKT-1027', subject: 'Facture manquante', client: 'Tech Corp', priority: 'Moyenne', status: 'Résolu', date: '19/12/2025', agent: 'John Smith' },
  { id: 'TKT-1028', subject: 'API Key invalide', client: 'Lina Dou', priority: 'Critique', status: 'Nouveau', date: '22/12/2025', agent: '-' },
]

export default function TicketsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTickets, setFilteredTickets] = useState(allTickets)

  // Filtrage simple
  useEffect(() => {
    if (searchTerm) {
        const lower = searchTerm.toLowerCase()
        setFilteredTickets(allTickets.filter(t => 
            t.subject.toLowerCase().includes(lower) || 
            t.client.toLowerCase().includes(lower) ||
            t.id.toLowerCase().includes(lower)
        ))
    } else {
        setFilteredTickets(allTickets)
    }
  }, [searchTerm])

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'Nouveau': return 'bg-blue-50 text-blue-700 border-blue-100';
          case 'En cours': return 'bg-orange-50 text-orange-700 border-orange-100';
          case 'Résolu': return 'bg-green-50 text-green-700 border-green-100';
          default: return 'bg-gray-50 text-gray-700 border-gray-100';
      }
  }

  const getPriorityColor = (prio: string) => {
      return prio === 'Critique' || prio === 'Haute' ? 'text-red-600 bg-red-50 border-red-100' : 'text-gray-600 bg-gray-50 border-gray-200'
  }

  return (
    <div className="flex flex-col h-full animate-fade-in-up space-y-6">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tous les Tickets</h2>
          <p className="text-gray-500 text-sm">Historique complet des demandes d'assistance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <ArrowDownTrayIcon className="w-5 h-5" /> Exporter
        </button>
      </div>

      {/* Barre recherche */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
         <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher par ID, Sujet, Client..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714BD2] transition-all text-sm"
            />
         </div>
         <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors"><FunnelIcon className="w-5 h-5" /></button>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID Ticket</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Sujet</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Priorité</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assigné à</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 text-xs font-mono text-gray-500">{ticket.id}</td>
                            <td className="px-6 py-4 font-bold text-gray-900 text-sm">{ticket.subject}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{ticket.client}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{ticket.date}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase ${getPriorityColor(ticket.priority)}`}>
                                    {ticket.priority}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(ticket.status)}`}>
                                    {ticket.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold">
                                    {ticket.agent.charAt(0)}
                                </div>
                                {ticket.agent}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}