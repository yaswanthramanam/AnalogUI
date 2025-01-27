import Home from './Components/Home/Home'
import './App.css'
import InvestNow from './Components/InvestNow/InvestNow'
import LearnMore from './Components/LearnMore/LearnMore';
import Payments from './Components/Payments/Payments';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/InvestNow" element={<InvestNow/ >}/>
        <Route path="/learnMore" element={<LearnMore/ >}/>
        <Route path="/payments" element={<Payments/ >}/>
      </Routes>
    </Router>
  );
}

export default App;
