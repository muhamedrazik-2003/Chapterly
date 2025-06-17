import { RefreshCw } from "lucide-react"

const UpdateSkeleton = () => {
  return (
    <div id='bootup' className={`w-full h-[72vh] bg-background flex justify-center items-center`}>
            <div className='flex items-center gap-3 animate-pulse'>
                <RefreshCw className='size-6 md:size-10 animate-spin' alt="" />
                <h1 className='text-xl md:text-2xl'>Updating Your Book</h1>
            </div>
        </div>
  )
}

export default UpdateSkeleton
