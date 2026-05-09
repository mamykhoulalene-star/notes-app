
import Notes from './pages/Notes'
import Home from './pages/Home'
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom'
import './App.css'

function App() {
  
  return (
    <>
    <BrowserRouter>
    
      <nav>
      <Link to='/'>Home</Link>
      <Link to='/notes'>Notes</Link>
      </nav>
    
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/notes' element={<Notes/>}/>
      </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
