import { Link } from 'react-router'; 
import './Header.css' 

function NavBar() {
  return (
    <div className = "Header"> 
      <div>
        <Link className="link" to="/"><h1>ResumeAI</h1></Link>
      </div>
      <div>
        <ul>
          <li>
            <Link className="link" to="/">Home</Link>
          </li>
          <li>
            <Link className="link" to="/Feature">Feature</Link>
          </li>
          <li>
            <Link  className="link" to = "/Login ">Login</Link>
          </li>
          <li>
            <Link  className="link" to = "/Register ">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;