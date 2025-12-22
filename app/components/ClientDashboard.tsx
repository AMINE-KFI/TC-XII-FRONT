"use client"
import React, { useState, useEffect, useRef } from 'react'
import { 
  PaperAirplaneIcon, 
  TicketIcon, 
  ListBulletIcon, 
  CheckCircleIcon, 
  UserIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline'

// ... (Gardez vos composants TicketForm et FullPageChat inchangés ici) ...
// Je remets les composants TicketForm et FullPageChat pour que le code soit complet et copiable.

// ============================================================================
// 1. COMPOSANT FORMULAIRE
// ============================================================================
function TicketForm({ onTicketCreated }: { onTicketCreated: (data: any) => void }) {
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('Technique')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(!subject || !description) return
    onTicketCreated({ subject, category, description })
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm max-w-3xl mx-auto transition-all duration-500">
      <div className="mb-8">
         <h2 className="text-3xl font-bold mb-3 text-[#141516]">Décrivez votre problème</h2>
         <p className="text-gray-500">Remplissez ce formulaire pour qu'un agent (IA ou humain) prenne en charge votre demande immédiatement.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Sujet de la demande</label>
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FCEE21] focus:border-transparent outline-none transition-all font-medium" 
            placeholder="Ex: Impossible de me connecter..." 
            required
          />
        </div>
        
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Catégorie</label>
            <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FCEE21] outline-none transition-all font-medium"
            >
                <option>Technique</option>
                <option>Facturation</option>
                <option>Compte</option>
                <option>Autre</option>
            </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Description détaillée</label>
          <textarea 
            rows={5} 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FCEE21] outline-none transition-all font-medium resize-none" 
            placeholder="Expliquez nous ce qui se passe..."
            required
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-[#FCEE21] text-black font-bold py-4 rounded-xl hover:bg-[#e6d91e] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-lg mt-4">
          Lancer l'assistance
        </button>
      </form>
    </div>
  )
}

