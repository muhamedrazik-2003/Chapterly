import React from 'react'

const Header = () => {
    return (
        <section className='mx-12 flex justify-between center mt-5'>
            <div className='flex items-center'>
                <img src="./chapterly-logo.png" alt="" className='size-8' />
                <h1 className='text-2xl font-medium'>Chapterly</h1>
            </div>
            <div className='flex gap-2 items-center'>
                {/* <h2 className='py-1'>Muhamed Razik</h2> */}
                <div className='p-1 bg-slate-700 rounded-full'>MR</div>
            </div>
        </section>
    )
}

export default Header
