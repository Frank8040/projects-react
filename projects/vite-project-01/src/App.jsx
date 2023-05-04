import { Route, Routes } from 'react-router-dom';
import '../src/styles/card.css'
import '../src/styles/tictac.css'
import '../src/styles/home.css'
import Navigation from './components/Navigation';
import HomeCard from '../src/pages/HomeCard'
import HomeMichi from '../src/pages/HomeMichi'
import HomeSearchMovie from '../src/pages/HomeSearchMovie'


function App() {

  return (
    <div style={{ backgroundColor: 'rgb(241 245 249)' }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomeCard />} />
        <Route path="/nosotros" element={<HomeMichi />} />
        <Route path="/categoria" element={<HomeSearchMovie />} />
      </Routes>
    </div>
  )
}

export default App
