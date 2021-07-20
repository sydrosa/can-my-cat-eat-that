import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./modal.scss";

const Modal = ({ onOpen, onClose, plant }) => {

  const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const containerVariant = {
    initial: { top: "-50%", transition: { type: "ease", duration: 0.5 } },
    isOpen: { top: "50%" },
    exit: { top: "-50%" },
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
                <div className="modal__title">{plant.names.common}</div>
                <div className="modal__subtitle">{plant.names.scientific}</div>
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
                  <ul className="modal-section__list">
                    <li>{plant.care.light}</li>
                    <li>{plant.care.water}</li>
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
