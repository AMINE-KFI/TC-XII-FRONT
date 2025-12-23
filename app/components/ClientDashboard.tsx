"use client"
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ChevronRightIcon,
  BellIcon,
  InboxIcon,
  StarIcon as StarIconOutline // Pour les étoiles vides
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid' // Pour les étoiles pleines

// ============================================================================
// COMPOSANTS DE LAYOUT (NAVBAR, SIDEBAR, FOOTER)
// ============================================================================

const Navbar = () => (
  <header className="h-16 bg-white border-b border-gray-100 fixed top-0 right-0 left-0 md:left-72 z-40 flex items-center justify-between px-6 md:px-10 transition-all">
    {/* Mobile Logo */}
    <div className="md:hidden flex items-center gap-2">
       <div className="w-8 h-8 bg-[#04093D] rounded-lg flex items-center justify-center text-[#FCEE21] font-black text-xs">DX</div>
       <span className="font-black text-lg text-[#04093D]">DOXA</span>
    </div>

    {/* Desktop Title */}
    <div className="hidden md:block">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Support Center</h2>
    </div>

    {/* Actions Droite */}
    <div className="flex items-center gap-6">
       <button className="relative text-slate-400 hover:text-[#04093D] transition-colors">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
       </button>
       <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
             <p className="text-sm font-bold text-[#04093D] leading-none">Amine H.</p>
             <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Premium User</p>
          </div>
          <div className="w-9 h-9 bg-gradient-to-tr from-[#002BFF] to-[#04093D] rounded-full text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-indigo-200">
             AH
          </div>
       </div>
    </div>
  </header>
)

const Sidebar = ({ view, setView }: { view: string, setView: (v: 'form'|'list') => void }) => (
  <aside className="fixed left-0 top-0 h-full w-72 bg-white border-r border-gray-100 hidden md:flex flex-col z-50">
     <div className="h-20 flex items-center px-8 border-b border-gray-50">
        <h1 className="font-black text-2xl text-[#04093D] tracking-tight">DOXA<span className="text-[#002BFF]">.</span></h1>
     </div>

     <nav className="flex-1 p-6 space-y-3">
        <button 
           onClick={() => setView('form')} 
           className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all text-sm group ${
             view === 'form' 
             ? 'bg-[#04093D] text-white shadow-xl shadow-indigo-100' 
             : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
           }`}
        >
            <ChatBubbleLeftRightIcon className={`w-5 h-5 ${view === 'form' ? 'text-[#FCEE21]' : 'group-hover:text-[#002BFF]'}`} /> 
            NEW TICKET
        </button>

        <button 
           onClick={() => setView('list')} 
           className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all text-sm group ${
             view === 'list' 
             ? 'bg-[#04093D] text-white shadow-xl shadow-indigo-100' 
             : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
           }`}
        >
            <ClockIcon className={`w-5 h-5 ${view === 'list' ? 'text-[#FCEE21]' : 'group-hover:text-[#002BFF]'}`} /> 
            HISTORY
        </button>
     </nav>

     <div className="p-6">
        <div className="bg-[#F8F9FB] rounded-2xl p-5 border border-slate-100">
           <p className="text-xs font-bold text-slate-400 uppercase mb-2">Support Status</p>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-bold text-[#04093D]">Systems Operational</span>
           </div>
        </div>
     </div>
  </aside>
)

const Footer = () => (
  <footer className="mt-auto py-8 border-t border-gray-100 bg-white">
     <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-slate-400">© 2025 DOXA Support. All rights reserved.</p>
        <div className="flex gap-6 text-xs font-bold text-slate-400">
           <a href="#" className="hover:text-[#002BFF]">Privacy</a>
           <a href="#" className="hover:text-[#002BFF]">Terms</a>
           <a href="#" className="hover:text-[#002BFF]">Contact</a>
        </div>
     </div>
  </footer>
)

