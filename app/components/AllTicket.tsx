"use client"
import React, { useState, useEffect } from 'react'
import { 
  ArrowDownTrayIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline'

// ============================================================================
// DONNÉES (MOCK DATA) SPÉCIFIQUES À ALL TICKETS
// ============================================================================
const allTicketsList = [
  { id: 'TKT-1024', subject: 'Erreur Paiement', client: 'Amine Benali', status: 'Nouveau', date: '22/12/2025', agent: 'IA' },
  { id: 'TKT-1025', subject: 'Accès compte bloqué', client: 'Sophie Martin', status: 'En cours', date: '21/12/2025', agent: 'John Smith' },
  { id: 'TKT-1026', subject: 'Bug affichage mobile', client: 'Karim Ziani', status: 'Résolu', date: '20/12/2025', agent: 'IA' },
  { id: 'TKT-1027', subject: 'Facture manquante', client: 'Tech Corp', status: 'Résolu', date: '19/12/2025', agent: 'John Smith' },
  { id: 'TKT-1028', subject: 'API Key invalide', client: 'Lina Dou', status: 'Nouveau', date: '22/12/2025', agent: '-' },
]

export default function AllTicket() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredTickets, setFilteredTickets] = useState(allTicketsList)

  useEffect(() => {
    if (searchTerm) {
        const lower = searchTerm.toLowerCase()
        setFilteredTickets(allTicketsList.filter(t => 
            t.subject.toLowerCase().includes(lower) || 
            t.client.toLowerCase().includes(lower) || 
            t.id.toLowerCase().includes(lower)
        ))
    } else { 
        setFilteredTickets(allTicketsList) 
    }
  }, [searchTerm])

  const getStatusColor = (s: string) => {
      if (s === 'Nouveau') return 'bg-blue-50 text-blue-700'
      if (s === 'En cours') return 'bg-orange-50 text-orange-700'
      return 'bg-green-50 text-green-700'
  }

  return (
    <div className="flex flex-col h-full animate-fade-in-up space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Tous les Tickets</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
              <ArrowDownTrayIcon className="w-5 h-5" /> Exporter
          </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4">
          <div className="relative flex-1">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                  type="text" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  placeholder="Rechercher par ID, Sujet ou Client..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#714BD2] transition-all" 
              />
          </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px] md:min-w-full">
                  <thead className="bg-gray-50/50 border-b border-gray-100">
                      <tr>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">ID</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Sujet</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Client</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Statut</th>
                          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Agent</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                      {filteredTickets.map((ticket) => (
                          <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-xs font-mono text-gray-500">{ticket.id}</td>
                              <td className="px-6 py-4 font-bold text-gray-900 text-sm">{ticket.subject}</td>
                              <td className="px-6 py-4 text-sm text-gray-600">{ticket.client}</td>
                              <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(ticket.status)}`}>
                                      {ticket.status}
                                  </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">{ticket.agent}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  )
}