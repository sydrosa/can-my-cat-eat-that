import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../Card";
import Modal from "../Modal";
import cx from "classnames";
import "./card-group.scss";

const CardGroup = ({ data, listView }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState();

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleClick = (e) => {
    toggleModal();
    setSelectedPlant(e);
  };
  const bodyVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.25,
        staggerChildren: 0.2,
      },
    },
  };

  const cardContainerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  const cardVariants = {
    active: {
      scale: 1.025,
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        staggerChildren: 1,
      },
    },
    inactive: { scale: 1 },
  };

  return (
    <>
      <Modal
        onOpen={open}
        onClose={() => setOpen(false)}
        plant={selectedPlant}
      />
      <AnimatePresence>
        <motion.ul
          className={cx("card-group-container", {
            "card-group-container--list": listView,
          })}
          variants={bodyVariants}
          initial="initial"
          animate="animate"
        >
          {data.map((card, i) => {
            return (
              <React.Fragment key={i}>
                <motion.div variants={cardContainerVariants}>
                  <motion.div
                    variants={!listView && cardVariants}
                    initial="inactive"
                    whileHover="active"
                    animate="inactive"
                    role="button"
                    aria-label="Button to plant details modal"
                  >
                    <Card
                      onClick={(e) => handleClick(card)}
                      list={listView}
                      details={card.details}
                      name={card.names.common}
                      scientificName={card.names.scientific}
                      img={`/can-my-cat-eat-that${card.image}`}
                      imgAlt={`image of ${card.names.common} plant`}
                      toxicity={card.toxicity}
                    />
                  </motion.div>
                </motion.div>
              </React.Fragment>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </>
  );
};

export default CardGroup;
