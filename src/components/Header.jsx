import React, { useRef, useState } from 'react'
import { CirclePlus, Plus } from 'lucide-react'
import { addNewBook } from '../redux/slices/bookSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        genre: '',
        status: '',
        rating: '',
        dateAdded: '',
        cover: '',
        notes: '',
        quotes: [],
        link: ''
    })
    const { books } = useSelector(state => state.bookSlice)
    const modalRef = useRef(null)
    const dispatch = useDispatch()

    const handleBookSubmit = (newBookData) => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const newData = {
            ...newBookData,
            dateAdded: formattedDate
        };
        const existing = books.find(book => book.title === newData.title);
        if (existing) {
            alert("Exist")
        } else {
            setNewBook({
                title: '',
                author: '',
                genre: '',
                status: '',
                rating: '',
                dateAdded: '',
                cover: '',
                notes: '',
                quotes: [],
                link: ''
            })
            dispatch(addNewBook(newData))
            modalRef.current?.close()
        }
    }

    const handleModal = () => {
        modalRef.current?.showModal()
    }
    const handleModalClose = () => {
        modalRef.current?.close()
    }
    return (
        <>
            <section className='mx-6 md:mx-12 flex justify-between center mt-5'>
                <Link to={'/'}>
                    <div className='flex items-center'>
                        <img src="/chapterly-logo.png" alt="" className='size-8' />
                        <h1 className='text-2xl font-medium hidden md:block'>Chapterly</h1>
                    </div>
                </Link>

                <div className=''>
                    <button
                        onClick={() => handleModal()}
                        className='flex gap-2 px-3'><CirclePlus /><span className='hidden sm:block'>Add New</span>Book</button>
                </div>
                {/* add Book Modal */}
                <dialog ref={modalRef} className='bg-transparent w-full h-full'>
                    <div className='bg-background text-white md:w-4xl p-6 rounded-3xl mx-auto mt-[13vh]'>
                        <form action="dialog" onSubmit={() => handleBookSubmit(newBook)}>
                            <div className='flex flex-col md:flex-row gap-6 items-center justify-center overflow-auto md:h-[62vh]'>

                                <div className='flex flex-col gap-4 items-center text-sm'>
                                    <img
                                        className=' h-35'
                                        src={newBook?.cover || '/public/covers/fallback.svg'} alt=""
                                    />
                                    <div className='space-y-2'>
                                        <p>Cover Url <span className='text-xs border py-0.5 px-2 rounded-2xl text-yellow-500'>recommended</span></p>
                                        <input
                                            type='text'
                                            onChange={(e) => setNewBook({ ...newBook, cover: e.target.value })}
                                            className='bg-slate-900 h-8 text-sm md:text-md w-85'
                                            placeholder='Enter Your Book Cover URL'
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="notes" className='px-2 mb-2'>Notes  <span className='text-xs border py-0.5 px-2 rounded-2xl text-slate-500'>Optional</span></label>
                                        <textarea
                                            name='notes'
                                            rows={3}
                                            className='text-title w-85 rounded-2xl'
                                            onChange={(e) => setNewBook({ ...newBook, notes: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className='space-y-5 text-sm md:text-md text-slate-200 mb-6 mx-auto'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="title" className='px-2 mb-2'>Title <span className='text-red-500'>*</span></label>
                                        <input
                                            name='title'
                                            required
                                            className='text-title w-85 md:w-110  h-8 user-invalid:ring-red-500'
                                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="author" className='px-2 mb-2'>Author <span className='text-red-500'>*</span></label>
                                        <input
                                            name='author'
                                            required
                                            className='text-title w-85 md:w-110  h-8 user-invalid:ring-red-500'
                                            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="genre" className='px-2 mb-2'>Genre <span className='text-xs border py-0.5 px-2 rounded-2xl text-yellow-500'>recommended</span></label>
                                        <input
                                            name='genre'
                                            placeholder='Action'
                                            className='text-title w-85 md:w-110  h-8'
                                            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                                        />
                                    </div>
                                    <div className='flex gap-7'>
                                        <div className='flex gap-2 items-center'>
                                            <label htmlFor="status" className='px-1'>Status :</label>
                                            <select
                                                name='status'
                                                className='bg-slate-900'
                                                onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
                                                defaultValue={'To Read'}
                                            >
                                                <option value="Completed">Completed</option>
                                                <option value="Reading">Reading</option>
                                                <option default value="To Read">To Read</option>
                                            </select>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <label htmlFor="rating" className='px-1'>Rating :</label>
                                            <select
                                                name='rating'
                                                className='w-40 '
                                                onChange={(e) => setNewBook({ ...newBook, rating: e.target.value })}
                                                defaultValue={0}
                                            >
                                                <option value="5">⭐ ⭐ ⭐ ⭐ ⭐</option>
                                                <option value="4">⭐ ⭐ ⭐ ⭐ </option>
                                                <option value="3">⭐ ⭐ ⭐</option>
                                                <option value="2">⭐ ⭐</option>
                                                <option value="1">⭐</option>
                                                <option value="0">Not Rated Yet</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="link" className='px-2 mb-2'>External Link   <span className='text-xs border py-0.5 px-2 rounded-2xl text-slate-500'>Optional</span></label>
                                        <input
                                            name='link'
                                            placeholder='Enter An External Reading Link'
                                            className='text-title w-85 md:w-110  h-8'
                                            onChange={(e) => setNewBook({ ...newBook, link: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end gap-3'>
                                <button
                                    type='button'
                                    onClick={() => handleModalClose()}
                                    className=' border-2 bg-transparent border-red-700 text-red-500'>
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='flex gap-2 items-center'>
                                    Save Changes
                                </button>
                            </div>

                        </form>
                    </div>
                </dialog>
            </section>

        </>

    )
}

export default Header
