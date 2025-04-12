import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/login.css'; // Reuse the same CSS file

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup:", { email, password, username });
  };

  return (
    <div className="overlay">
      <form className="form" onSubmit={handleSignup}>
       <h1 style={{textAlign: 'center', fontWeight: '700', fontSize: '40px', lineHeight: '140%', color: '#014406'}}>CivicLink</h1>
        <h2>Sign Up</h2>

         <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

       <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
       <label htmlFor="email">Password:</label>

        <input
          type="password"
          placeholder="Confirm Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <label htmlFor="password">Confirm Password:</label>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
