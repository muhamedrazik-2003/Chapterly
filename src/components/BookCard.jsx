import React from 'react'

const BookCard = ({ isLoading, bookData }) => {
    return (
        <>
            {isLoading
                ? <div className=' flex flex-col items-center space-y-4 mx-9 animate-pulse'>
                    <div className='h-60 w-40 bg-slate-900 rounded-sm'></div>
                    <div className='flex flex-col items-center space-y-2'>
                        <div className='h-3  rounded w-35 bg-slate-900'></div>
                        <div className='h-2 bg-slate-900 rounded w-25'></div>
                    </div>
                </div>

                : <div className=' flex flex-col items-center space-y-3 mx-9'>
                    <img
                        className='h-60'
                        src={bookData?.cover} alt="" />
                    <div className='text-center px-1'>
                        <h2 className='text-md text-title font-semibold'>{bookData?.title}</h2>
                        <p className='text-sm italic text-primary font-medium'>{bookData?.genre}</p>
                    </div>
                </div>

            }


        </>

    )
}


export default BookCard
