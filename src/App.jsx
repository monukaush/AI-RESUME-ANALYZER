// App.jsx
import { Route, Routes } from 'react-router'; 
import Home from './LandingPage'; 
import Feature from './Feature'; 
import Register from './Register';
import Login from './Login';
import NavBar from './NavBar';
import AnalyticDashBoard from './AnalyticDashboard'; // Import the dashboard

function App() {
  return (
    <>
      <Routes>
        {/* Pages that SHOULD show the Navigation Bar */}
        <Route path="/" element={<><NavBar /><Home /></>} /> 
        <Route path="/Feature" element={<><NavBar /><Feature /></>} />
        <Route path="/Login" element={<><NavBar /><Login /></>} />
        <Route path="/Register" element={<><NavBar /><Register /></>} />
       
        {/* This dashboard will open completely clean, with NO header navbar */}
        <Route path="/dashboard" element={<AnalyticDashBoard />} />
      </Routes>
    </>
  );
}

export default App;