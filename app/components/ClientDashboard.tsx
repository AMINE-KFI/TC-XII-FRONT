"use client"
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  InboxIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  UserGroupIcon,
  SparklesIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

// ============================================================================
// 1. TICKET FORM (Responsive & Clean)
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
    <div className="bg-white mt-20 p-6 md:p-12 rounded-3xl border border-gray-100 shadow-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 md:mb-10 text-center">
         <h2 className="text-2xl md:text-4xl font-black mb-2 text-[#04093D]">Hello, how can we help?</h2>
         <p className="text-slate-500 text-sm md:text-base font-medium">Create a support ticket below.</p>
      </div>

      <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs md:text-sm font-bold text-[#04093D] mb-2 ml-1 uppercase tracking-wider">Topic</label>
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-[#F8F9FB] border-2 border-transparent focus:border-[#FCEE21] rounded-2xl px-4 py-3 md:px-6 md:py-4 outline-none transition-all text-[#04093D] font-bold placeholder:text-slate-400 text-sm md:text-base" 
            placeholder="Ex: Login issue..." 
            required
          />
        </div>

        <div>
            <label className="block text-xs md:text-sm font-bold text-[#04093D] mb-4 ml-1 uppercase tracking-wider">Category</label>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl border-2 transition-all duration-300 ${
                            category === cat.id 
                            ? 'border-[#FCEE21] bg-[#FCEE21]/10 scale-105 shadow-md' 
                            : 'border-slate-100 bg-[#F8F9FB] hover:border-slate-200 text-slate-400'
                        }`}
                    >
                        <cat.icon className={`w-6 h-6 md:w-8 md:h-8 mb-2 ${category === cat.id ? 'text-[#04093D]' : 'text-slate-400'}`} />
                        <span className={`text-[10px] md:text-xs font-black ${category === cat.id ? 'text-[#04093D]' : 'text-slate-500'}`}>{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <div>
          <label className="block text-xs md:text-sm font-bold text-[#04093D] mb-2 ml-1 uppercase tracking-wider">Description</label>
          <textarea 
            rows={4} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#F8F9FB] border-2 border-transparent focus:border-[#FCEE21] rounded-2xl px-4 py-3 md:px-6 md:py-4 outline-none transition-all text-[#04093D] font-bold placeholder:text-slate-400 resize-none text-sm md:text-base" 
            placeholder="Add details..."
            required
          ></textarea>
        </div>

        <div className="pt-2">
            <button 
                type="submit" 
                disabled={!category || !subject || !description}
                className="w-full bg-[#FCEE21] text-[#04093D] font-black py-4 rounded-2xl md:rounded-full hover:bg-[#efdf1a] hover:shadow-lg active:scale-95 transition-all text-base md:text-lg disabled:opacity-50 disabled:active:scale-100"
            >
              SUBMIT TICKET
            </button>
        </div>
      </form>
    </div>
  )
}

// ============================================================================
// 2. AI RESOLUTION CHAT (Fix Scroll & Responsive)
// ============================================================================
function TicketChat({ ticket, onBackToHistory, onUpdateStatus }: { ticket: any, onBackToHistory: () => void, onUpdateStatus: (id: string, status: string) => void }) {
  const [messages, setMessages] = useState<any[]>([
    { role: 'user', content: `Problem: ${ticket.subject}\nDetails: ${ticket.description}` }
  ])
  const [status, setStatus] = useState<'analyzing' | 'proposing' | 'waiting_feedback' | 'resolved' | 'escalated'>('analyzing')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll doux et localisé (ne fait pas sauter la page entière)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  useEffect(() => {
    scrollToBottom()
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

  const handleFeedback = (satisfied: boolean) => {
    if (satisfied) {
        setMessages(prev => [
            ...prev, 
            { role: 'user', content: '✅ Satisfied' },
            { role: 'assistant', content: 'Great! Ticket marked as RESOLVED.' }
        ])
        setStatus('resolved')
        onUpdateStatus(ticket.id, 'Resolved')
    } else {
        setMessages(prev => [
            ...prev, 
            { role: 'user', content: '❌ Not satisfied' },
            { role: 'assistant', content: 'Escalating to human specialist (High Priority).' }
        ])
        setStatus('escalated')
        onUpdateStatus(ticket.id, 'Escalated')
    }
  }

  return (
    <div className="bg-white md:rounded-[2.5rem] rounded-xl shadow-2xl border border-slate-100 flex flex-col h-[80vh] md:h-[700px] max-w-4xl mx-auto overflow-hidden animate-in zoom-in duration-300">
      
      {/* Header */}
      <div className={`mt-10 px-6 py-4 md:p-6 text-white flex justify-between items-center shadow-lg relative z-10 transition-colors duration-500 ${status === 'resolved' ? 'bg-green-500' : status === 'escalated' ? 'bg-[#04093D]' : 'bg-[#002BFF]'}`}>
        <div className="flex items-center gap-3 md:gap-5">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FCEE21] rounded-xl flex items-center justify-center shadow-lg">
            <SparklesIcon className="w-6 h-6 md:w-7 md:h-7 text-[#04093D]" />
          </div>
          <div>
            <p className="font-black text-lg md:text-xl tracking-tight leading-none">AI AGENT</p>
            <div className="flex items-center gap-2 mt-1">
                <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse ${status === 'analyzing' ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                <p className="text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest">
                    {status === 'analyzing' ? 'COMPUTING...' : status === 'waiting_feedback' ? 'WAITING' : status}
                </p>
            </div>
          </div>
        </div>
        <button onClick={onBackToHistory} className="bg-white/20 hover:bg-white text-white hover:text-[#002BFF] px-4 py-2 rounded-full text-xs font-bold transition-all backdrop-blur-sm">
          EXIT
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-[#F8F9FB] scrollbar-hide relative">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[85%] md:max-w-[75%] p-4 md:p-6 rounded-2xl md:rounded-[2rem] font-bold text-sm md:text-lg shadow-sm leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-[#04093D] text-white rounded-tr-none text-right' 
              : 'bg-white text-[#04093D] rounded-tl-none border-2 border-slate-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {status === 'analyzing' && (
           <div className="flex justify-start animate-in fade-in duration-500">
             <div className="bg-white p-6 rounded-2xl rounded-tl-none border-2 border-slate-100 flex flex-col gap-3 max-w-xs shadow-lg">
                <div className="flex items-center gap-2 text-[#002BFF] font-black uppercase tracking-widest text-[10px]">
                    <SparklesIcon className="w-4 h-4 animate-spin" />
                    Analyzing...
                </div>
                <div className="space-y-2">
                    <div className="h-2 bg-slate-100 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-2 bg-slate-100 rounded-full w-full animate-pulse delay-75"></div>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Action Area */}
      <div className="p-4 md:p-8 bg-white border-t-2 border-slate-50 min-h-[100px] flex items-center justify-center">
        {status === 'waiting_feedback' && (
            <div className="flex gap-2 md:gap-4 w-full animate-in slide-in-from-bottom-4">
                 <button onClick={() => handleFeedback(true)} className="flex-1 bg-[#FCEE21] active:scale-95 text-[#04093D] py-4 rounded-xl font-black text-sm md:text-lg shadow-md flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                    <HandThumbUpIcon className="w-6 h-6" /> SATISFIED
                 </button>
                 <button onClick={() => handleFeedback(false)} className="flex-1 bg-white border-2 border-slate-100 active:scale-95 text-slate-500 hover:text-red-500 py-4 rounded-xl font-black text-sm md:text-lg flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                    <HandThumbDownIcon className="w-6 h-6" /> UNSATISFIED
                 </button>
            </div>
        )}
        {(status === 'analyzing' || status === 'proposing') && (
            <div className="text-slate-400 font-bold text-xs md:text-sm animate-pulse flex items-center gap-2">
                <ClockIcon className="w-4 h-4" /> AI IS PROCESSING...
            </div>
        )}
        {(status === 'resolved' || status === 'escalated') && (
            <div className={`w-full py-3 rounded-xl text-center font-black text-sm md:text-base ${status === 'resolved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {status === 'resolved' ? 'TICKET CLOSED' : 'ESCALATION IN PROGRESS'}
            </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// 3. HISTORY VIEW (Redesigned & No Delete)
// ============================================================================
function HistoryView({ tickets, onNavigateToAdd }: { tickets: any[], onNavigateToAdd: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const processedTickets = useMemo(() => {
    return tickets.filter(t => t.id.includes(searchTerm) || t.subject.toLowerCase().includes(searchTerm.toLowerCase()))
                  .sort((a, b) => b.id.localeCompare(a.id))
  }, [tickets, searchTerm])

  return (
    <div className="animate-in fade-in duration-700 max-w-3xl mx-auto pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex items-center gap-3">
            <h2 className="text-3xl md:text-4xl font-black text-[#04093D] tracking-tight">History</h2>
            <div className="bg-[#E0E7FF] text-[#002BFF] px-3 py-1 rounded-full font-bold text-sm">{processedTickets.length}</div>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
             <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
                type="text" 
                placeholder="Search ID or Topic..."
                className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-slate-200 text-sm font-bold text-[#04093D] focus:outline-none focus:ring-2 focus:ring-[#002BFF]"
                onChange={(e) => setSearchTerm(e.target.value)}
             />
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center bg-white p-10 rounded-3xl border border-dashed border-slate-200 min-h-[400px]">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
             <InboxIcon className="w-10 h-10 text-slate-300" />
          </div>
          <h3 className="text-xl font-black text-[#04093D] mb-2">No history yet</h3>
          <p className="text-slate-400 text-sm mb-8 max-w-xs">Create your first support ticket to see it appear here.</p>
          <button onClick={onNavigateToAdd} className="bg-[#002BFF] hover:bg-[#0021c7] text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-200 transition-all">
            Start New Ticket
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {processedTickets.map((ticket) => (
            <div key={ticket.id} className="group bg-white p-5 rounded-2xl border border-slate-100 hover:border-[#002BFF]/30 hover:shadow-lg transition-all flex flex-col md:flex-row md:items-center gap-4">
              
              {/* Icon & ID */}
              <div className="flex items-center gap-4 flex-1">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    ticket.status === 'Resolved' ? 'bg-green-100 text-green-600' : 
                    ticket.status === 'Escalated' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'
                 }`}>
                    {ticket.status === 'Resolved' ? <CheckBadgeIcon className="w-6 h-6" /> : 
                     ticket.status === 'Escalated' ? <ExclamationTriangleIcon className="w-6 h-6" /> : <ArrowPathIcon className="w-6 h-6" />}
                 </div>
                 <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">#{ticket.id}</div>
                    <div className="font-bold text-[#04093D] text-lg leading-tight">{ticket.subject}</div>
                    <div className="text-xs text-slate-400 mt-1 truncate max-w-[200px]">{ticket.category}</div>
                 </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-slate-50 pt-3 md:pt-0">
                 <div className="md:hidden text-xs font-bold text-slate-400">STATUS</div>
                 <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wide ${
                    ticket.status === 'Resolved' ? 'bg-green-50 text-green-600 border border-green-100' :
                    ticket.status === 'Escalated' ? 'bg-red-50 text-red-600 border border-red-100' :
                    'bg-slate-50 text-slate-500 border border-slate-200'
                 }`}>
                    {ticket.status || 'Pending'}
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================================================
// 4. MAIN DASHBOARD SHELL (Responsive Nav)
// ============================================================================
export default function ClientDashboard() {
  const [view, setView] = useState<'form' | 'chat' | 'list'>('form')
  const [currentTicket, setCurrentTicket] = useState<any>(null)
  const [tickets, setTickets] = useState<any[]>([])

  const handleTicketCreated = (data: any) => {
    // Statut initial par défaut 'Pending'
    const newTicket = { id: Math.floor(1000000 + Math.random() * 9000000).toString(), status: 'Pending', ...data }
    setTickets([newTicket, ...tickets])
    setCurrentTicket(newTicket)
    setView('chat')
  }

  const updateTicketStatus = (id: string, status: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: status } : t))
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-sans">
      <div className="flex flex-1 overflow-hidden">
        
        {/* Desktop Sidebar */}
        <aside className="w-72 mt-20 bg-white border-r border-slate-100 hidden md:flex flex-col p-8 sticky top-0 h-screen">
          <div className="mb-10 pl-2">
             <h1 className="font-black text-2xl text-[#04093D]">HELPDESK<span className="text-[#002BFF]">.</span></h1>
          </div>
          <nav className="space-y-3">
            <button onClick={() => setView('form')} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all text-sm ${view === 'form' || view === 'chat' ? 'bg-[#04093D] text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
                <ChatBubbleLeftRightIcon className="w-5 h-5" /> NEW TICKET
            </button>
            <button onClick={() => setView('list')} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all text-sm ${view === 'list' ? 'bg-[#04093D] text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
                <ClockIcon className="w-5 h-5" /> HISTORY
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full relative">
          {/* Header Mobile Only */}
          <div className="md:hidden p-6 pb-2 flex justify-between items-center bg-[#F8F9FB] sticky top-0 z-20">
             <h1 className="font-black text-xl text-[#04093D]">HELPDESK<span className="text-[#002BFF]">.</span></h1>
             <div className="w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center">
                <span className="font-bold text-xs text-[#002BFF]">JS</span>
             </div>
          </div>

          <div className="h-full overflow-y-auto p-4 md:p-12 pb-24 md:pb-12">
            <div className="max-w-5xl mx-auto">
              {view === 'form' && <TicketForm onTicketCreated={handleTicketCreated} />}
              {view === 'list' && <HistoryView tickets={tickets} onNavigateToAdd={() => setView('form')} />}
              {view === 'chat' && currentTicket && (
                  <TicketChat 
                    ticket={currentTicket} 
                    onBackToHistory={() => setView('list')} 
                    onUpdateStatus={updateTicketStatus}
                  />
              )}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex justify-around p-4 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
            <button onClick={() => setView('form')} className={`flex flex-col items-center gap-1 ${view === 'form' || view === 'chat' ? 'text-[#002BFF]' : 'text-slate-400'}`}>
                <ChatBubbleLeftRightIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold">New Ticket</span>
            </button>
            <button onClick={() => setView('list')} className={`flex flex-col items-center gap-1 ${view === 'list' ? 'text-[#002BFF]' : 'text-slate-400'}`}>
                <ClockIcon className="w-6 h-6" />
                <span className="text-[10px] font-bold">History</span>
            </button>
        </div>

      </div>
    </div>
  )
}