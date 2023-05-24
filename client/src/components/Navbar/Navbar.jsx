import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/home" className={styles.navLink}>
        Home
      </Link>

      <SearchBar />

      <Link to="/create" className={styles.navLink}>
        Form
      </Link>
    </div>
  );
};
export default NavBar;
