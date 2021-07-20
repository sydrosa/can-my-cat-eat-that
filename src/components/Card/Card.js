import React, { useEffect, useState } from "react";
import cx from "classnames";
import { ReactComponent as Heart } from "../../assets/images/heart.svg";

import "./card.scss";

const Card = ({
  img,
  imgAlt,
  name,
  scientificName,
  details,
  //   favorite,
  toxicity,
  list,
  onClick,
}) => {
  const [favorited, setFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleClick = (e) => {
    // console.log(e.target);
    setFavorited(!favorited);
    updateClassName(e.target);
    // favorite ? tag.classList.add("selected") : tag.classList.remove("selected")

    // const faveClasses = e.target.classList;
    // faveClasses.contains("selected")
    //   ? faveClasses.remove("selected")
    //   : faveClasses.add("selected");
  };

  const updateClassName = (tag) => {
    favorited
      ? tag.classList.add("selected")
      : tag.classList.remove("selected");
  };

  useEffect(() => {
    console.log(favorited);
  }, [favorited]);

  return (
    <div>
      <li className={cx("card", { "card--list-item": list })} tabIndex="0">
        <div className={cx({ "flex card__wrapper": list })}>
          <img
            className={cx("card__img", { "card__list-img": list })}
            src={`${img}`}
            alt={imgAlt}
            onClick={onClick}
            onKeyPress={onClick}
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
            <div className={cx("tag__wrapper", { favorite: !list })}>
              <Heart
                className={cx("tag--favorite")}
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
