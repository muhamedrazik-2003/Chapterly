import React from 'react'

const BookCard = ({ booksData }) => {
    return (
        <>

            {booksData.map((item) => (
                <div className=' flex flex-col items-center space-y-3 mx-9'>
                    <img
                        className='h-60'
                        src={item.cover} alt="" />
                    <div className='self-start'>
                        <h2 className='text-md text-title font-semibold'>{item.title}</h2>
                        <p className='text-sm italic text-primary font-medium'>{item.genre}</p>
                    </div>
                </div>
            ))
            }
        </>
    )
}


export default BookCard
