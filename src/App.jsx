
import Notes from './pages/Notes'
import Home from './pages/Home'
import { BrowserRouter,Route,Routes,Link } from 'react-router-dom'
import './App.css'

function App() {
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <BrowserRouter>
    
      <nav>
      <Link to='/'> ./</Link>
      <Link to='/notes'>Notes</Link>
      </nav>
    
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/notes' element={<Notes/>}/>
      </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
