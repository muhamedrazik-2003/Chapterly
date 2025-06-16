import React from 'react'
import { Loader2 } from 'lucide-react' // Optional: You can replace with any spinner or remove

const UpdateSkeleton = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-amber-50/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-md bg-white border border-amber-200 animate-fade-in-up">
        <img
          src="/assets/chapterly-logo.png"
          alt="Updating"
          className="w-20 h-20 animate-pulse"
        />
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
          <span className="text-amber-800 font-medium text-lg">Updating your book...</span>
        </div>
      </div>
    </div>
  )
}

export default UpdateSkeleton
