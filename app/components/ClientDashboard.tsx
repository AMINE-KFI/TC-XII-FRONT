"use client"
import React, { useState, useMemo, useEffect, useRef } from 'react'
import { 
  CheckCircleIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  InboxIcon,
  ComputerDesktopIcon,
  CreditCardIcon,
  UserGroupIcon,
  SparklesIcon, // Nouvelle icône pour l'IA
  HandThumbUpIcon,
  HandThumbDownIcon
} from '@heroicons/react/24/outline'

// ... (TicketForm reste identique, je ne le remets pas pour économiser de la place, 
// mais assurez-vous de garder le même code pour TicketForm que vous aviez)

// ============================================================================
// 1. TICKET FORM COMPONENT (Gardez votre code existant ici)
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
    <div className="bg-white -mt-10 p-12 rounded-[2.5rem] border border-gray-200 shadow-sm max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
         <h2 className="text-4xl font-black mb-4 text-[#04093D]">Hello, how can we help you?</h2>
         <p className="text-slate-500 max-w-md mx-auto font-medium">Create a support ticket by describing your issue below.</p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-bold text-[#04093D] mb-2 ml-1 uppercase tracking-wider">Topic</label>
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-[#F8F9FB] border-2 border-transparent focus:border-[#FCEE21] rounded-2xl px-6 py-4 outline-none transition-all text-[#04093D] font-bold placeholder:text-slate-400" 
            placeholder="What is this about?" 
            required
          />
        </div>

        <div>
            <label className="block text-sm font-bold text-[#04093D] mb-4 ml-1 uppercase tracking-wider">Select Category</label>
            <div className="grid grid-cols-3 gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                            category === cat.id 
                            ? 'border-[#FCEE21] bg-[#FCEE21]/10 scale-105 shadow-md' 
                            : 'border-slate-100 bg-[#F8F9FB] hover:border-slate-200 text-slate-400'
                        }`}
                    >
                        <cat.icon className={`w-8 h-8 mb-2 ${category === cat.id ? 'text-[#04093D]' : 'text-slate-400'}`} />
                        <span className={`text-xs font-black ${category === cat.id ? 'text-[#04093D]' : 'text-slate-500'}`}>{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-[#04093D] mb-2 ml-1 uppercase tracking-wider">Description</label>
          <textarea 
            rows={4} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#F8F9FB] border-2 border-transparent focus:border-[#FCEE21] rounded-2xl px-6 py-4 outline-none transition-all text-[#04093D] font-bold placeholder:text-slate-400 resize-none" 
            placeholder="Add more details..."
            required
          ></textarea>
        </div>

        <div className="flex justify-center pt-4">
            <button 
                type="submit" 
                disabled={!category || !subject || !description}
                className="bg-[#FCEE21] text-[#04093D] font-black py-4 px-20 rounded-full hover:bg-[#efdf1a] hover:shadow-xl active:scale-95 transition-all text-lg disabled:opacity-50"
            >
              SUBMIT TICKET
            </button>
        </div>
      </form>
    </div>
  )
}

// ============================================================================
// 2. AI RESOLUTION COMPONENT (MODIFIÉ)
// ============================================================================
function TicketChat({ ticket, onBackToHistory }: { ticket: any, onBackToHistory: () => void }) {
  const [messages, setMessages] = useState<any[]>([
    { role: 'user', content: `Problem: ${ticket.subject}\nDetails: ${ticket.description}` }
  ])
  const [status, setStatus] = useState<'analyzing' | 'proposing' | 'waiting_feedback' | 'resolved' | 'escalated'>('analyzing')
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, status])

  // Simulation du processus de réflexion de l'IA au démarrage
  useEffect(() => {
    if (status === 'analyzing') {
      setTimeout(() => {
        setStatus('proposing')
        generateAiSolution()
      }, 3000) // 3 secondes de "réflexion"
    }
  }, [])

  const generateAiSolution = () => {
    let solution = ""
    // Simulation de solutions basées sur la catégorie
    if (ticket.category === 'Technique') {
        solution = "Based on your technical issue logs, I've detected a synchronization error. I have reset your cache remotely. Please try restarting the application."
    } else if (ticket.category === 'Facturation') {
        solution = "I've analyzed your billing history. The discrepancy appears to be from the prorated charge on Oct 15th. I can generate a credit note for $12.50 to correct this immediately."
    } else {
        solution = "I have reviewed your account permissions. It seems your 'Admin' access was revoked by system policy #404. I can restore standard access rights now."
    }

    setMessages(prev => [...prev, { role: 'assistant', content: solution }])
    setStatus('waiting_feedback')
  }

  const handleFeedback = (satisfied: boolean) => {
    if (satisfied) {
        setMessages(prev => [
            ...prev, 
            { role: 'user', content: '✅ Satisfied with the solution.' },
            { role: 'assistant', content: 'Great! I\'m glad I could help. This ticket has been marked as RESOLVED and closed.' }
        ])
        setStatus('resolved')
    } else {
        setMessages(prev => [
            ...prev, 
            { role: 'user', content: '❌ Not satisfied.' },
            { role: 'assistant', content: 'I understand. I am escalating this ticket (High Priority) to a human specialist immediately. They will contact you shortly.' }
        ])
        setStatus('escalated')
    }
  }

  return (
    <div className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 flex flex-col h-[750px] max-w-4xl mx-auto overflow-hidden animate-in zoom-in duration-500">
      
      {/* Header */}
      <div className={`p-8 text-white flex justify-between items-center shadow-lg relative z-10 transition-colors duration-500 ${status === 'resolved' ? 'bg-green-500' : status === 'escalated' ? 'bg-[#04093D]' : 'bg-[#002BFF]'}`}>
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-[#FCEE21] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
            <SparklesIcon className="w-8 h-8 text-[#04093D]" />
          </div>
          <div>
            <p className="font-black text-xl tracking-tighter">AI AGENT</p>
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${status === 'analyzing' ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest">
                    {status === 'analyzing' ? 'COMPUTING...' : status === 'waiting_feedback' ? 'AWAITING INPUT' : status.toUpperCase()}
                </p>
            </div>
          </div>
        </div>
        <button onClick={onBackToHistory} className="bg-white/20 hover:bg-white text-white hover:text-[#002BFF] px-6 py-3 rounded-full text-sm font-black transition-all backdrop-blur-sm">
          EXIT
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[#F8F9FB] scrollbar-hide relative">
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[75%] p-6 rounded-[2rem] font-bold text-lg shadow-sm leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-[#04093D] text-white rounded-tr-none text-right' 
              : 'bg-white text-[#04093D] rounded-tl-none border-2 border-slate-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* LOADING ANIMATION (Le cerveau qui pense) */}
        {status === 'analyzing' && (
           <div className="flex justify-start animate-in fade-in duration-500">
             <div className="bg-white p-8 rounded-[2rem] rounded-tl-none border-2 border-slate-100 flex flex-col gap-4 max-w-md shadow-lg">
                <div className="flex items-center gap-3 text-[#002BFF] font-black uppercase tracking-widest text-xs">
                    <SparklesIcon className="w-4 h-4 animate-spin" />
                    Analyzing Request...
                </div>
                <div className="space-y-3">
                    <div className="h-3 bg-slate-100 rounded-full w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-slate-100 rounded-full w-full animate-pulse delay-75"></div>
                    <div className="h-3 bg-slate-100 rounded-full w-5/6 animate-pulse delay-150"></div>
                </div>
                <div className="text-xs text-slate-400 font-bold mt-2">Checking optimal solutions database...</div>
             </div>
           </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Action Area (Remplaçant l'input) */}
      <div className="p-8 bg-white border-t-2 border-slate-50 min-h-[140px] flex items-center justify-center">
        
        {status === 'waiting_feedback' && (
            <div className="flex flex-col md:flex-row gap-4 w-full animate-in slide-in-from-bottom-4">
                 <button 
                    onClick={() => handleFeedback(true)}
                    className="flex-1 bg-[#FCEE21] hover:bg-[#efdf1a] text-[#04093D] p-5 rounded-2xl font-black text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 border-2 border-transparent"
                 >
                    <HandThumbUpIcon className="w-6 h-6" />
                    SATISFIED
                    <span className="text-xs font-normal opacity-70 ml-1">(Close Ticket)</span>
                 </button>

                 <button 
                    onClick={() => handleFeedback(false)}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-500 hover:text-red-500 p-5 rounded-2xl font-black text-lg border-2 border-slate-200 hover:border-red-200 transition-all flex items-center justify-center gap-3"
                 >
                    <HandThumbDownIcon className="w-6 h-6" />
                    NOT SATISFIED
                    <span className="text-xs font-normal opacity-70 ml-1">(Escalate)</span>
                 </button>
            </div>
        )}

        {(status === 'analyzing' || status === 'proposing') && (
            <div className="text-slate-400 font-bold animate-pulse flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                AI IS PROCESSING YOUR REQUEST...
            </div>
        )}

        {(status === 'resolved' || status === 'escalated') && (
            <div className={`w-full p-4 rounded-xl text-center font-black text-lg ${status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                SESSION ENDED
            </div>
        )}

      </div>
    </div>
  )
}