// ============================================================================
// 1. TICKET FORM
// ============================================================================
function TicketForm({ onTicketCreated }: { onTicketCreated: (data: any) => void }) {
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const categories = [
    { id: 'Technique', icon: ComputerDesktopIcon, label: 'Technical' },
    { id: 'Facturation', icon: CreditCardIcon, label: 'Billing' },
    { id: 'Compte', icon: UserGroupIcon, label: 'Account' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(!subject || !description || !category) return
    onTicketCreated({ subject, category, description })
    setSubject('')
    setCategory('')
    setDescription('')
  }

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
         <h1 className="text-3xl md:text-5xl font-black text-[#04093D] mb-3 tracking-tight">How can we help?</h1>
         <p className="text-slate-500 font-medium">Please detail your issue below.</p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Category Selection */}
          <div className="grid grid-cols-3 gap-3">
             {categories.map((cat) => (
                 <button
                     key={cat.id}
                     type="button"
                     onClick={() => setCategory(cat.id)}
                     className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 group ${
                         category === cat.id 
                         ? 'border-[#002BFF] bg-[#002BFF]/5' 
                         : 'border-slate-50 bg-slate-50 hover:border-slate-200'
                     }`}
                 >
                     <cat.icon className={`w-7 h-7 mb-2 transition-colors ${category === cat.id ? 'text-[#002BFF]' : 'text-slate-400 group-hover:text-slate-600'}`} />
                     <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${category === cat.id ? 'text-[#002BFF]' : 'text-slate-400'}`}>{cat.label}</span>
                 </button>
             ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-[#04093D] uppercase ml-1">Subject</label>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-2 bg-slate-50 border-none rounded-xl px-5 py-4 font-bold text-[#04093D] placeholder:text-slate-400 focus:ring-2 focus:ring-[#002BFF] transition-all" 
                placeholder="E.g. Unable to login..." 
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#04093D] uppercase ml-1">Description</label>
              <textarea 
                rows={4} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 bg-slate-50 border-none rounded-xl px-5 py-4 font-bold text-[#04093D] placeholder:text-slate-400 focus:ring-2 focus:ring-[#002BFF] transition-all resize-none" 
                placeholder="Provide as much detail as possible..."
                required
              ></textarea>
            </div>
          </div>

          <button 
              type="submit" 
              disabled={!category || !subject || !description}
              className="w-full bg-[#002BFF] text-white font-black py-4 rounded-xl shadow-lg hover:bg-[#04093D] hover:scale-[1.02] active:scale-95 transition-all text-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            Start Resolution
          </button>
        </form>
      </div>
    </div>
  )
}

// ============================================================================
// 2. TICKET CHAT (AVEC RATING SYSTEM)
// ============================================================================
function TicketChat({ ticket, onBackToHistory, onUpdateStatus }: { ticket: any, onBackToHistory: () => void, onUpdateStatus: (id: string, status: string) => void }) {
  const [messages, setMessages] = useState<any[]>([
    { role: 'user', content: `Problem: ${ticket.subject}\nDetails: ${ticket.description}` }
  ])
  const [status, setStatus] = useState<'analyzing' | 'proposing' | 'waiting_feedback' | 'resolved' | 'escalated'>('analyzing')
  const [hoveredStar, setHoveredStar] = useState(0) // État pour l'animation de survol
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, status])

  useEffect(() => {
    if (status === 'analyzing') {
      const timer = setTimeout(() => {
        setStatus('proposing')
        generateAiSolution()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  const generateAiSolution = () => {
    let solution = ""
    if (ticket.category === 'Technique') {
        solution = "Based on logs, I've detected a sync error. I have reset your cache remotely. Please restart the app."
    } else if (ticket.category === 'Facturation') {
        solution = "The discrepancy is from the prorated charge on Oct 15th. I can generate a $12.50 credit note immediately."
    } else {
        solution = "Your 'Admin' access was revoked by policy #404. I can restore standard access rights now."
    }

    setMessages(prev => [...prev, { role: 'assistant', content: solution }])
    setStatus('waiting_feedback')
  }

  // Nouvelle fonction de gestion des notes
  const handleRating = (rating: number) => {
    const isSatisfied = rating >= 4; // 4 ou 5 étoiles = Satisfait
    
    if (isSatisfied) {
        setMessages(prev => [
            ...prev, 
            { role: 'user', content: `Rated: ${rating}/5 ⭐` }, 
            { role: 'assistant', content: 'Thank you for your feedback! The ticket is marked as RESOLVED.' }
        ])
        setStatus('resolved')
        onUpdateStatus(ticket.id, 'Resolved')
    } else {
        setMessages(prev => [
            ...prev, 
            { role: 'user', content: `Rated: ${rating}/5 ⭐` }, 
            { role: 'assistant', content: 'I apologize that the solution didn\'t work. Escalating to a human specialist immediately.' }
        ])
        setStatus('escalated')
        onUpdateStatus(ticket.id, 'Escalated')
    }
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col h-[75vh] md:h-[600px] max-w-4xl mx-auto overflow-hidden animate-in zoom-in duration-300">
      
      {/* Header Chat */}
      <div className={`px-6 py-4 text-white flex justify-between items-center shadow-lg relative z-10 transition-colors duration-500 ${status === 'resolved' ? 'bg-green-500' : status === 'escalated' ? 'bg-[#04093D]' : 'bg-[#002BFF]'}`}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-black text-lg tracking-tight">AI AGENT</p>
            <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{status === 'waiting_feedback' ? 'WAITING FOR RATING' : status}</p>
          </div>
        </div>
        <button onClick={onBackToHistory} className="bg-white/20 hover:bg-white text-white hover:text-[#002BFF] px-4 py-2 rounded-full text-xs font-bold transition-all backdrop-blur-sm">EXIT</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8F9FB] relative">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] p-5 rounded-2xl font-bold text-sm shadow-sm leading-relaxed ${
              msg.role === 'user' ? 'bg-[#04093D] text-white rounded-tr-none' : 'bg-white text-[#04093D] rounded-tl-none border border-slate-100'
            }`}>{msg.content}</div>
          </div>
        ))}
        {status === 'analyzing' && (
           <div className="flex justify-start animate-in fade-in">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-3 shadow-sm">
                 <SparklesIcon className="w-4 h-4 text-[#002BFF] animate-spin" />
                 <span className="text-xs font-bold text-slate-400">Analyzing...</span>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* RATING ACTION AREA */}
      <div className="p-6 bg-white border-t border-slate-100 min-h-[120px] flex flex-col items-center justify-center gap-3">
        {status === 'waiting_feedback' && (
            <div className="w-full flex flex-col items-center animate-in slide-in-from-bottom-4">
                 <p className="text-[#04093D] font-bold text-sm mb-3 uppercase tracking-wider">Rate the solution</p>
                 <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() => handleRating(star)}
                            className="transform transition-transform hover:scale-125 focus:outline-none"
                        >
                            {star <= hoveredStar ? (
                                <StarIconSolid className="w-10 h-10 text-yellow-400 drop-shadow-sm" />
                            ) : (
                                <StarIconOutline className="w-10 h-10 text-slate-300" />
                            )}
                        </button>
                    ))}
                 </div>
                 <div className="h-4 mt-2 text-xs font-bold text-[#002BFF]">
                    {hoveredStar === 1 ? 'Very Bad' : 
                     hoveredStar === 2 ? 'Bad' :
                     hoveredStar === 3 ? 'Average' :
                     hoveredStar === 4 ? 'Good' :
                     hoveredStar === 5 ? 'Excellent!' : ''}
                 </div>
            </div>
        )}

        {(status === 'resolved' || status === 'escalated') && (
            <div className={`px-8 py-3 rounded-full font-black text-sm flex items-center gap-2 ${status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status === 'resolved' ? <CheckBadgeIcon className="w-5 h-5"/> : <ExclamationTriangleIcon className="w-5 h-5"/>}
                {status === 'resolved' ? 'TICKET CLOSED' : 'ESCALATED TO HUMAN'}
            </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// 3. HISTORY VIEW
// ============================================================================
function HistoryView({ tickets, onNavigateToAdd }: { tickets: any[], onNavigateToAdd: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const processedTickets = useMemo(() => {
    return tickets.filter(t => t.id.includes(searchTerm) || t.subject.toLowerCase().includes(searchTerm.toLowerCase()))
                  .sort((a, b) => b.id.localeCompare(a.id))
  }, [tickets, searchTerm])

  return (
    <div className="animate-in fade-in duration-700 max-w-4xl mx-auto pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <h2 className="text-3xl font-black text-[#04093D] tracking-tight mb-1">My History</h2>
            <p className="text-slate-400 text-sm font-medium">Track your previous support requests.</p>
        </div>
        
        <div className="relative group w-full md:w-72">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 group-focus-within:text-[#002BFF] transition-colors" />
             </div>
             <input 
                type="text" 
                placeholder="Search ticket..."
                className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-white shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-[#002BFF] placeholder:text-slate-400 text-sm font-bold transition-all"
                onChange={(e) => setSearchTerm(e.target.value)}
             />
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-[2rem] border border-dashed border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
             <InboxIcon className="w-8 h-8 text-[#002BFF]" />
          </div>
          <h3 className="text-lg font-black text-[#04093D] mb-1">No tickets yet</h3>
          <p className="text-slate-400 text-sm mb-6">Your support journey starts here.</p>
          <button onClick={onNavigateToAdd} className="text-[#002BFF] font-black text-sm hover:underline">Create a Ticket</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {processedTickets.map((ticket) => {
            const isResolved = ticket.status === 'Resolved';
            const isEscalated = ticket.status === 'Escalated';
            const statusColor = isResolved ? 'bg-green-500' : isEscalated ? 'bg-red-500' : 'bg-yellow-400';
            const statusText = isResolved ? 'text-green-700 bg-green-50' : isEscalated ? 'text-red-700 bg-red-50' : 'text-yellow-700 bg-yellow-50';

            return (
                <div key={ticket.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusColor}`}></div>

                    <div className="p-5 pl-7 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${statusText}`}>
                                {isResolved ? <CheckBadgeIcon className="w-6 h-6" /> : isEscalated ? <ExclamationTriangleIcon className="w-6 h-6" /> : <ArrowPathIcon className="w-6 h-6" />}
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">#{ticket.id}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">{ticket.category}</span>
                                </div>
                                <h3 className="font-bold text-[#04093D] text-lg leading-tight group-hover:text-[#002BFF] transition-colors">{ticket.subject}</h3>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 pl-14 sm:pl-0">
                            <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wide border border-transparent ${statusText} group-hover:border-current/10 transition-all`}>
                                {ticket.status}
                            </span>
                            <ChevronRightIcon className="w-5 h-5 text-slate-300 group-hover:text-[#002BFF] group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 4. MAIN LAYOUT
// ============================================================================
export default function ClientDashboard() {
  const [view, setView] = useState<'form' | 'chat' | 'list'>('form')
  const [currentTicket, setCurrentTicket] = useState<any>(null)
  const [tickets, setTickets] = useState<any[]>([])

  const handleTicketCreated = (data: any) => {
    const newTicket = { id: Math.floor(1000000 + Math.random() * 9000000).toString(), status: 'Pending', ...data }
    setTickets([newTicket, ...tickets])
    setCurrentTicket(newTicket)
    setView('chat')
  }

  const updateTicketStatus = (id: string, status: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: status } : t))
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans flex text-[#04093D]">
      {/* 1. Sidebar (Desktop) */}
      <Sidebar view={view} setView={(v) => { setView(v); if(v==='form') setCurrentTicket(null); }} />

      <div className="flex-1 flex flex-col md:pl-72 relative transition-all duration-300">
        {/* 2. Navbar */}
        <Navbar />

        {/* 3. Main Content Area */}
        <main className="flex-1 pt-20 px-4 md:px-10 pb-24 md:pb-10 overflow-y-auto">
          {view === 'form' && <TicketForm onTicketCreated={handleTicketCreated} />}
          {view === 'list' && <HistoryView tickets={tickets} onNavigateToAdd={() => setView('form')} />}
          {view === 'chat' && currentTicket && (
              <TicketChat 
                ticket={currentTicket} 
                onBackToHistory={() => setView('list')} 
                onUpdateStatus={updateTicketStatus}
              />
          )}
        </main>

        {/* 4. Footer */}
        <Footer />
      </div>

      {/* 5. Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around p-3 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] pb-safe">
        <button 
            onClick={() => { setView('form'); setCurrentTicket(null); }} 
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${view === 'form' ? 'text-[#002BFF] bg-blue-50' : 'text-slate-400'}`}
        >
            <ChatBubbleLeftRightIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">New Ticket</span>
        </button>
        <button 
            onClick={() => setView('list')} 
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${view === 'list' ? 'text-[#002BFF] bg-blue-50' : 'text-slate-400'}`}
        >
            <ClockIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold">History</span>
        </button>
      </div>
    </div>
  )
}