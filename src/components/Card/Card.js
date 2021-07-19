import React from "react";
import cx from "classnames";
import { ReactComponent as Heart } from "../../assets/images/heart.svg";

import "./card.scss";

const Card = ({
  img,
  imgAlt,
  name,
  scientificName,
  details,
  favorite,
  toxicity,
  list,
  onClick,
}) => {
  // const [favorite, setFavorite] = useState([]);

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleClick = (e) => {
    console.log(e.target.classList.contains("selected"));
    const faveClasses = e.target.classList;
    faveClasses.contains("selected")
      ? faveClasses.remove("selected")
      : faveClasses.add("selected");
  };

  return (
    <div>
      <li
        className={cx("card", { "card--list-item": list })}
        tabIndex="0"
        onClick={onClick}
        onKeyPress={onClick}
      >
        <div className={cx({ "flex card__wrapper": list })}>
          <img
            className={cx("card__img", { "card__list-img": list })}
            src={img}
            alt={imgAlt}
          />
          {list && (
            <div className="card__list-header">
              <p className="card__title card__title--list">{name}</p>
              <p className="card__subtitle">{scientificName}</p>
            </div>
          )}
        </div>
        <div className="flex card__content">
          {!list && <p className="card__title">{name}</p>}
          {toxicity ? (
            <span className="tag tag--toxic">Toxic</span>
          ) : (
            <span className="tag tag--non-toxic">Non-toxic</span>
          )}
          {!list && (
            <div className="tag__wrapper">
              <Heart
                className="tag--favorite"
                onClick={(e) => handleClick(e)}
              />
             {list && <span className="tag--favorite-text">Favorite</span>} 
            </div>
          )}
        </div>
        {list && (
          <>
            <p className="card__list-description">
              {truncateString(details, 135)}
            </p>
            <div className={cx("tag__wrapper", {"favorite": !list})}>
              <Heart
                className="tag--favorite"
                onClick={(e) => handleClick(e)}
              />
              <span className="tag--favorite-text">Favorite</span>
            </div>
          </>
        )}
      </li>
    </div>
  );
};

export default Card;
