import { login } from "../../services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import sidebar from "../../assets/sidebar.svg";
import loginbtn from "../../assets/loginbtn.svg";
import signUp from "../../assets/SignUp.png";
import icon from "../../assets/icon.png";
import {Link} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [loginformData, setLoginformData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await login(loginformData);
      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        console.log(data.token);
        console.log(data.username);
        alert("Logged in successfully");
        navigate("/workspace");
      } else {
        setError("Invalid email or password"); // Handle non-200 response
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again."); // Handle network or server errors
    }
  };

  return (
    <div className={styles.header}>
    <img src={sidebar} alt="sidebar" className={styles.sidebarimg}/>
    <img src={icon} alt="sidebarIcon" className={styles.icon}/>
    <div className={styles.headerbtn}>
    <Link to='/register'><img src={signUp} alt="signup" className={styles.signup}/></Link>
     <Link to='/login'><img src={loginbtn} alt="loginbtn" className={styles.loginbtn}/></Link>
     </div>
     <div className={styles.formheader}>Login</div>
     <div className={styles.form}>
        <form onSubmit={handleLogin}>
          <div className={styles.formText}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email id"
              value={loginformData.email}
              onChange={(e) =>
                setLoginformData({ ...loginformData, email: e.target.value })
              }
            />
          </div>
          <div className={styles.formPassword}>
            
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={loginformData.password}
              onChange={(e) =>
                setLoginformData({ ...loginformData, password: e.target.value })
              }
            />
            {error && <p className={styles.error}>{error}</p>}{" "}
            
          </div>

         <button type="submit" className={styles.registerBtn}>Register</button>  
        </form>
        <p className={styles.text}>
          Don’t have an account?
          <a href="/register" className={styles.link}>
          SignUp
          </a>
        </p>
      </div>
   </div>
  );
}
