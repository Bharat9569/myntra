import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authslice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Added state for role
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        // Handle signup with role
        await axios.post('http://localhost:8080/api/m1/register', { email, password, role });
        alert("Signup successful! Please login.");
        setIsSignup(false);
      } else {
        // Handle login
        const res = await axios.post('http://localhost:8080/api/m1/login', { email, password });
        dispatch(login({ email: res.data.user.email, role: res.data.user.role }));
            
        
       localStorage.setItem('token', res.data.token);
        // Navigate based on user role
        if (res.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignup ? 'Signup' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isSignup && (
            <label>
              Role:
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={!isSignup} // If it's not signup, role is disabled
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          )}
          <button type="submit" className="submit-btn">
            {isSignup ? 'Signup' : 'Login'}
          </button>
        </form>
        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignup(!isSignup)} className="toggle-btn">
            {isSignup ? 'Login' : 'Signup'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
