import React from "react";
import style from "./Card.module.css";



function Card({ id, title, image, diets }) {
  return (
    <div className={style.card}>
      <img src={image} alt={title} className={style.img} />
      <h4 className={style.name}>{title}</h4>
      <div className={style.name}>
        {diets?.map((diet) => (
          <span key={id + diet}>{`${diet}, `}</span>
        ))}
      </div>
    </div>
  );
}

export default Card;
