import { register } from "../../services";
import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import sidebar from "../../assets/sidebar.svg";
import loginbtn from "../../assets/loginbtn.svg";
import signUp from "../../assets/SignUp.png";
import icon from "../../assets/icon.png";
import {Link} from 'react-router-dom';




export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile:"",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormSubmitted(true); 
  
    const { password, confirmPassword } = formData;
  
    // Password match validation
    if (password !== confirmPassword) {
      setError("Password is not matching");
      return;
    }
  
    try {
      const res = await register(formData);
  
      if (res.status === 200) {
        alert("Registered successfully");  // Show alert for success
        setFormData({
          username: "",
          email: "",
          mobile:"",
          password: "",
          confirmPassword: "",
        });
        setError(""); 
        
        
        navigate("/login");
      } else {
        const errorMessage = res?.message || "Registration failed";
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Error in handleRegister:", err);
      const errorMessage =
        err?.message || "An error occurred. Please try again.";
      setError(errorMessage);
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
     <div className={styles.formheader}>Join us Today!</div>
      <div className={styles.form}>
        <form onSubmit={handleRegister}>
          <div className={styles.formText}>
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className={styles.formText}>
            <input
              type="email"
              name="email"
              placeholder="Email id"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className={styles.formText}>
            <input
              type="number"
              name="number"
              placeholder="Mobile no."
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
          </div>

          <div className={styles.formPassword}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

       <div
        className={`${styles.formPassword} ${
          formSubmitted &&
          formData.password !== formData.confirmPassword
            ? styles.errorBorder
            : ''
        }`}
      >

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className={`${
                formSubmitted &&
                formData.password !== formData.confirmPassword
                  ? styles.errorBorder
                  : ''
              }`}
              
            />
            {formSubmitted && error && <p className={styles.error}>{error}</p>}
          </div>        
          <button type="submit" className={styles.registerBtn}>Register</button>    
        </form>
        <p className={styles.text}>
          Already have an account?
          <a href="/login" className={styles.link}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
