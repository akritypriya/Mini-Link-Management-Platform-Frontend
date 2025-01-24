import styles from "./Sidebar.module.css";
import icon from "../../assets/icon.png";
import dashboard from "../../assets/dashboard.png";
import link from "../../assets/link.png";
import analytics from "../../assets/analytics.png";
import settings from "../../assets/settings.png";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const handleDasboard =()=>{
    navigate('/dashboard');
  }
  const handleLink =()=>{
    navigate('/links');
  }
  const handleAnalytics =()=>{
    navigate('/analytics');
  }
  const handleSetting =()=>{
    navigate('/settings');
  }

  return (
      <div className={styles.sideBar} >
        <img src={icon} alt="sidebarIcon" className={styles.icon} />
        
          <button type="button" onClick={handleDasboard}>
            <img src={dashboard} alt="dashboardImg" className={styles.sidebarImg} />Dashboard
          </button>
        
          <button type="button" onClick={handleLink}>
            <img src={link} alt="linkImg" className={styles.sidebarImg} />Links
          </button>
        
          <button type="button" onClick={handleAnalytics}>
            <img src={analytics} alt="AnalyticsImg" className={styles.sidebarImg} />Analytics
          </button>
      
          <button type="button" id={styles.SettingBtn} onClick={handleSetting}>
            <img src={settings} alt="settingsImg"  id={styles.sidebarImg} className={styles.sidebarImg} />Settings
          </button>
        
      </div>
      
  );
}

export default Sidebar;
