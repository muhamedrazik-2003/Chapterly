import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import BookDetail from './pages/BookDetail'
import Header from './components/Header'
import Footer from './components/Footer'
import BootUp from './components/BootUp'

const App = () => {
  const [isBooting, setIsBooting] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsBooting(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
      <BootUp isBooting={isBooting} />
      <main className={`${isBooting ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700 ease-in`}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book/:bookId' element={<BookDetail />} />
        </Routes>
        <Footer />
      </main>
    </>
  )
}

export default App
