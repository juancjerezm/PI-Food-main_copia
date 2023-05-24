import style from "./Paginado.module.css";

const Paginado = ({ recipesPerPage, allrecipes, paginado, currentPage }) => {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allrecipes / recipesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className={style.pagination}>
        {pageNumbers &&
          pageNumbers.map((num) => (
            <li key={num}>
              <button
                className={`\${style.pageLink} ${
                  currentPage === num ? style.active : ""
                }`}
                onClick={() => paginado(num)}
              >
                {num}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
};
export default Paginado;
