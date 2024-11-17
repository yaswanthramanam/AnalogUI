import Home from './Components/Home/Home'
import './App.css'
import HowItWorks from './Components/HowItWorks/HowItWorks'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/howItWorks" element={<HowItWorks/ >}/>
      </Routes>
    </Router>
  );
}

export default App;
