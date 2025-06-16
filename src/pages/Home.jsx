import React, { useEffect } from 'react'
import BookCard from '../components/BookCard'
import { fetchBooks } from '../redux/slices/bookSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
const Home = () => {
    const { books, loading, error } = useSelector(state => state.bookSlice)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBooks())
    }, [])

    return (
        <main>
            {/* hero section */}
            <section className='my-8 md:my-15 pb-6 md:pb-10 flex flex-col items-center justify-center text-center space-y-8'>
                <div className='space-y-0.5'>
                    <p className='text-sm md:text-lg text-primary'>DISCOVER THE BOOKS THAT SHAPE YOU</p>
                    <h1 className='text-2xl md:text-4xl  md:w-xl  leading-6 md:leading-none text-pretty'>Capture and Rate Your
                        Personal Reading Library with Chapterly</h1>
                </div>
                <input
                    type="search"
                    placeholder='What are you reading today? Search Chapterly...'
                    className='md:p-5 md:h-9 sm:w-lg md:w-xl'
                    onChange={(e) => handleSearch(e.target.value)} />
            </section>
        
            <section className=' xl:w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6 md:gap-y-10 justify-center mb-5 md:mb-10'>
                {
                    loading
                        ? Array.from({ length: 10 }).map((_, index) => (
                            <BookCard isLoading={loading} />
                        ))
                        :error ? error
                        : <>{books?.map(item => (
                            <Link to={`/book/${item.id}`}>
                                <BookCard bookData={item} />
                            </Link>

                        ))}
                        </>
                }
            </section>
        </main >
    )
}

export default Home
