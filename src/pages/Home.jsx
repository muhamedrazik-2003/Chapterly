import React from 'react'

const Home = () => {
    return (
        <main>
            {/* hero section */}
            <section className='h-[50vh] flex flex-col items-center justify-center text-center space-y-8'>
                <div className='space-y-0.5'>
                    <p className='text-lg text-primary'>DISCOVER THE BOOKS THAT SHAPE YOU</p>
                    <h1 className='text-4xl w-xl'>Capture and Rate Your
                        Personal Reading Library with Chartify</h1>
                </div>
                <input 
                    type="search"
                    placeholder='What are you reading today? Search Chapterly...' 
                    className='bg-slate-900 px-4 cursor-pointer border border-secondary rounded-full h-9 w-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 ' />
            </section>
        </main>
    )
}

export default Home
