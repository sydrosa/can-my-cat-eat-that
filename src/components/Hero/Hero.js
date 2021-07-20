import React from "react";
import CatLeft from "../../assets/images/cat-left.png";
import CatRight from "../../assets/images/cat-right.png";
import Search from "../../assets/images/search.png";
import "./hero.scss";

const Hero = ({ setProp }) => {
  return (
    <section className="hero">
      <img
        className="hero__img hero__img--left"
        src={CatLeft}
        alt="illustration of cat hiding behind plant"
      />
      <img
        className="hero__img hero__img--right"
        src={CatRight}
        alt="illustration of cat hiding behind plant"
      />
      <div className="hero__content">
        <h1 className="hero__content-title">Can my cat eat that?</h1>
        <p className="hero__content-description">
          Search and filter common house plants and see what’s safe for
          Sprinkles to nibble on.
        </p>
        <div id="searchbar" className="hero__search-bar">
          <label className="hero__search-bar-label" htmlFor="searchbar">
            Search
          </label>
          <input
            className="hero__search-bar-input"
            type="text"
            id="searchbar"
            name="searchbar"
            placeholder=" Spider plant, fiddle leaf fig, etc..."
            onChange={(e) => setProp(e.target.value)}
          />
          <img
            className="hero__search-bar-img"
            src={Search}
            alt="Search icon"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
