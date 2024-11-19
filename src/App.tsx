import Home from './Components/Home/Home'
import './App.css'
import HowItWorks from './Components/HowItWorks/HowItWorks'
import LearnMore from './Components/LearnMore/LearnMore';
import Contributor from './Components/Contributor/Contributor';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/howItWorks" element={<HowItWorks/ >}/>
        <Route path="/learnMore" element={<LearnMore/ >}/>
        <Route path="/contributor" element={<Contributor/ >}/>
      </Routes>
    </Router>
  );
}

export default App;
