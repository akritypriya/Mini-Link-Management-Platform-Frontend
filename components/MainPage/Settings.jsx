import { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { update } from "../../services";
import closeImg from "../../assets/closeImg.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

export default function Settings() {
  const navigate = useNavigate();

  const [updateFormData, setUpdateFormData] = useState({
    username: "",
    email: "",
    mobile: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view your details.");
          return;
        }

        const response = await axios.get(`${API_URL}/api/user/user-details`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUpdateFormData({
            username: response.data.username,
            email: response.data.email,
            mobile: response.data.mobile,
          });
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("An error occurred while fetching your details.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { username, email, mobile } = updateFormData;

    if (!email || !username || !mobile) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    try {
      const res = await update(updateFormData);

      if (res.status === 200) {
        setSuccess("Information updated successfully!");
        setError("");
        setUpdateFormData({
          username: "",
          email: "",
          mobile: "",
        });
      } else {
        setError("Failed to update. Please try again.");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  const handleDeleteAccount = () => {
    setShowDeletePopup(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to delete your account.");
        return;
      }

      const response = await axios.delete(`${API_URL}/api/user/delete-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSuccess("Account deleted successfully.");
        navigate('/register');
        setShowDeletePopup(false);
        
      } else {
        setError("Failed to delete account. Please try again.");
      }
    } catch (err) {
      console.error("Error deleting account:", err);
      setError("An error occurred while deleting the account. Please try again.");
    }
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.form}>
        <form onSubmit={handleUpdate}>
          <div className={styles.formText}>
            <label htmlFor="text" className={styles.nameLabel}>Name</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={updateFormData.username}
              className={styles.input}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  username: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.formText}>
            <label htmlFor="email" className={styles.emaiLabel}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={updateFormData.email}
              className={styles.input}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className={styles.formMobile}>
            <label htmlFor="number">Mobile No.</label>
            <input
              type="number"
              name="number"
              placeholder="Mobile"
              value={updateFormData.mobile}
              className={styles.input}
              onChange={(e) =>
                setUpdateFormData({
                  ...updateFormData,
                  mobile: e.target.value,
                })
              }
            />
          </div>

          <button type="submit" className={styles.updateButton}>
            Save Changes
          </button>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        {showDeletePopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <button className={styles.closeDeletePopup} onClick={closeDeletePopup}>
                <img
                  src={closeImg}
                  alt="Close Popup"
                  className={styles.deletePopup}
                />
              </button>
              <h2>Are you sure you want to delete your account?</h2>
              <div className={styles.popupButtons}>
                <button
                  className={styles.cancelButton}
                  onClick={closeDeletePopup}
                >
                  NO
                </button>
                <button
                  className={styles.confirmButton}
                  onClick={confirmDeleteAccount}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
