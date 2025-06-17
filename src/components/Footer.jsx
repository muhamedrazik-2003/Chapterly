import { Heart } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full flex items-center justify-center p-3 border-t border-secondary mt-15 text-slate-400'>
        <p>Chapterly 2025. Made with <Heart className='inline-block size-5 text-rose-700'/> by <a className='text-accent font-semibold' href="https://github.com/muhamedrazik-2003">Muhamed Razik</a></p>
    </footer>
  )
}

export default Footer
