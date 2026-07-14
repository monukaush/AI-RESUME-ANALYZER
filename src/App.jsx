import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Feature from './Feature';
import Register from './Register';
import Login from './Login';
import NavBar from './NavBar';
import AnalyticDashboard from './AnalyticDashboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<><NavBar /><LandingPage /></>} />
        <Route path="/Feature" element={<><NavBar /><Feature /></>} />
        <Route path="/Login" element={<><NavBar /><Login /></>} />
        <Route path="/Register" element={<><NavBar /><Register /></>} />
        <Route path="/dashboard" element={<AnalyticDashboard />} />
      </Routes>
    </>
  );
}

export default App;