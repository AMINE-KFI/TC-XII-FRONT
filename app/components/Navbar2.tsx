"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef, ChangeEvent } from "react"
import { useRouter } from "next/navigation" // 1. Import du router
import { 
  BellIcon, 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon, // J'ai retiré Cog6ToothIcon si tu ne l'utilises pas, sinon remets-le
  UserIcon,
  CameraIcon 
} from '@heroicons/react/24/outline'

export default function DoxaNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter() // 2. Initialisation du router

  // ... (Tes useEffect pour le scroll et click outside restent ici, inchangés) ...
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      setIsScrolled(target.scrollTop > 10)
    }
    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll)
      return () => mainElement.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  // 3. LA FONCTION DE DÉCONNEXION
  const handleLogout = () => {
    // Ici, tu ajouteras plus tard la logique pour supprimer le token/session
    // Exemple : localStorage.removeItem('token')
    
    console.log("Déconnexion en cours...")
    
    // Redirection vers la page de login (ou home)
    router.push('/landingpage') // Remplace par le chemin de ta page de login
  }

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 bg-[#F9FAFB] border-b border-gray-100 h-24 flex items-center ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* GROUPE GAUCHE */}
          <div className="flex items-center gap-10 xl:gap-12">
            <Link href="/" className="flex items-center gap-3 cursor-pointer group select-none">
               <div className="relative w-45 h-40 -ml-25">
                 <Image src="/logo.svg" alt="DOXA Logo" fill className="object-contain" priority />
               </div>
            </Link>
            <div className="hidden lg:flex items-center gap-6">
               <div className="h-6 w-px bg-[#B6BBCC] mr-2"></div>
               <Link href="/contact" className="text-gray-500 font-bold text-base hover:text-[#714BD2] transition-colors">
                 Contact
               </Link>
            </div>
          </div>

          {/* GROUPE DROITE */}
          <div className="hidden lg:flex items-center gap-6 -mr-25">
            <button className="relative p-2.5 rounded-full hover:bg-white transition-colors group">
              <BellIcon className="w-7 h-7 text-gray-600 group-hover:text-[#714BD2] transition-colors" />
              <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#E2E5EB] group-hover:border-white"></span>
            </button>

            <div className="relative" ref={menuRef}>
                <div className="flex items-center gap-2">
                    <div 
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md cursor-pointer overflow-hidden relative bg-gray-200 hover:border-[#FCEE21] transition-all"
                    >
                        {profileImage ? (
                            <Image src={profileImage} alt="Profile" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <UserIcon className="w-6 h-6" />
                            </div>
                        )}
                    </div>
                    <label className="cursor-pointer p-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 absolute -bottom-1 -right-1 z-10">
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        <CameraIcon className="w-3 h-3 text-gray-600" />
                    </label>
                </div>

                {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform origin-top-right transition-all animate-fade-in-up">
                        <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                            <p className="text-sm font-bold text-gray-900">Mon Compte</p>
                            <p className="text-xs text-gray-500">client@doxa.com</p>
                        </div>

                        <div className="p-2">
                            {/* 4. LE LIEN VERS LE PROFIL (Déjà correct grâce à Link de Next.js) */}
                            <Link 
                                href="/profile" 
                                onClick={() => setIsProfileMenuOpen(false)} // Ferme le menu au clic
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 hover:text-[#714BD2] transition-colors"
                            >
                                <UserCircleIcon className="w-5 h-5" />
                                Profil
                            </Link>
                        </div>

                        <div className="p-2 border-t border-gray-50">
                            {/* 5. LE BOUTON DÉCONNEXION (Appelle handleLogout) */}
                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                            >
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                Déconnexion
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>

          {/* MOBILE BURGER */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900 focus:outline-none p-2">
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col items-center py-8 space-y-6">
             <Link href="/contact" className="text-gray-900 font-bold text-lg">Contact</Link>
             <div className="h-px w-10 bg-gray-100 my-2"></div>
             <Link href="/profile" className="text-gray-900 font-bold text-lg">Mon Profil</Link>
             {/* Déconnexion Mobile */}
             <button onClick={handleLogout} className="text-red-500 font-bold text-lg">Déconnexion</button>
          </div>
        </div>
      </nav>
    </>
  )
}