// ============================================================================
// 2. COMPOSANT CHAT
// ============================================================================
function FullPageChat({ ticketData, onResolve }: { ticketData: any, onResolve: () => void }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: `Bonjour 👋. J'ai bien reçu votre ticket concernant "${ticketData.subject}". Je suis l'assistant virtuel DOXA. Laissez-moi analyser votre problème...` }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [agentMode, setAgentMode] = useState<'ai' | 'human'>('ai')
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }
  useEffect(() => { scrollToBottom() }, [messages, isTyping])

  const handleSend = async () => {
    if (!inputValue.trim()) return
    const userMsg = { id: Date.now(), sender: 'user', text: inputValue }
    setMessages(prev => [...prev, userMsg])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      if (agentMode === 'ai') {
        if (currentInput.toLowerCase().includes('humain') || currentInput.toLowerCase().includes('agent') || messages.length > 3) {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'system', text: '⚠️ L\'assistant IA transmet le dossier à un expert...' }])
            setTimeout(() => {
                setAgentMode('human')
                setMessages(prev => [...prev, { id: Date.now() + 2, sender: 'human', text: 'Bonjour, je suis Sarah, experte technique chez Doxa. Je viens de lire votre dossier. Je reprends la main sur la conversation.' }])
            }, 2000)
        } else {
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: 'Je comprends. D\'après notre base de connaissances, avez-vous essayé de vérifier vos paramètres de compte ?' }])
        }
      } else {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'human', text: 'Je vérifie cela tout de suite dans notre base de données.' }])
      }
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
      <div className={`p-4 px-6 border-b flex justify-between items-center transition-colors duration-500 ${agentMode === 'human' ? 'bg-[#714BD2] text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="flex items-center gap-4">
             <div className="relative">
                <div className={`w-3 h-3 rounded-full absolute bottom-0 right-0 border-2 border-white ${agentMode === 'human' ? 'bg-green-400' : 'bg-[#FCEE21]'}`}></div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-sm ${agentMode === 'human' ? 'bg-white/20' : 'bg-white border'}`}>
                    {agentMode === 'ai' ? <CpuChipIcon className="w-6 h-6" /> : <UserIcon className="w-6 h-6" />}
                </div>
             </div>
             <div>
                <h3 className="font-bold text-lg leading-tight">{agentMode === 'ai' ? 'Doxa Assistant' : 'Sarah (Expert Doxa)'}</h3>
                <p className={`text-xs ${agentMode === 'human' ? 'text-white/80' : 'text-gray-500'}`}>{agentMode === 'ai' ? 'Intelligence Artificielle' : 'Support Premium • En ligne'}</p>
             </div>
        </div>
        <button onClick={onResolve} className={`text-xs font-bold border px-4 py-2 rounded-full transition-colors ${agentMode === 'human' ? 'border-white/30 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'}`}>Fermer le ticket</button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F9FAFB]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'system' ? (
                <div className="w-full flex items-center gap-4 my-4 opacity-75">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-2">{msg.text}</p>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>
            ) : (
                <div className={`max-w-[80%] p-5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                    msg.sender === 'user' ? 'bg-[#141516] text-white rounded-tr-none' : msg.sender === 'human' ? 'bg-white border border-[#714BD2] text-gray-800 rounded-tl-none border-l-4' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                }`}>{msg.text}</div>
            )}
          </div>
        ))}
        {isTyping && (
             <div className="flex items-center gap-1 text-gray-400 text-sm ml-2 bg-white px-4 py-3 rounded-2xl w-fit border border-gray-100 shadow-sm">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex gap-3">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Écrivez votre message..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#714BD2] focus:bg-white transition-all shadow-inner"/>
            <button onClick={handleSend} disabled={!inputValue.trim()} className="p-4 bg-[#FCEE21] text-black rounded-xl hover:bg-[#e6d91e] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"><PaperAirplaneIcon className="w-6 h-6 -rotate-45 translate-x-[-2px] translate-y-[1px]" /></button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// 3. PAGE PRINCIPALE (LAYOUT GLOBAL CORRIGÉ)
// ============================================================================
export default function ClientDashboard() {
  const [view, setView] = useState<'form' | 'chat' | 'list'>('form')
  const [currentTicket, setCurrentTicket] = useState<any>(null)

  const handleTicketCreated = (data: any) => {
    setCurrentTicket(data)
    setView('chat')
  }

  return (
    // AJOUT: 'flex' sur le conteneur principal pour permettre l'alignement
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pt-24 font-sans text-gray-900">
      
      {/* Container Flex pour Sidebar et Contenu */}
      <div className="flex flex-1">
        
        {/* --- SIDEBAR GAUCHE --- */}
        {/* CHANGEMENT MAJEUR ICI :
            - Remplacement de 'fixed' par 'sticky'.
            - top-24 : Elle colle en haut (sous la navbar).
            - h-[calc(100vh-6rem)] : Elle prend la hauteur de l'écran moins la navbar.
            - Comme elle est dans un flex, elle ne passera pas par-dessus le footer qui sera après ce bloc 'flex'.
        */}
        <aside className="w-72 bg-white border-r border-gray-200 hidden md:flex flex-col p-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto shrink-0">
            
            <div className="mb-10">
                <h2 className="font-extrabold text-xl tracking-tight text-gray-400 uppercase text-xs mb-2">Menu Principal</h2>
                <div className="text-2xl font-bold">DOXA <span className="text-[#714BD2]">Desk</span></div>
            </div>
            
            <nav className="space-y-3 flex-1">
            <button onClick={() => setView('form')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-200 text-left group ${view === 'form' || view === 'chat' ? 'bg-[#141516] text-white shadow-lg shadow-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-[#714BD2]'}`}>
                <TicketIcon className="w-6 h-6" />
                <span>Espace Résolution</span>
                {(view === 'form' || view === 'chat') && <span className="ml-auto w-2 h-2 rounded-full bg-[#FCEE21]"></span>}
            </button>
            <button onClick={() => setView('list')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-200 text-left group ${view === 'list' ? 'bg-[#141516] text-white shadow-lg shadow-gray-200' : 'text-gray-500 hover:bg-gray-50 hover:text-[#714BD2]'}`}>
                <ListBulletIcon className="w-6 h-6" />
                <span>Historique</span>
            </button>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-3 shrink-0 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                    <UserIcon className="w-full h-full p-2 text-gray-400" />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-900">Amine Belabed</p>
                    <p className="text-xs text-gray-400">Client Premium</p>
                </div>
            </div>
        </aside>

        {/* --- CONTENU PRINCIPAL --- */}
        {/* Suppression de 'ml-72' car Flexbox gère l'espace automatiquement */}
        <main className="flex-1 p-6 lg:p-12 transition-all duration-300 overflow-hidden">
            <div className="max-w-5xl mx-auto h-full">
                
                {/* Header Mobile */}
                <div className="md:hidden mb-8 flex justify-between items-center">
                    <span className="font-extrabold text-xl text-gray-900">DOXA DASHBOARD</span>
                </div>

                {/* --- VUE 1 : FORMULAIRE --- */}
                {view === 'form' && (
                    <div className="animate-fade-in-up">
                        <div className="mb-10 text-center md:text-left">
                            <h1 className="text-4xl font-extrabold mb-3 text-[#141516]">Bonjour, Amine 👋</h1>
                            <p className="text-gray-500 text-lg">Comment pouvons-nous vous aider aujourd'hui ?</p>
                        </div>
                        <TicketForm onTicketCreated={handleTicketCreated} />
                    </div>
                )}

                {/* --- VUE 2 : CHAT ACTIF --- */}
                {view === 'chat' && currentTicket && (
                    <div className="h-full flex flex-col animate-fade-in-up">
                        <button onClick={() => setView('form')} className="mb-4 text-sm font-bold text-gray-500 hover:text-[#714BD2] flex items-center gap-2 w-fit transition-colors">
                            &larr; Retour au formulaire
                        </button>
                        <FullPageChat ticketData={currentTicket} onResolve={() => setView('list')} />
                    </div>
                )}

                {/* --- VUE 3 : HISTORIQUE --- */}
                {view === 'list' && (
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-8 text-[#141516]">Vos Tickets Récents</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-200 transition-all cursor-pointer group">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-1 p-2 bg-white rounded-lg border border-gray-200 text-gray-400 group-hover:text-[#714BD2] transition-colors">
                                            <TicketIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900 group-hover:text-[#714BD2] transition-colors">Problème de connexion #{100+i}</h4>
                                            <p className="text-sm text-gray-500 mt-1">Fermé le 22 Dec 2025 • Catégorie: Technique</p>
                                        </div>
                                    </div>
                                    <span className="mt-4 md:mt-0 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 border border-green-200">
                                        <CheckCircleIcon className="w-4 h-4"/> Résolu
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
      </div>
    </div>
  )
}