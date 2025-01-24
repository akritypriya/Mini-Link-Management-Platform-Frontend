import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.mainContainer}>
      <Sidebar className={styles.sideBar} />
      <div className={styles.content}>
        <Navbar  className={styles.navBar} />
        <div className={styles.pageContent}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
