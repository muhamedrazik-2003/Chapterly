
const BookCard = ({ isLoading, bookData }) => {
    return (
        <>
            {isLoading
                ? <div className=' flex flex-col items-center space-y-4 mx-3 md:mx-9 animate-pulse'>
                    <div className='h-50 sm:h-55 md:h-60 w-34 md:w-39 bg-slate-900 rounded-sm'></div>
                    <div className='flex flex-col items-center space-y-2'>
                        <div className='h-3  rounded w-35 bg-slate-900'></div>
                        <div className='h-2 bg-slate-900 rounded w-25'></div>
                    </div>
                </div>

                : <div className=' flex flex-col items-center space-y-2 md:space-y-3 mx-3  md:mx-9'>
                    <img
                        className='h-50 sm:h-55 md:h-60 w-39 bg-slate-900'
                        src={bookData?.cover} alt="" />
                    <div className='text-center md:px-1'>
                        <h2 className='text-sm md:text-md text-title font-semibold'>{bookData?.title}</h2>
                        <p className='text:xs md:text-sm italic text-primary font-medium'>{bookData?.genre}</p>
                    </div>
                </div>

            }


        </>

    )
}


export default BookCard
