import React, { useRef, useState } from 'react'
import { CirclePlus, Plus } from 'lucide-react'
import { addNewBook } from '../redux/slices/bookSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AddBookDialog from './AddBookDialog'

const Header = () => {
    return (
        <>
            <section className='mx-6 md:mx-12 flex justify-between center mt-5'>
                <Link to={'/'}>
                    <div className='flex items-center'>
                        <img src="/chapterly-logo.png" alt="" className='size-8' />
                        <h1 className='text-2xl font-medium hidden md:block'>Chapterly</h1>
                    </div>
                </Link>
                <AddBookDialog/>                
            </section>

        </>

    )
}

export default Header
