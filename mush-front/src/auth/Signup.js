import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async () => {
    const res = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    if (res.ok) {
      navigate('/Login');
    } else {
      alert('Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        <div style={styles.formGroup}>
          <input 
            style={styles.input} 
            placeholder="Username" 
            onChange={e => setUsername(e.target.value)} 
          />
        </div>
        <div style={styles.formGroup}>
          <input 
            style={styles.input} 
            type="password" 
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <button 
          style={styles.button} 
          onClick={signup}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Sign Up
        </button>
        <div style={styles.signupText}>
          Already have an account? <Link to="/login" style={styles.signupLink}>Login</Link>
        </div>
      </div>
    </div>
  );
}

// Reusing the same styles from Login component for consistency
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
  signupText: {
    textAlign: 'center',
    marginTop: '1rem',
    color: '#666',
  },
  signupLink: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Signup;