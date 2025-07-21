import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomepageGaming from './Pages/HomepageGaming'
import Navbar from './components/Navbar'
import Menus from './Pages/Menus'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-black'>
      <Navbar />
      <Routes>
       
          <Route path="/" element={<HomepageGaming/>} />
          <Route path="/menu" element={<Menus />} />
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App
