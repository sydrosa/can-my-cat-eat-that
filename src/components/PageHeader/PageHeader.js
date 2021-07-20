import React from "react";
import CatIcon from "../../assets/images/cat-icon.svg";
import "./page-header.scss";

const PageHeader = () => {
  return (
    <>
      <nav className="header">
        <a href="/" className="header__logo">
          <img
            src={CatIcon}
            alt="Catopia cat logo"
            className="header__logo-icon"
          />
          <span className="header__logo-text">Catopia!</span>
        </a>
      </nav>
    </>
  );
};

export default PageHeader;
