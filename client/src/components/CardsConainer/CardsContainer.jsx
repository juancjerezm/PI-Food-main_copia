
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import style from "./CardsContainer.module.css";

function CardsContainer({ currentRecipes }) {
  return (
    <div>
      <div className={style.container}>
        {currentRecipes.map((recipe) => {
          return (
            <Link
              key={recipe.id}
              to={`/home/${recipe.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card 
                key={recipe.id}
                title={recipe.title}
                image={recipe.image}
                diets={recipe.diets}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default CardsContainer;
