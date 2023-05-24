import React from "react";
import styles from "./Home.module.css";
import { CardsContainer, Paginado, NavBar, Filters } from "../../../components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecipes,
  getDiets,
  filterRecipesByTitle,
  filterRecipesByDiet,
  filterRecipesByHealt,
  filterRecipeByCreated,
} from "../../../actions/index";

const Home = () => {
  const allrecipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  let currentRecipes = allrecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const [listOfRecipes, setListOfRecipes] = useState(currentRecipes);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //--------------------------Hanldlers-------------------------------

  function handlerFilterTitle(e) {
    setListOfRecipes(dispatch(filterRecipesByTitle(e.target.value)));
    setCurrentPage(1);
  }

  function handlerFilterDiet(e) {
    setListOfRecipes(dispatch(filterRecipesByDiet(e.target.value)));
    setCurrentPage(1);
  }

  function handlerFilterHealthScore(e) {
    setListOfRecipes(dispatch(filterRecipesByHealt(e.target.value)));
    setCurrentPage(1);
  }

  function handlerFilterCreated(e) {
    setListOfRecipes(dispatch(filterRecipeByCreated(e.target.value)));
    setCurrentPage(1);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  //----------------------------------------------------------------
  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <div>
      <NavBar />

      <button className={styles.reload} onClick={handleClick}>
        Reload Recipes
      </button>
      <Filters
        filterByTitle={(e) => handlerFilterTitle(e)}
        filterByDiets={(e) => handlerFilterDiet(e)}
        FilterByHealthScore={(e) => handlerFilterHealthScore(e)}
        FilterByCreation={(e) => handlerFilterCreated(e)}
      />

      <Paginado
        recipesPerPage={recipesPerPage}
        allrecipes={allrecipes.length}
        paginado={paginado}
        currentPage={currentPage}
      />
      <CardsContainer currentRecipes={currentRecipes} />
    </div>
  );
};

export default Home;
