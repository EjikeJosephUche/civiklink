import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/login.css';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <div className="overlay">
      <form className="form" onSubmit={handleLogin}>
     <h1 style={{textAlign: 'center', fontWeight: '700', fontSize: '40px', lineHeight: '140%', color: '#014406'}}>CivicLink</h1>
        <h2>Log into your account</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
