import { Route, Routes } from 'react-router-dom';
import "./app.css";
import '../src/styles/card.css'
import '../src/styles/tictac.css'
import '../src/styles/home.css'
import Navigation from './components/Navigation';
import HomeCard from '../src/pages/HomeCard'
import HomeMichi from '../src/pages/HomeMichi'
import HomeSearchMovie from '../src/pages/HomeSearchMovie'
import styled from "styled-components";

const Container = styled.div`
  background-color: gray;
  height: 100%;
`;

function App() {
  return (
    <Container>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomeCard />} />
        <Route path="/nosotros" element={<HomeMichi />} />
        <Route path="/categoria" element={<HomeSearchMovie />} />
      </Routes>
    </Container>
  );
}

export default App
