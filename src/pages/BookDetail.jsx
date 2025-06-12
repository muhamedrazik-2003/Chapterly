import { Edit, Pen, Trash2 } from 'lucide-react'
import { updateBook } from '../redux/slices/bookSlice'
import { useDispatch } from 'react-redux'

const BookDetail = () => {
  const dispatch = useDispatch()
  return (
    <div className='h-[60vh] w-6xl mx-auto text-center my-8'>
      {/* <h1 className='text-xl mb-8'>Add New Book to Your List</h1> */}
      <div className='flex p-4 border-b border-blue-950 pb-12'>
        <div className='w-[50%] flex justify-center  items-center space-y-4'>
          <img
            className='h-75'
            src="/covers/fallback.svg" alt="" />
        </div>
        <div className='text-start w-[50%] space-y-4'>
          <h1 className='text-title text-6xl'>A Milion To  One</h1>
          <h2 className='text-2xl font-semibold text-amber-200'>By Antonio Lookman</h2>
          <div className='space-y-2 text-md text-slate-200'>
            <p >Genre : Action, Triller</p>
            <p>Status : Completed</p>
            <p>Ratings : ⭐ ⭐ ⭐ ⭐ ⭐</p>
            <p className='text-slate-200'>External link : Not Provided</p>
            <p className='text-slate-700'>Date Added : June 12 2029</p>

          </div>
          <div className='flex gap-6 mt-5'>
            <button
              onClick={() => dispatch(updateBook())} 
              className='flex gap-2 items-center'>
                <Pen className='size-4' />
                Edit Your Book
            </button>
            <button className='flex gap-2 items-center text-red-500 hover:bg-red-900 hover:text-red-100 active:bg-red-950 focus:outline-red-500 '><Trash2 className='size-4' />Delete Book</button>
          </div>


        </div>

      </div>
      <div className=' mt-8 flex justify-end'>
      </div>
      <div className='flex text-left leading-8'>
        <div className=' space-y-2 px-15 text-justify w-[50%]'>
          <div className='flex justify-between'>
            <h2>My Notes</h2>
            <Edit className='size-5 text-primary'/>
          </div>
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis rerum aut incidunt veritatis nihil modi atque nisi dignissimos sequi sunt!</p>
        </div>
        <div className='space-y-2 px-15 text-justify w-[50%]'>
          <div className='flex justify-between'>
            <h2>My Favorite Quotes</h2>
            <Edit className='size-5  text-primary'/>
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
