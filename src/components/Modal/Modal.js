import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as Heart } from "../../assets/images/heart.svg";
import cx from "classnames";
import "./modal.scss";

const Modal = ({ onOpen, onClose, plant }) => {
  const [favorited, setFavorited] = useState(false);
  const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const containerVariant = {
    initial: { top: "-50%", transition: { type: "easeIn", duration: 0.5 } },
    isOpen: { top: "50%" },
    exit: { top: "-50%" },
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
    onOpen && (
      <AnimatePresence>
        <motion.div
          className="backdrop"
          variants={modalVariant}
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
        >
          <motion.div className="modal" variants={containerVariant}>
            <img
              className="modal__img"
              src={`/can-my-cat-eat-that${plant.image}`}
              alt={`${plant.names.common} plant`}
            />
            <div className="modal__content">
              <div className="modal-section modal__header">
                <div>
                  <div className="modal__title">{plant.names.common}</div>
                  <div className="modal__subtitle">
                    {plant.names.scientific}
                  </div>
                </div>
                <div>
                  <div className={cx("flex")}>
                    {plant.toxicity ? (
                      <span className="tag tag--toxic">Toxic</span>
                    ) : (
                      <span className="tag tag--non-toxic">Non-toxic</span>
                    )}
                    <div className={cx("tag__wrapper")}>
                      <Heart
                        className="tag--favorite"
                        onClick={(e) => handleClick(e)}
                      />
                      <span className="tag--favorite-text">Favorite</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal__body">
                <section className="modal-section modal-section__container">
                  <h3 className="modal-section__title">Details</h3>
                  <p className="modal-section__description">{plant.details}</p>
                </section>
                {plant.toxicity && (
                  <section className="modal-section modal-section__container">
                    <h3 className="modal-section__title">Toxicity</h3>
                    <ul className="modal-section__list">
                      <li>{plant.toxicity.property}</li>
                      <li>{plant.toxicity.symptoms}</li>
                    </ul>
                  </section>
                )}
                <section className="modal-section modal-section--no-border modal-section__container">
                  <h3 className="modal-section__title">Care</h3>
                  <ul className="modal-section__list modal-section__list--care">
                    <li className="modal-section__care-list-item">
                      {plant.care.light}
                    </li>
                    <li className="modal-section__care-list-item modal-section__care-list-item--alt">
                      {plant.care.water}
                    </li>
                  </ul>
                </section>
              </div>
            </div>
            <div className="modal__footer">
              <button className="modal__button" onClick={onClose} autoFocus>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
};

export default Modal;
