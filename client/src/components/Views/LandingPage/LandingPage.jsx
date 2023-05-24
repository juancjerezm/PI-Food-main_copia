import { Link } from "react-router-dom";
import styles from './LandingPage.module.css'

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to my recipe application</h1>
      <Link to="/home">
        <button className={styles.button}>Home</button>{" "}
      </Link>
    </div>
  );
};
export default LandingPage;
