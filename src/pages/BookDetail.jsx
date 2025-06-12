import { Edit, Pen, Trash2 } from 'lucide-react'
import { updateBook } from '../redux/slices/bookSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const BookDetail = () => {
  const { books } = useSelector(state => state.bookSlice);
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useDispatch()
  const { bookId } = useParams()
  const currentBook = books.find(book => book.id === bookId)
  const [updatedBook, setUpdatedBook] = useState({ ...currentBook })

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
    if (rating === '1') {
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

  return (
    <div className='h-[60vh] w-6xl mx-auto text-center my-8'>
      {/* <h1 className='text-xl mb-8'>Add New Book to Your List</h1> */}
      <div className='flex p-4 border-b border-blue-950 pb-12'>
        <div className='w-[50%] flex justify-center  items-center space-y-4'>
          {isEditing
            ? <div className='flex flex-col gap-6 items-center '>
              <img
                className='h-60'
                src={updatedBook?.cover} alt="" />
              <div className='space-y-2'>
                <p>Cover Url</p>
                <input
                  type='text'
                  onChange={(e) => setUpdatedBook({ ...updatedBook, cover: e.target.value })}
                  className='bg-slate-900 w-100'
                  placeholder='Enter Your Book Cover URL'
                  defaultValue={currentBook.cover} />
              </div>
            </div>
            : <img
              className='h-75'
              src={currentBook?.cover} alt="" />
          }
        </div>
        <div className='text-start w-[50%] space-y-4'>
          {isEditing
            ?
            <>
              <input
                className='text-title text-3xl w-130 font-semibold'
                onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}
                defaultValue={currentBook?.title} />
              <input
                className='text-2xl font-semibold text-amber-200'
                onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
                defaultValue={currentBook?.author} />
              <div className='space-y-2.5 text-lg text-slate-200 mb-6'>
                <div className='flex gap-2 items-center '>
                  <p>Genre : </p>
                  <input
                    className='w-50'
                    onChange={(e) => setUpdatedBook({ ...updatedBook, genre: e.target.value })}
                    defaultValue={currentBook?.genre} />
                </div>
                <div className='flex gap-2 items-center'>
                  <p>Status : </p>
                  <select
                    className='bg-slate-900 w-50'
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
                    className='w-50'
                    onChange={(e) => setUpdatedBook({ ...updatedBook, rating: e.target.value })}

                    defaultValue={currentBook?.rating}>
                    <option value="5">⭐ ⭐ ⭐ ⭐ ⭐</option>
                    <option value="4">⭐ ⭐ ⭐ ⭐ </option>
                    <option value="3">⭐ ⭐ ⭐</option>
                    <option value="2">⭐ ⭐</option>
                    <option value="1">⭐</option>
                  </select>
                </div>
                <div className='flex gap-2 items-center'>
                  <p>External Link :</p>
                  <input
                    className='text-slate-200 w-62'
                    onChange={(e) => setUpdatedBook({ ...updatedBook, link: e.target.value })}

                    defaultValue={'Not Available'} />
                </div>
                <p className='text-slate-700 hidden'>Date Added : June 12 2029</p>
              </div>
            </>
            :
            <>
              <h1 className='text-title text-6xl'>{currentBook?.title}</h1>
              <h2 className='text-2xl font-semibold text-amber-200'>By {currentBook?.author}</h2>
              <div className='space-y-2 text-md text-slate-200'>
                <p >Genre : {currentBook?.genre}</p>
                <p>Status : <span className={setStatusClass()}>{currentBook?.status}</span></p>
                <p>Ratings : {setRating(currentBook?.rating)}</p>
                <p className='text-slate-200'>External link : Not Provided</p>
                <p className='text-slate-700'>Date Added : June 12, 2029</p>
              </div>
            </>
          }



          <div className='flex gap-6 mt-5'>
            {isEditing
              ? <button
                onClick={() => {
                  handleBookDataUpdate(currentBook?.id, updatedBook);
                  setIsEditing(prev => !prev);
                }}
                className='flex gap-2 items-center  text-green-500'>
                <Pen className='size-4' />
                Update Your Book
              </button>
              : <button
                onClick={() => setIsEditing(prev => !prev)}
                className='flex gap-2 items-center'>
                <Pen className='size-4' />
                Edit Your Book
              </button>
            }
            <button
              className={`flex gap-2 items-center text-red-500 hover:bg-red-900 hover:text-red-100 active:bg-red-950 focus:outline-red-500 ${isEditing ? 'hidden' : ''}`}><Trash2 className='size-4' />Delete Book</button>
          </div>


        </div>

      </div>
      <div className=' mt-8 flex justify-end'>
      </div>
      <div className='flex text-left leading-8'>
        <div className=' space-y-2 px-15 text-justify w-[50%]'>
          <div className='flex justify-between'>
            <h2>My Notes</h2>
            <Edit className='size-5 text-primary' />
          </div>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rerum aut incidunt veritatis nihil modi atque nisi dignissimos sequi sunt!</p>
        </div>
        <div className='space-y-2 px-15 text-justify w-[50%]'>
          <div className='flex justify-between'>
            <h2>My Favorite Quotes</h2>
            <Edit className='size-5  text-primary' />
          </div>
          <ul className="list-disc list-inside italic">
            <li>“And, when you want something, all the universe...”</li>
            <li>“All the universe will Pray For You”</li>
          </ul>
        </div>
      </div>
    </div >
  )
}

export default BookDetail
