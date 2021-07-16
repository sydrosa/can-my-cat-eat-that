import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../Card";
import Modal from "../Modal";
import cx from "classnames";
import "./card-group.scss";

const CardGroup = ({ data, listView, toxicity }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState();
  const [plants, setPlants] = useState();

  const toggleModal = () => {
    setOpen(!open);
  };

  const handleClick = (e) => {
    console.log(e);
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

  useEffect(() => {
    if (data && toxicity === "toxic") {
      setPlants(data.filter((plant) => plant.toxicity));
    }
    else if (data && toxicity === "non-toxic") {
      setPlants(data.filter((plant) => !plant.toxicity));
    } else {
      setPlants(data);
    }
  }, [data, toxicity]);

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
                      img={card.image}
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
