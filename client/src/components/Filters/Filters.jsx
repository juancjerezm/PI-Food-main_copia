import { useSelector } from "react-redux";
import styles from "./Filters.module.css"

const Filters = ({
  filterByTitle,
  filterByDiets,
  FilterByHealthScore,
  FilterByCreation,
}) => {
  const diets = useSelector((state) => state.diets);
  return (
    <div>
      <select
        className={styles.filterSelect}
        defaultValue="All"
        onChange={filterByTitle}
        name="Alph"
      >
        <option hidden value="All">
          Order By
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        className={styles.filterSelect}
        defaultValue="All"
        onChange={FilterByHealthScore}
        name="HealthScore"
      >
        <option hidden value="All">
          HealthScore
        </option>
        <option value="asc">High to Low Score</option>
        <option value="desc">Low to High Score</option>
      </select>
      <select
        className={styles.filterSelect}
        defaultValue="All"
        onChange={FilterByCreation}
        name="Created"
      >
        <option hidden value="All">
          Recipes
        </option>
        <option value="database">Created</option>
        <option value="Api">Existent</option>
      </select>
      <select
        className={styles.filterSelect}
        defaultValue="All"
        onChange={filterByDiets}
        name="Diets"
      >
        <option hidden value="All">
          Diet Options
        </option>
        {diets.map((diet) => {
          return (
            <option key={diet} value={diet}>
              {diet}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filters;
