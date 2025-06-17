import { CircleX, Edit, Pen, PenOff, Trash2 } from 'lucide-react'
import { updateBook, deleteBook } from '../redux/slices/bookSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import updateSkelton from '../components/updateSkelton'
import UpdateSkeleton from '../components/updateSkelton'

const BookDetail = () => {
  const { books, isUpdating } = useSelector(state => state.bookSlice);
  const [isEditing, setIsEditing] = useState(false)
  const [isNotesEditing, setIsNotesEditing] = useState(false)
  const [isQuotesEditing, setIsQuotesEditing] = useState(false)
  const dispatch = useDispatch()
  const { bookId } = useParams()

  const currentBook = books.find(book => book.id === bookId)
  const [updatedBook, setUpdatedBook] = useState({ ...currentBook })
  const [quoteInput, setQuoteInput] = useState(currentBook?.quotes?.join(', ') || '');

  const navigate = useNavigate()

  const setStatusClass = () => {
    if (currentBook?.status === "Completed") {
      return "text-black font-semibold rounded-full bg-green-500 px-4 py-0.5 mx-1";
    } else if (currentBook?.status === "Reading") {
      return "text-black font-semibold rounded-full bg-blue-500 px-4 py-0.5 mx-1";
    } else {
      return "text-black font-semibold rounded-full bg-yellow-500 px-4 py-0.5 mx-1";
    }
  }
  const handleBookDataUpdate = (BookId, updatedBookData) => {
    console.log(BookId)
    console.log(updatedBookData)
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const newData = { ...updatedBookData, dateAdded: formattedDate }
    dispatch(updateBook({ bookId: BookId, updatedBookData: newData }))
  }
  const setRating = (rating) => {
    if (rating === '0') {
      return "Not Rated Yet"
    } else if (rating === '1') {
      return "⭐"
    } else if (rating === '2') {
      return "⭐ ⭐"
    } else if (rating === '3') {
      return "⭐ ⭐ ⭐"
    } else if (rating === '4') {
      return "⭐ ⭐ ⭐ ⭐"
    } else {
      return "⭐ ⭐ ⭐ ⭐ ⭐"
    }
  }
  const handleDeleteBook = (BookId) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (confirmed) {
      dispatch(deleteBook(BookId))
      navigate('/')
      setUpdatedBook({})
    }
  }

  return (
    <div className=' xl:w-6xl mx-auto text-center mt-5'>
      {isUpdating
        ? <UpdateSkeleton />
        : <>
          <div className='flex flex-col md:flex-row gap-6 md:gap-0 justify-center items-center md:p-4 border-b border-blue-950 pb-6 md:pb-12 pt-6'>
            <div className='md:w-[50%] flex justify-center  items-center space-y-4'>
              {isEditing
                ? <div className='flex flex-col gap-2 md:gap-6 items-center '>
                  <img
                    className='h-55 md:h-60'
                    src={updatedBook?.cover} alt=""
                  />
                  <div className='space-y-2'>
                    <p>Cover Url</p>
                    <input
                      type='text'
                      onChange={(e) => setUpdatedBook({ ...updatedBook, cover: e.target.value })}
                      className='bg-slate-9000 md:w-100'
                      placeholder='Enter Your Book Cover URL'
                      defaultValue={currentBook.cover} />
                  </div>
                </div>
                : <img
                  className='h-60 md:h-75'
                  src={currentBook?.cover || "/public/covers/fallback.svg"} alt="" />
              }
            </div>
            <div className='text-start flex flex-col w-[310px] justify-center items-center md:justify-start md:items-start  md:w-[50%] space-y-2  md:space-y-4 text-pretty'>
              {isEditing
                ?
                <>
                  <input
                    className='text-title text-2xl md:text-3xl md:w-130 font-semibold '
                    placeholder='Book Title'
                    onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}
                    defaultValue={currentBook?.title} />
                  <input
                    className='text-lg md:text-2xl font-semibold md:w-130 text-amber-200'
                    placeholder='Book Author'
                    onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
                    defaultValue={currentBook?.author} />
                  <div className='space-y-2.5  text-sm md:text-base text-slate-200 mb-6'>
                    <div className='flex gap-2 items-center '>
                      <p>Genre : </p>
                      <input
                        className=' w-40 md:w-50'
                        placeholder='Action'
                        onChange={(e) => setUpdatedBook({ ...updatedBook, genre: e.target.value })}
                        defaultValue={currentBook?.genre} />
                    </div>
                    <div className='flex gap-2 items-center'>
                      <p>Status : </p>
                      <select
                        className='bg-slate-900 w-40 md:w-50'
                        onChange={(e) => setUpdatedBook({ ...updatedBook, status: e.target.value })}
                        defaultValue={currentBook?.status}>
                        <option value="Completed">Completed</option>
                        <option value="Reading">Reading</option>
                        <option value="To Read">To Read</option>
                      </select>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <p>Rating : </p>
                      <select
                        className='w-40 md:w-50'
                        onChange={(e) => setUpdatedBook({ ...updatedBook, rating: e.target.value })}

                        defaultValue={currentBook?.rating}>
                        <option value="5">⭐ ⭐ ⭐ ⭐ ⭐</option>
                        <option value="4">⭐ ⭐ ⭐ ⭐ </option>
                        <option value="3">⭐ ⭐ ⭐</option>
                        <option value="2">⭐ ⭐</option>
                        <option value="1">⭐</option>
                        <option value="0">Not Rated Yet</option>
                      </select>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <p>External Link :</p>
                      <input
                        className='text-slate-200 md:w-62'
                        onChange={(e) => setUpdatedBook({ ...updatedBook, link: e.target.value })}

                        defaultValue={'Not Available'} />
                    </div>
                    <p className='text-slate-700 hidden'>Date Added : June 12 2029</p>
                  </div>
                </>
                :
                <>
                  <h1 className='text-title text-2xl md:text-6xl'>{currentBook?.title}</h1>
                  <h2 className='text-xl md:text-2xl font-semibold text-amber-200'>By {currentBook?.author}</h2>
                  <div className='space-y-1.5  md:text-lg text-slate-200'>
                    <p >Genre : {currentBook?.genre}</p>
                    <p>Status : <span className={setStatusClass()}>{currentBook?.status}</span></p>
                    <p>Ratings : {setRating(currentBook?.rating)}</p>
                    <p className='text-slate-200'>External link : Not Provided</p>
                    <p className='text-slate-700'>Last Updated : {currentBook?.dateAdded}</p>
                  </div>
                </>
              }

              <div className='flex gap-3 md:gap-6'>
                {isEditing
                  ? <>
                    <button
                      onClick={() => {
                        handleBookDataUpdate(currentBook?.id, updatedBook);
                        setIsEditing(prev => !prev);
                      }}
                      className='flex gap-2 items-center  text-green-500'>
                      <Pen className='size-4' />
                      Update <span className='hidden md:block'> Your Book</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className={`flex gap-2 items-center text-red-500 hover:bg-red-900 hover:text-red-100 active:bg-red-950 focus:outline-red-500`}>
                      <PenOff className='size-4' />
                      Cancel
                    </button>
                  </>
                  :
                  <>
                    <button
                      onClick={() => setIsEditing(prev => !prev)}
                      className='flex gap-2 items-center'>
                      <Pen className='size-4' />
                      Edit <span className='hidden md:block'> Your Book</span>
                    </button>
                    <button
                      onClick={() => handleDeleteBook(currentBook?.id)}
                      className={`flex gap-2 items-center text-red-500 hover:bg-red-900 hover:text-red-100 active:bg-red-950 focus:outline-red-500 ${isEditing ? 'hidden' : ''}`}>
                      <Trash2 className='size-4' />
                      Delete <span className='hidden md:block'> Your Book</span>
                    </button>
                  </>
                }
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row text-left gap-5 my-6 md:my-8'>
            <div className=' space-y-2 px-8 md:px-15  text-justify md:w-[50%] '>
              <div className='flex justify-between'>
                <h2>My Notes</h2>
                {isNotesEditing
                  ? <CircleX
                    onClick={() => setIsNotesEditing(false)}
                    className='size-4 md:size-5 text-red-500 ' />
                  : <Edit
                    onClick={() => setIsNotesEditing(true)}
                    className={`size-4 md:size-5 text-primary  ${isQuotesEditing ? 'hidden' : ''}`} />

                }
              </div>
              {
                isUpdating ? <p>Updating...</p>
                  : <>
                    {
                      isNotesEditing
                        ? <>
                          < textarea
                            rows={3}
                            className='text-sm md:text-base w-full rounded-2xl p-2'
                            placeholder='Your Notes About the Book'
                            defaultValue={currentBook?.notes}
                            onChange={(e) => setUpdatedBook({ ...updatedBook, notes: e.target.value })}

                          />
                          <button
                            onClick={() => {
                              handleBookDataUpdate(currentBook?.id, updatedBook);
                              setIsNotesEditing(false);
                            }}
                            className='text-green-500'
                          >
                            Save Notes
                          </button>
                        </>
                        : <p className='text-sm md:text-base text-pretty'>
                          {currentBook?.notes.length > 0
                            ? currentBook?.notes
                            : <span className='text-slate-700'>Add Your First Note Here 😊 !</span>
                          }</p>
                    }
                  </>
              }
            </div>

            <div className='space-y-2 px-8 md:px-15 text-justify md:w-[50%]'>
              <div className='flex justify-between'>
                {isQuotesEditing
                  ?
                  <>
                    <h2>My Favorite Quotes  <span className='text-xs text-yellow-500'>use Comma to seperate qoutes</span></h2>
                    <CircleX
                      onClick={() => setIsQuotesEditing(false)}
                      className='size-4 md:size-5 text-red-500' />
                  </>
                  :
                  <>
                    <h2>My Favorite Quotes</h2>
                    <Edit
                      onClick={() => setIsQuotesEditing(true)}
                      className={`size-4 md:size-5 text-primary  ${isNotesEditing ? 'hidden' : ''}`} />
                  </>
                }
              </div>
              {
                isUpdating ? <p>Updating...</p>
                  :
                  <ul className="list-disc list-inside italic  text-sm md:text-base text-pretty">
                    {isQuotesEditing
                      ? <>
                        <textarea
                          rows={3}
                          className='text-sm md:text-base w-full rounded-2xl p-2'
                          placeholder='Your Favorite Quotes (comma-separated)'
                          value={quoteInput}
                          onChange={(e) => setQuoteInput(e.target.value)}
                        />
                        <button
                          onClick={() => {
                            const updatedQuotes = quoteInput
                              .split(',')
                              .map(q => q.trim())
                              .filter(q => q.length > 0);

                            const updatedData = {
                              ...updatedBook,
                              quotes: updatedQuotes,
                            };

                            dispatch(updateBook({ bookId: currentBook.id, updatedBookData: updatedData }));
                            setIsQuotesEditing(false);
                          }}
                          className='text-green-500 hover:underline mt-2'
                        >
                          Save Quotes
                        </button>
                      </>
                      : <>
                        {currentBook?.quotes.length > 0
                          ? currentBook?.quotes.map((quote, index) => (
                            <li key={index}>{quote}</li>
                          ))
                          : <span className='text-slate-700'>Add Your Favorite Quotes Here 😊 !</span>
                        }
                      </>
                    }
                  </ul>
              }

            </div>
          </div >
        </>
      }

    </div >
  )
}

export default BookDetail
