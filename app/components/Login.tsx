"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white text-gray-900 overflow-hidden ">
      
      {/* =========================================s
          1. CONTENU CENTRAL (Formulaire)
      ========================================== */}
      <div className="mt-20 mb-20 relative z-10 w-full max-w-xl mt-45 px-6 pt-12 pb-6 pl-20 pr-20 backdrop-blur-sm sm:backdrop-blur-none bg-gray-200/100 rounded-3xl p-8 md:p-12 shadow-lg ">
        
        <div style={{position:"relative",display:"flex", alignItems:"left", justifyContent:"space-between"}}>

          <div className="mb-10 text-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            Log in
          </h2>
        
          
        </div>

        <div style={{position:"absolute", width:"200px", top:"-100px", right:"-20px"}}>
            <img src="./safe 2.svg" alt=""/>
          </div>
        </div>
        

        
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Mail
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Type your mail"
                required
                className="mb-5 block w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#714BD2] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Type your password"
                required
                className=" mb-5 block w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#714BD2] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-2 text-sm">
            <a href="#" className="font-medium text-[#714BD2] hover:text-indigo-500">
              Forgot Password?
            </a>
            <div className="text-gray-500">
              Don’t have an account?{' '}
              <Link href="/signup" className="font-medium text-[#714BD2] hover:text-indigo-500">
                Sign up
              </Link>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded-full bg-[#FCEE21] px-3 py-3 text-sm font-bold text-black shadow-sm hover:bg-[#e6d91e] transition-colors"
            >
              Submit
            </button>
          </div>
        
      </div>

      {/* =========================================
          2. IMAGE POSITIONED BELOW
      ========================================== */}
      <div className="relative flex left-0 bottom-0 right-0 w-100% mb-40 ">
        <div className="relative x w-full h-24 md:h-32 ">
            <img
              src="/Group 359.svg" 
              alt="Decorative background" 
              className="" 
            />
        </div>
      </div>
    </div>
  )
}