// ============================================================================
// 3. HISTORY VIEW (Identique)
// ============================================================================
function HistoryView({ tickets, onDelete, onNavigateToAdd }: { tickets: any[], onDelete: (id: string) => void, onNavigateToAdd: () => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const processedTickets = useMemo(() => {
    return tickets.filter(t => t.id.includes(searchTerm)).sort((a, b) => b.id.localeCompare(a.id))
  }, [tickets, searchTerm])

  return (
    <div className="animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-5xl font-black text-[#04093D] tracking-tight">History</h2>
        <div className="bg-[#FCEE21] text-[#04093D] px-4 py-1 rounded-full font-black text-xl">{processedTickets.length}</div>
      </div>

      <div className="bg-[#002BFF] rounded-3xl px-8 py-4 flex justify-between items-center mb-8 shadow-2xl">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <MagnifyingGlassIcon className="w-6 h-6 text-white/50" />
          <input 
            type="text"
            placeholder="Search Ticket ID..."
            className="bg-transparent border-none text-white placeholder:text-white/40 focus:ring-0 w-full text-xl font-bold"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-[#E9EBF0] rounded-[3.5rem] p-10 min-h-[500px] flex flex-col shadow-inner">
        {tickets.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <InboxIcon className="w-20 h-20 text-[#002BFF] mb-6 opacity-20" />
            <h3 className="text-3xl font-black text-[#04093D] mb-8">No tickets found</h3>
            <button onClick={onNavigateToAdd} className="bg-[#002BFF] text-white px-12 py-4 rounded-full font-black text-lg">CREATE TICKET</button>
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full border-separate border-spacing-y-6">
              <thead>
                <tr className="text-[#002BFF] font-black text-2xl"><th className="text-left px-8">TICKET</th><th className="text-right px-8 pr-48">STATUS</th><th className="w-20"></th></tr>
              </thead>
              <tbody>
                {processedTickets.map((ticket) => (
                  <tr key={ticket.id} className="group hover:translate-x-2 transition-all">
                    <td className="py-8 px-10 bg-white/60 rounded-l-[2.5rem] text-[#04093D] font-black text-2xl">#{ticket.id}</td>
                    <td className="py-8 px-10 bg-white/60 text-right"><div className="flex justify-end pr-10"><div className="h-14 w-48 rounded-full shadow-inner border-4 border-white flex items-center justify-center font-black text-xs tracking-widest uppercase bg-white text-slate-300">Closed</div></div></td>
                    <td className="py-8 px-8 bg-white/60 rounded-r-[2.5rem] text-center"><button onClick={() => onDelete(ticket.id)} className="text-slate-300 hover:text-red-500 transition-all"><XMarkIcon className="w-10 h-10 stroke-[2]" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// 4. MAIN DASHBOARD
// ============================================================================
export default function ClientDashboard() {
  const [view, setView] = useState<'form' | 'chat' | 'list'>('form')
  const [currentTicket, setCurrentTicket] = useState<any>(null)
  const [tickets, setTickets] = useState<any[]>([])

  const handleTicketCreated = (data: any) => {
    const newTicket = { id: Math.floor(1000000 + Math.random() * 9000000).toString(), ...data }
    setTickets([newTicket, ...tickets])
    setCurrentTicket(newTicket)
    setView('chat')
  }

  return (
    <div className="mt-20 min-h-screen bg-[#F8F9FB] flex flex-col font-sans">
      <div className="flex flex-1">
        <aside className="w-80 bg-white border-r border-slate-100 hidden md:flex flex-col p-10 sticky top-0 h-screen">
          
          <nav className="fixed space-y-4">
            <button onClick={() => setView('form')} className={`w-full flex items-center gap-4 px-8 py-5 rounded-[2.5rem] font-black transition-all ${view === 'form' || view === 'chat' ? 'bg-[#FCEE21] text-[#04093D] shadow-xl' : 'text-slate-300'}`}><ChatBubbleLeftRightIcon className="w-7 h-7" /> NEW TICKET</button>
            <button onClick={() => setView('list')} className={`w-full flex items-center gap-4 px-8 py-5 rounded-[2.5rem] font-black transition-all ${view === 'list' ? 'bg-[#FCEE21] text-[#04093D] shadow-xl' : 'text-slate-300'}`}><ClockIcon className="w-7 h-7" /> HISTORY</button>
          </nav>
        </aside>

        <main className="flex-1 p-12 lg:p-20 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {view === 'form' && <TicketForm onTicketCreated={handleTicketCreated} />}
            {view === 'list' && <HistoryView tickets={tickets} onDelete={(id) => setTickets(tickets.filter(t => t.id !== id))} onNavigateToAdd={() => setView('form')} />}
            {view === 'chat' && currentTicket && <TicketChat ticket={currentTicket} onBackToHistory={() => setView('list')} />}
          </div>
        </main>
      </div>
    </div>
  )
}