import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRecipesById, cleanDetail } from "../../../actions/index";
import styles from "./Detail.module.css";

const Detail = () => {
  const { idRecipe } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleanDetail());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRecipesById(idRecipe));
  }, [dispatch, idRecipe]);

  const recipe = useSelector((state) => state.detailRecipe);

  return (
    <article className={styles.container}>
      <Link to="/home">
        <button className={styles.button}>Back to Home</button>
      </Link>
      {Object.keys(recipe).length > 0 ? (
        <div>
          <h1>{recipe.title}</h1>
          <figure className={styles.figure}>
            <img className={styles.img} src={recipe.image} alt={recipe.name} />
          </figure>
          <div>
            <h3 className={styles.name}>Sumarry:</h3>
            <p
              className={styles.justify}
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            ></p>
          </div>
          <div>
            <h3 className={styles.name}>Healt Score:</h3>
            <span className={styles.justify}>{recipe.healthScore}</span>
          </div>
          <div>
            <h3 className={styles.name}>Diets:</h3>
            <div>
              {recipe.diets.map((diet, index) => {
                return <p key={`Diets${index}`}> {diet}</p>;
              })}
            </div>
          </div>
          <div>
            <h3>Stpes:</h3>
            <ol >
              {recipe.steps.map((step, index) => {
                return (
                  <ul className={styles.ul} key={`Stpes${index}`}>
                    {step}
                  </ul>
                );
              })}
            </ol>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </article>
  );
};
export default Detail;
