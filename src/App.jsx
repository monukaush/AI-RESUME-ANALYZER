import { Route, Routes } from 'react-router'; 
import Home from './LandingPage'; // 👈 Yahan './Home' ki jagah './LandingPage' kar diya hai
import Feature from './Feature'; 
import Register from './Register';
import Login from './Login';
import NavBar from './NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Feature" element={<Feature />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;