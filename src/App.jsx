import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'

const App = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book:id' element={<BookDetail/>}/>
      </Routes>
    </main>
  )
}

export default App
