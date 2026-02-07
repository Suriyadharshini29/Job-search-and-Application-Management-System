import { useState } from "react";
import "./Auth.css";

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (
        savedUser &&
        savedUser.email === email &&
        savedUser.password === password
      ) {
        setUser(savedUser);
      } else {
        alert("Invalid credentials");
      }
    } else {
      const newUser = { email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  return (
    <div className="auth-container">
      <div className="neon-wrapper">
        <form className="auth-box slide" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Login" : "Sign Up"}</h2>

          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "No account? Sign up" : "Already have an account? Login"}
          </p>
        </form>
        <div className="neon-ring"></div>
      </div>
    </div>
  );
}

export default Auth;
