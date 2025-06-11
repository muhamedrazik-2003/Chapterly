import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import Header from './components/Header'

const App = () => {
  return (
    <main>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book:id' element={<BookDetail/>}/>
      </Routes>
    </main>
  )
}

export default App
