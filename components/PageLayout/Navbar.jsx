import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import sun from "../../assets/sun.png";
import search from "../../assets/search.png";
import addbtn from "../../assets/addbtn.png";

const API_URL = "https://mini-link-management-platform-backendn.onrender.com";

function Navbar() {
  const [userName, setUserName] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [greeting, setGreeting] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [createLinkPopup, setCreateLinkPopup] = useState(false);
  const [toggleActive, setToggleActive] = useState(false); 
  const [formData, setFormData] = useState({
    url: "",
    remarks: "",
    expiration: "",
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUserName(storedUsername);
    }

    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.ok) {
            const user = await response.json();
            setUserName(user.name);
            localStorage.setItem("username", user.name);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUsername();

    const now = new Date();
    const day = now.toLocaleDateString(undefined, { weekday: "short" });
    const date = now.toLocaleDateString(undefined, {
      year: "2-digit",
      month: "short",
    });
    const time = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

    setLoginTime(`${day}, ${date}`);

    const currentHour = now.getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else if (currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  }, []);

  const openCreateLink = () => {
    setCreateLinkPopup(true);
  };

  const closeCreateLink = () => {
    setCreateLinkPopup(false);
  };

  const handleToggle = () => {
    setToggleActive(!toggleActive);
  };

  const handleClear = () => {
    setFormData({ url: "", remarks: "", expiration: "" }); 
    setToggleActive(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); 
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.navbarText}>
        <p>
          <img src={sun} alt="sunImg" className={styles.sunImg} />
          {greeting}, {userName}
        </p>
        <p>{loginTime}</p>
      </div>
      <button type="button" className={styles.addButton} onClick={openCreateLink}>
        <img src={addbtn} alt="createButtonImg" className={styles.addbtn} />
        Create new
      </button>
      <div className={styles.search}>
        <img src={search} alt="searchImg" className={styles.searchImg} />
        <input
          type="text"
          placeholder="Search by remarks"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div className={styles.initials}>{userName.slice(0, 2).toUpperCase()}</div>

      {createLinkPopup && (
        <div className={styles.createLinkPopupOverlay}>
          <div className={styles.createLinkPopup}>
            <div className={styles.popupHeader}>
              <p className={styles.popupText}>New Link</p>
              <button className={styles.closePopupButton} onClick={closeCreateLink}>
                X
              </button>
            </div>

            <form>
              <div className={styles.formText}>
                <label htmlFor="url">Destination Url<span className={styles.requiredAsterisk}>*</span></label>
                <input
                  type="url"
                  name="url"
                  placeholder="Add URL"
                  value={formData.url}
                  onChange={handleInputChange}
                  className={styles.URLlinkInput}
                />
              </div>
              <div className={styles.formText}>
                <label htmlFor="remarks">Remarks<span className={styles.requiredAsterisk}>*</span></label>
                <textarea
                  name="remarks"
                  placeholder="Add remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  className={styles.remarksInput}
                />
              </div>
              <div className={styles.formText}>
                <div className={styles.formlink}>
                  <label htmlFor="expiration">Link Expiration</label>
                  <div className={styles.toggleContainer} onClick={handleToggle}>
                    <div
                      className={`${styles.toggleSwitch} ${
                        toggleActive ? styles.active : ""
                      }`}
                    >
                      <div className={styles.toggleCircle}></div>
                    </div>
                  </div>
                </div>
                <input
                  type="datetime-local"
                  name="expiration"
                  placeholder="Add date and time"
                  value={formData.expiration}
                  onChange={handleInputChange}
                  className={styles.linkInput}
                  disabled={!toggleActive} 
                />
              </div>
              <div className={styles.formFooter}>
                <button type="button" className={styles.clearButton} onClick={handleClear}>
                  Clear
                </button>
                <button type="submit" className={styles.submitButton}>
                  Create New
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

