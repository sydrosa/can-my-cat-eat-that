import React, { useState } from "react";
import cx from "classnames";
import { ReactComponent as Heart } from "../../assets/images/heart.svg";

import "./card.scss";

const Card = ({
  img,
  imgAlt,
  name,
  scientificName,
  details,
  toxicity,
  list,
  onClick,
}) => {
  const [favorited, setFavorited] = useState(false);

  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const handleClick = (e) => {
    setFavorited(!favorited);
    updateClassName(e.currentTarget);
  };

  const updateClassName = (tag) => {
    !favorited
      ? tag.setAttribute("fill", "#ff0000")
      : tag.setAttribute("fill", "#fff");
  };

  return (
    <div>
      <li
        className={cx("card", { "card--list-item": list })}
        onKeyPress={onClick}
        tabIndex="0"
      >
        <div
          className={cx(
            { "flex card__wrapper": list },
            { "card__list-row": list }
          )}
        >
          <img
            className={cx("card__img", { "card__list-img": list })}
            src={`${img}`}
            alt={imgAlt}
            onClick={onClick}
          />
          {list && (
            <div className="card__list-header">
              <button
                className="card__title card__title--list"
                onClick={onClick}
              >
                {name}
              </button>
              <p className="card__subtitle">{scientificName}</p>
            </div>
          )}
        </div>
        <div
          className={cx("flex card__content", { "card__grid-content": !list })}
        >
          {!list && (
            <button
              className="card__title"
              onClick={onClick}
              onKeyPress={onClick}
            >
              {name}
            </button>
          )}
          <div className={cx("flex", { tags: !list })}>
            {toxicity ? (
              <span className="tag tag--toxic">Toxic</span>
            ) : (
              <span className="tag tag--non-toxic">Non-toxic</span>
            )}
            {!list && (
              <div className={cx("tag__wrapper")}>
                <Heart
                  className="tag--favorite"
                  onClick={(e) => handleClick(e)}
                />
                {list && <span className="tag--favorite-text">Favorite</span>}
              </div>
            )}
          </div>
        </div>
        {list && (
          <>
            <p
              className={cx("card__list-description", {
                "card__list-row": list,
              })}
            >
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
