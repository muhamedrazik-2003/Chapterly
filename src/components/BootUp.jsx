
const BootUp = ({isBooting}) => {
    
    return (
        <div id='bootup' className={`fixed w-full h-full bg-background inset-0 ${isBooting ? 'flex' : "hidden"}  justify-center items-center`}>
            <div className='flex flex-col items-center animate-pulse'>
                <img src="/chapterly-logo.png" className='size-10 md:size-20' alt="" />
                <h1 className='text-2xl md:text-4xl'>Chapterly</h1>
            </div>
        </div>
    )
}

export default BootUp
