import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header'
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { Card } from './pages/Card';

function App() {

  return (
    <Router>
      <Routes>
        {/* <Header/> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/perfil/:id" element={<Card/>} />
      </Routes>
    </Router>


  )
}

export default App
