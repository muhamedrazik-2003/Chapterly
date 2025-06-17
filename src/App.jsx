import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book/:bookId' element={<BookDetail/>}/>
      </Routes>
      <Footer/>
    </main>
  )
}

export default App
