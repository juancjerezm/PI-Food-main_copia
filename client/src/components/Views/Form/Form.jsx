import { useEffect, useState } from "react";
import { createRecipe, getDiets } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styles from "./Form.module.css";

// Validacion que toma un imput validar los campos del formulario
const validate = (input) => {
  let errors = {};
  if (!input.title || input.title.length < 3 || input.title > 120) {
    errors.title =
      "Error: The name is empty or its length is less than 3 or greater than 120.";
  } else if (!input.summary) {
    errors.summary = "please provide a summary since it's about recipe";
  } else if (
    !input.healthScore ||
    input.healthScore < 0 ||
    input.healthScore > 100
  ) {
    errors.healthScore = "Please enter a health score between 0 and 100.";
  } else if (!input.image) {
    errors.image = "Please provide  a valid URL.";
  } else if (!input.steps) {
    errors.steps = "Describe the steps for preparation.";
  }
  return errors;
};

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  //----------------------------------------------------------------------------------
  //Estados globales y locales creacion de objeto cuyo estado nos va a cativar o desactivar un boton de envio de formulario
  const diets = useSelector((state) => state.diets);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [input, setInput] = useState({
    title: "",
    summary: "",
    healthScore: 0,
    image:
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
    steps: [],
    diets: [],
  });

  // Para obtener las dietas en el reducer y poderlas usar ene ste componente

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  //En este useEffect se usa la funcion validadora que llena el pbjeto errors
  //si el tiene elementos de error; el boton de envair formulario no se activa
  //y depende de los cambios el estado de input

  useEffect(() => {
    const errors = validate(input);
    const isValid = Object.keys(errors).length === 0;
    setDisabled(!isValid);
  }, [input]);

  //handlers --------------------------------------------------------
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  //----------------------------------------------------------------
  const handleSelect = (e) => {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  };
  //----------------------------------------------------------------
  const handleSteps = (e) => {
    setInput({
      ...input,
      steps: [e.target.value],
    });
  };

  //----------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      ...input,
      healthScore: parseInt(input.healthScore, 10),
    };
    dispatch(createRecipe(recipeData));
    alert("Recipe created");
    setInput({
      title: "",
      summary: "",
      healthScore: 0,
      image: "",
      steps: [],
      diets: [],
    });
    history.push("/home");
  };

  //----------------------------------------------------------------
  return (
    <div className={styles.formContainer}>
      <Link to="/home">
        <button className={styles.formButton}>Home</button>
      </Link>
      <h1 className={styles.formTitle}>Create your recipe.</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <span>
          <label>Title </label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            value={input.title}
            placeholder="Enter a title."
            className={styles.formInput}
          />
          {errors.title && <p>{errors.title}</p>}
        </span>
        <div>
          <label>Health Score </label>
          <input
            onChange={handleChange}
            type="number"
            name="healthScore"
            value={input.healthScore}
            placeholder="Enter the score"
            className={styles.formInput}
          />
          {errors.healthScore && <p>{errors.healthScore}</p>}
        </div>
        <div>
          <label>Url Image </label>
          <input
            onChange={handleChange}
            type="text"
            name="image"
            value={
              input.image ===
              "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
                ? ""
                : input.image
            }
            placeholder="Url de Image"
            className={styles.formInput}
          />
          {errors.image && <p>{errors.image}</p>}
        </div>
        <div>
          <label>Summary </label>
          <textarea
            onChange={handleChange}
            type="text"
            name="summary"
            value={input.summary}
            placeholder="Write the summary."
            className={styles.formInput}
          />
          {errors.summary && <p>{errors.summary}</p>}
        </div>
        <div>
          <label>Steps for preparation </label>
          <textarea
            onChange={handleSteps}
            type="text"
            name="steps"
            value={input.steps}
            placeholder="Enter the preparation steps."
            className={styles.formInput}
          />
          {errors.steps && <p>{errors.steps}</p>}
        </div>
        <label>Diets: </label>
        <select className={styles.list} onChange={(e) => handleSelect(e)}>
          {diets.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <ul className={styles.dietList}>
          <li>{input.diets.map((d) => d + ", ")}</li>
        </ul>
        <button type="submit" disabled={disabled}>
          Crete Recipe
        </button>
      </form>
    </div>
  );
};
export default Form;
